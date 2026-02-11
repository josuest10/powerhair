import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const ZAPI_INSTANCE_ID = Deno.env.get('ZAPI_INSTANCE_ID');
    const ZAPI_TOKEN = Deno.env.get('ZAPI_TOKEN');
    const ZAPI_CLIENT_TOKEN = Deno.env.get('ZAPI_CLIENT_TOKEN');

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('Supabase credentials not configured');
    }
    if (!ZAPI_INSTANCE_ID || !ZAPI_TOKEN || !ZAPI_CLIENT_TOKEN) {
      throw new Error('Z-API credentials not configured');
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Find orders waiting_payment for 15+ minutes, not yet reminded, created within last 2 hours
    const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000).toISOString();
    const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString();

    const { data: pendingOrders, error: fetchError } = await supabase
      .from('orders')
      .select('id, transaction_id, customer_name, customer_phone, product_name, amount')
      .eq('status', 'waiting_payment')
      .eq('whatsapp_reminder_sent', false)
      .lt('created_at', fifteenMinutesAgo)
      .gt('created_at', twoHoursAgo);

    if (fetchError) {
      throw fetchError;
    }

    console.log(`Found ${pendingOrders?.length || 0} orders to send reminder`);

    let sent = 0;
    for (const order of pendingOrders || []) {
      // Format phone
      let phone = order.customer_phone.replace(/\D/g, '');
      if (!phone.startsWith('55')) {
        phone = '55' + phone;
      }

      const firstName = order.customer_name.split(' ')[0];
      const amountBRL = (order.amount / 100).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });

      const message = `Oi, ${firstName}! 💚

Passando aqui porque notei que seu *${order.product_name}* ainda está esperando por você! 🧴✨

Milhares de mulheres já estão transformando seus cabelos com o Kit SOS — e o seu está *reservado* e pronto pra sair!

⏳ Mas atenção: *seu PIX expira em poucos minutos* e não conseguimos garantir o estoque por muito tempo.

💰 Valor: *${amountBRL}* com *frete grátis* pra todo o Brasil!

👉 É só abrir o app do banco, colar o código PIX e pronto — seu kit já entra na fila de envio *hoje mesmo*!

Se precisar de ajuda com o pagamento ou tiver qualquer dúvida, me chama aqui que te ajudo na hora! 😊

_PowerHair - Cuidados Capilares_ 🌿`;

      try {
        const response = await fetch(
          `https://api.z-api.io/instances/${ZAPI_INSTANCE_ID}/token/${ZAPI_TOKEN}/send-text`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Client-Token': ZAPI_CLIENT_TOKEN,
            },
            body: JSON.stringify({ phone, message }),
          }
        );

        const data = await response.json();
        console.log(`Reminder sent to ${phone}:`, JSON.stringify(data));

        if (response.ok) {
          await supabase
            .from('orders')
            .update({ whatsapp_reminder_sent: true })
            .eq('id', order.id);
          sent++;
        }
      } catch (err) {
        console.error(`Error sending reminder for order ${order.transaction_id}:`, err);
      }
    }

    return new Response(
      JSON.stringify({ success: true, found: pendingOrders?.length || 0, sent }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error processing reminders:', error);
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
