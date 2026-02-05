 import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
 
 const corsHeaders = {
   'Access-Control-Allow-Origin': '*',
   'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
 };
 
 interface PaymentRequest {
   amount: number;
   customer: {
     name: string;
     email: string;
     document: string;
     phone: string;
   };
   items: {
     name: string;
     description: string;
     quantity: number;
     amount: number;
   }[];
   shipping: {
     name: string;
     address: string;
     number: string;
     complement?: string;
     neighborhood: string;
     city: string;
     state: string;
     zipCode: string;
   };
 }
 
 serve(async (req) => {
   // Handle CORS preflight
   if (req.method === 'OPTIONS') {
     return new Response(null, { headers: corsHeaders });
   }
 
   try {
     const PODPAY_PUBLIC_KEY = Deno.env.get('PODPAY_PUBLIC_KEY');
     const PODPAY_SECRET_KEY = Deno.env.get('PODPAY_SECRET_KEY');
 
     if (!PODPAY_PUBLIC_KEY) {
       throw new Error('PODPAY_PUBLIC_KEY is not configured');
     }
     if (!PODPAY_SECRET_KEY) {
       throw new Error('PODPAY_SECRET_KEY is not configured');
     }
 
     const body: PaymentRequest = await req.json();
 
     // Validate required fields
     if (!body.amount || body.amount <= 0) {
       return new Response(
         JSON.stringify({ success: false, error: 'Amount is required and must be positive' }),
         { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
       );
     }
 
     if (!body.customer?.name || !body.customer?.email || !body.customer?.document) {
       return new Response(
         JSON.stringify({ success: false, error: 'Customer data is incomplete' }),
         { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
       );
     }
 
     // Create Basic Auth header
     const auth = 'Basic ' + btoa(`${PODPAY_PUBLIC_KEY}:${PODPAY_SECRET_KEY}`);
 
     // Format phone number (remove non-digits)
     const phoneDigits = body.customer.phone.replace(/\D/g, '');
     const phoneAreaCode = phoneDigits.substring(0, 2);
     const phoneNumber = phoneDigits.substring(2);
 
     // Build Podpay payload
     const payload = {
       amount: body.amount, // Already in cents
       paymentMethod: 'pix',
       pix: {
         expiresIn: 1800, // 30 minutes
       },
       items: body.items.map(item => ({
         name: item.name,
         description: item.description,
         quantity: item.quantity,
         amount: item.amount,
         isPhysical: true,
       })),
       shipping: {
         name: body.shipping.name,
         country: 'BR',
         state: body.shipping.state,
         city: body.shipping.city,
         zipCode: body.shipping.zipCode.replace(/\D/g, ''),
         neighborhood: body.shipping.neighborhood,
         street: body.shipping.address,
         number: body.shipping.number,
         complement: body.shipping.complement || '',
       },
       customer: {
         name: body.customer.name,
         email: body.customer.email,
         document: body.customer.document.replace(/\D/g, ''),
         phone: {
           areaCode: phoneAreaCode,
           number: phoneNumber,
         },
       },
     };
 
     console.log('Sending payment request to Podpay:', JSON.stringify(payload, null, 2));
 
     const response = await fetch('https://api.podpay.pro/v1/transactions', {
       method: 'POST',
       headers: {
         'Authorization': auth,
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(payload),
     });
 
     const data = await response.json();
 
     console.log('Podpay response:', JSON.stringify(data, null, 2));
 
     if (!response.ok) {
       console.error('Podpay error:', data);
       return new Response(
         JSON.stringify({ 
           success: false, 
           error: data.message || 'Payment creation failed',
           details: data
         }),
         { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
       );
     }
 
     // Return successful response with PIX data
     return new Response(
       JSON.stringify({
         success: true,
         transactionId: data.id,
         status: data.status,
         pix: {
           qrCode: data.pix?.qrCode,
           qrCodeImage: data.pix?.qrCodeImage,
           expiresAt: data.pix?.expiresAt,
         },
         amount: data.amount,
       }),
       { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
     );
   } catch (error) {
     console.error('Error creating PIX payment:', error);
     const errorMessage = error instanceof Error ? error.message : 'Unknown error';
     return new Response(
       JSON.stringify({ success: false, error: errorMessage }),
       { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
     );
   }
 });