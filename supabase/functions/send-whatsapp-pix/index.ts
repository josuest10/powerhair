import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface WhatsAppPixRequest {
  customerPhone: string;
  customerName: string;
  pixCode: string;
  amount: number;
  transactionId: string;
  productName: string;
  expiresAt?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const ZAPI_INSTANCE_ID = Deno.env.get('ZAPI_INSTANCE_ID');
    const ZAPI_TOKEN = Deno.env.get('ZAPI_TOKEN');

    if (!ZAPI_INSTANCE_ID || !ZAPI_TOKEN) {
      throw new Error('Z-API credentials are not configured');
    }

    const body: WhatsAppPixRequest = await req.json();

    // Format phone: ensure it starts with 55 and has only digits
    let phone = body.customerPhone.replace(/\D/g, '');
    if (!phone.startsWith('55')) {
      phone = '55' + phone;
    }

    // Format amount to BRL
    const amountBRL = (body.amount / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    const message = `Olá, ${body.customerName.split(' ')[0]}! 🎉

Seu pedido *${body.transactionId}* foi gerado com sucesso!

📦 *Produto:* ${body.productName}
💰 *Valor:* ${amountBRL}
💳 *Pagamento:* PIX

Copie o código PIX abaixo para efetuar o pagamento:

\`\`\`${body.pixCode}\`\`\`

⏰ *Atenção:* O PIX expira em 30 minutos.

Após o pagamento, você receberá a confirmação automaticamente. 

Qualquer dúvida, estamos à disposição! 💚

_PowerHair - Cuidados Capilares_`;

    console.log(`Sending WhatsApp message to ${phone}`);

    const response = await fetch(
      `https://api.z-api.io/instances/${ZAPI_INSTANCE_ID}/token/${ZAPI_TOKEN}/send-text`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone,
          message,
        }),
      }
    );

    const data = await response.json();
    console.log('Z-API response:', JSON.stringify(data));

    if (!response.ok) {
      console.error('Z-API error:', data);
      return new Response(
        JSON.stringify({ success: false, error: data }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, messageId: data.messageId || data.zapiMessageId }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error sending WhatsApp:', error);
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
