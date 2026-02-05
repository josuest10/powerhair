 import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
 import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
 
 const corsHeaders = {
   'Access-Control-Allow-Origin': '*',
   'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
 };
 
 serve(async (req) => {
   // Handle CORS preflight
   if (req.method === 'OPTIONS') {
     return new Response(null, { headers: corsHeaders });
   }
 
   try {
     const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
     const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
 
     if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
       throw new Error('Supabase credentials are not configured');
     }
 
     const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
 
     const body = await req.json();
     
     console.log('Webhook received:', JSON.stringify(body, null, 2));
 
     // Podpay sends transaction updates
     const { id, status, paidAt, paidAmount } = body;
 
     if (!id) {
       return new Response(
         JSON.stringify({ success: false, error: 'Transaction ID is required' }),
         { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
       );
     }
 
     // Update order status in database
     const updateData: Record<string, unknown> = {
       status: status,
     };
 
     if (status === 'paid' && paidAt) {
       updateData.paid_at = paidAt;
     }
 
     const { data, error } = await supabase
       .from('orders')
       .update(updateData)
       .eq('transaction_id', id.toString())
       .select();
 
     if (error) {
       console.error('Error updating order:', error);
       return new Response(
         JSON.stringify({ success: false, error: 'Failed to update order' }),
         { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
       );
     }
 
     console.log('Order updated:', data);
 
     return new Response(
       JSON.stringify({ success: true, message: 'Webhook processed successfully' }),
       { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
     );
   } catch (error) {
     console.error('Webhook error:', error);
     const errorMessage = error instanceof Error ? error.message : 'Unknown error';
     return new Response(
       JSON.stringify({ success: false, error: errorMessage }),
       { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
     );
   }
 });