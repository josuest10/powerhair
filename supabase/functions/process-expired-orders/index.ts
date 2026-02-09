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

    // Find orders that are waiting_payment and created more than 35 minutes ago
    const thirtyFiveMinutesAgo = new Date(Date.now() - 35 * 60 * 1000).toISOString();
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    const { data: expiredOrders, error: fetchError } = await supabase
      .from("orders")
      .select("id, transaction_id, customer_email")
      .eq("status", "waiting_payment")
      .lt("created_at", thirtyFiveMinutesAgo)
      .gt("created_at", twentyFourHoursAgo);

    if (fetchError) {
      console.error("Error fetching expired orders:", fetchError);
      throw fetchError;
    }

    console.log(`Found ${expiredOrders?.length || 0} expired orders to process`);

    let marked = 0;
    for (const order of expiredOrders || []) {
      const { error } = await supabase
        .from("orders")
        .update({ status: "expired" })
        .eq("id", order.id);

      if (!error) {
        marked++;
        console.log(`✅ Order ${order.transaction_id} marked as expired`);
      } else {
        console.error(`❌ Failed to expire order ${order.transaction_id}:`, error);
      }
    }

    return new Response(
      JSON.stringify({ success: true, processed: expiredOrders?.length || 0, marked }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error) {
    console.error("Error processing expired orders:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
