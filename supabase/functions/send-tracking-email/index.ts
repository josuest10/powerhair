import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface TrackingEmailRequest {
  customerName: string;
  customerEmail: string;
  transactionId: string;
  productName: string;
  trackingCode: string;
  shippingCarrier?: string; // e.g. "Correios"
  shippingAddress: string;
  shippingNumber: string;
  shippingComplement?: string;
  shippingNeighborhood: string;
  shippingCity: string;
  shippingState: string;
  shippingCep: string;
}

function buildTrackingEmailHtml(
  firstName: string, transactionId: string, productName: string,
  trackingCode: string, carrier: string, fullAddress: string,
  trackingUrl: string
) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pedido Enviado - PowerHair</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f7f8f3;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #739926 0%, #608C1A 100%); padding: 32px; border-radius: 16px 16px 0 0; text-align: center;">
              <h2 style="margin: 0 0 8px 0; color: #ffffff; font-size: 24px; font-weight: bold;">PowerHair</h2>
              <div style="font-size: 48px; margin-bottom: 8px;">📦</div>
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">Pedido Enviado!</h1>
              <p style="margin: 8px 0 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">Seu pedido está a caminho</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 32px;">
              <p style="margin: 0 0 24px 0; font-size: 16px; color: #2d3319;">
                Olá <strong>${firstName}</strong>! 🎉
              </p>
              
              <p style="margin: 0 0 24px 0; font-size: 16px; color: #555555; line-height: 1.6;">
                Ótimas notícias! Seu pedido foi enviado e já está a caminho. Use o código de rastreio abaixo para acompanhar a entrega.
              </p>
              
              <!-- Tracking Code Box -->
              <table role="presentation" style="width: 100%; margin-bottom: 24px;">
                <tr>
                  <td style="background: linear-gradient(135deg, #739926 0%, #608C1A 100%); padding: 24px; border-radius: 12px; text-align: center;">
                    <p style="margin: 0 0 8px 0; font-size: 14px; color: rgba(255,255,255,0.9);">Código de Rastreio (${carrier}):</p>
                    <div style="background-color: rgba(255,255,255,0.95); display: inline-block; padding: 12px 24px; border-radius: 8px;">
                      <span style="font-size: 22px; font-weight: bold; color: #608C1A; letter-spacing: 3px; font-family: monospace;">${trackingCode}</span>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Track Button -->
              <table role="presentation" style="width: 100%; margin-bottom: 24px;">
                <tr>
                  <td align="center">
                    <a href="${trackingUrl}" style="display: inline-block; background: linear-gradient(135deg, #739926 0%, #608C1A 100%); color: #ffffff; text-decoration: none; padding: 16px 48px; border-radius: 12px; font-size: 16px; font-weight: bold; box-shadow: 0 4px 12px rgba(96,140,26,0.4);">
                      Rastrear meu pedido 🔍
                    </a>
                  </td>
                </tr>
              </table>
              
              <!-- Order Summary -->
              <table role="presentation" style="width: 100%; margin-bottom: 24px; border: 1px solid #dde4cc; border-radius: 12px; overflow: hidden;">
                <tr>
                  <td style="padding: 16px; background-color: #f4f7ec; border-bottom: 1px solid #dde4cc;">
                    <p style="margin: 0; font-size: 14px; font-weight: bold; color: #3d4a24;">📦 Detalhes do Pedido</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px;">
                    <table role="presentation" style="width: 100%;">
                      <tr>
                        <td style="padding: 8px 0; font-size: 14px; color: #666666;">Pedido:</td>
                        <td style="padding: 8px 0; font-size: 14px; color: #333333; text-align: right; font-weight: bold;">#${transactionId}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; font-size: 14px; color: #666666;">Produto:</td>
                        <td style="padding: 8px 0; font-size: 14px; color: #333333; text-align: right;">${productName}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; font-size: 14px; color: #666666;">Transportadora:</td>
                        <td style="padding: 8px 0; font-size: 14px; color: #333333; text-align: right;">${carrier}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- Shipping Address -->
              <table role="presentation" style="width: 100%; margin-bottom: 24px; border: 1px solid #dde4cc; border-radius: 12px; overflow: hidden;">
                <tr>
                  <td style="padding: 16px; background-color: #f4f7ec; border-bottom: 1px solid #dde4cc;">
                    <p style="margin: 0; font-size: 14px; font-weight: bold; color: #3d4a24;">🚚 Endereço de Entrega</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px;">
                    <p style="margin: 0; font-size: 14px; color: #555555; line-height: 1.8;">
                      ${fullAddress}
                    </p>
                  </td>
                </tr>
              </table>
              
              <!-- Delivery Tips -->
              <table role="presentation" style="width: 100%; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 20px; background-color: #f4f7ec; border-radius: 12px; border-left: 4px solid #739926;">
                    <p style="margin: 0 0 12px 0; font-size: 14px; color: #3d4a24; font-weight: bold;">💡 Dicas importantes:</p>
                    <ul style="margin: 0; padding-left: 20px; color: #3d4a24; font-size: 14px; line-height: 1.8;">
                      <li>O código pode levar até 24h para ser atualizado</li>
                      <li>Prazo estimado de entrega: 5-12 dias úteis</li>
                      <li>Certifique-se de que alguém estará no endereço para receber</li>
                      <li>São realizadas até 3 tentativas de entrega</li>
                    </ul>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 0; font-size: 14px; color: #555555; line-height: 1.6; text-align: center;">
                Seu cabelo está prestes a começar uma transformação incrível! 🌿<br>
                Estamos ansiosos para ver seus resultados.
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 24px; background-color: #f4f7ec; border-radius: 0 0 16px 16px; text-align: center;">
              <p style="margin: 0 0 8px 0; font-size: 12px; color: #888888;">
                Dúvidas sobre a entrega? Responda este e-mail que teremos prazer em ajudar.
              </p>
              <p style="margin: 0; font-size: 12px; color: #888888;">
                © 2025 PowerHair. Todos os direitos reservados.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body: TrackingEmailRequest = await req.json();

    const {
      customerName, customerEmail, transactionId, productName,
      trackingCode, shippingCarrier,
      shippingAddress, shippingNumber, shippingComplement,
      shippingNeighborhood, shippingCity, shippingState, shippingCep,
    } = body;

    if (!customerEmail || !transactionId || !trackingCode) {
      throw new Error("Campos obrigatórios ausentes (customerEmail, transactionId, trackingCode)");
    }

    const firstName = customerName.split(' ')[0];
    const carrier = shippingCarrier || "Correios";
    
    const formattedCep = shippingCep.replace(/(\d{5})(\d{3})/, '$1-$2');
    const fullAddress = [
      `${shippingAddress}, ${shippingNumber}`,
      shippingComplement,
      shippingNeighborhood,
      `${shippingCity} - ${shippingState}`,
      `CEP: ${formattedCep}`,
    ].filter(Boolean).join('<br>');

    const trackingUrl = `https://www.linkcorreios.com.br/?id=${encodeURIComponent(trackingCode)}`;

    const emailHtml = buildTrackingEmailHtml(
      firstName, transactionId, productName,
      trackingCode, carrier, fullAddress, trackingUrl
    );

    const emailResponse = await resend.emails.send({
      from: "PowerHair <noreply@ipolishbrasil.shop>",
      to: [customerEmail],
      subject: `📦 Seu pedido #${transactionId} foi enviado! Rastreie aqui`,
      html: emailHtml,
    });

    console.log("Tracking email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ success: true, data: emailResponse }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error) {
    console.error("Error sending tracking email:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
