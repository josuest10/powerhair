import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Supabase credentials not configured");
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Find orders that:
    // 1. Status is 'waiting_payment'
    // 2. Created more than 35 minutes ago (PIX expires in 30 min + 5 min buffer)
    // 3. Haven't been sent a recovery email yet (we'll track this)
    const thirtyFiveMinutesAgo = new Date(Date.now() - 35 * 60 * 1000).toISOString();
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    const { data: expiredOrders, error: fetchError } = await supabase
      .from("orders")
      .select("*")
      .eq("status", "waiting_payment")
      .lt("created_at", thirtyFiveMinutesAgo)
      .gt("created_at", twentyFourHoursAgo) // Only process orders from last 24 hours
      .order("created_at", { ascending: false });

    if (fetchError) {
      console.error("Error fetching expired orders:", fetchError);
      throw fetchError;
    }

    console.log(`Found ${expiredOrders?.length || 0} expired orders to process`);

    const results = [];

    for (const order of expiredOrders || []) {
      try {
        // Send recovery email
        const emailPayload = {
          customerName: order.customer_name,
          customerEmail: order.customer_email,
          amount: order.amount,
          productName: order.product_name,
          transactionId: order.transaction_id,
        };

        console.log(`Sending recovery email to ${order.customer_email} for order ${order.transaction_id}`);

        const emailResponse = await fetch(`${SUPABASE_URL}/functions/v1/send-recovery-email`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
          },
          body: JSON.stringify(emailPayload),
        });

        const emailResult = await emailResponse.json();

        if (emailResult.success) {
          // Mark order as expired (so we don't send another recovery email)
          await supabase
            .from("orders")
            .update({ status: "expired" })
            .eq("id", order.id);

          results.push({
            transactionId: order.transaction_id,
            email: order.customer_email,
            status: "sent",
          });

          console.log(`✅ Recovery email sent and order marked as expired: ${order.transaction_id}`);
        } else {
          results.push({
            transactionId: order.transaction_id,
            email: order.customer_email,
            status: "failed",
            error: emailResult.error,
          });
          console.error(`❌ Failed to send recovery email for order ${order.transaction_id}:`, emailResult.error);
        }
      } catch (orderError) {
        console.error(`Error processing order ${order.transaction_id}:`, orderError);
        results.push({
          transactionId: order.transaction_id,
          email: order.customer_email,
          status: "error",
          error: orderError.message,
        });
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        processed: results.length,
        results,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error) {
    console.error("Error processing expired orders:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
