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
     const PODPAY_PUBLIC_KEY = Deno.env.get('PODPAY_PUBLIC_KEY');
     const PODPAY_SECRET_KEY = Deno.env.get('PODPAY_SECRET_KEY');
     const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
     const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY');
 
     if (!PODPAY_PUBLIC_KEY || !PODPAY_SECRET_KEY) {
       throw new Error('PODPAY credentials are not configured');
     }
 
     const { transactionId } = await req.json();
 
     if (!transactionId) {
       return new Response(
         JSON.stringify({ success: false, error: 'Transaction ID is required' }),
         { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
       );
     }
 
    // First check local database (faster if webhook already updated)
    if (SUPABASE_URL && SUPABASE_ANON_KEY) {
      const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      const { data: orderData } = await supabase
        .from('orders')
        .select('status, paid_at')
        .eq('transaction_id', transactionId.toString())
        .single();
 
      if (orderData?.status === 'paid') {
        console.log('Payment confirmed via webhook (local DB)');
        return new Response(
          JSON.stringify({
            success: true,
            transactionId,
            status: 'paid',
            isPaid: true,
            paidAt: orderData.paid_at,
          }),
          { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }
 
    // Fallback to Podpay API check
     // Create Basic Auth header
     const auth = 'Basic ' + btoa(`${PODPAY_PUBLIC_KEY}:${PODPAY_SECRET_KEY}`);
 
     console.log('Checking payment status for transaction:', transactionId);
 
     const response = await fetch(`https://api.podpay.pro/v1/transactions/${transactionId}`, {
       method: 'GET',
       headers: {
         'Authorization': auth,
         'Content-Type': 'application/json',
       },
     });
 
     const data = await response.json();
 
     console.log('Podpay transaction status:', data.status);
 
     if (!response.ok) {
       console.error('Podpay error:', data);
       return new Response(
         JSON.stringify({ 
           success: false, 
           error: data.message || 'Failed to check payment status',
         }),
         { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
       );
     }
 
     // Possible statuses from Podpay: waiting_payment, paid, refused, refunded, chargedback
     const isPaid = data.status === 'paid';
 
     return new Response(
       JSON.stringify({
         success: true,
         transactionId: data.id,
         status: data.status,
         isPaid,
         paidAt: data.paidAt,
         paidAmount: data.paidAmount,
       }),
       { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
     );
   } catch (error) {
     console.error('Error checking payment status:', error);
     const errorMessage = error instanceof Error ? error.message : 'Unknown error';
     return new Response(
       JSON.stringify({ success: false, error: errorMessage }),
       { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
     );
   }
 });