import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PixEmailRequest {
  customerName: string;
  customerEmail: string;
  amount: number;
  pixCode: string;
  pixQrCodeUrl: string;
  transactionId: string;
  productName: string;
  expiresAt?: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body: PixEmailRequest = await req.json();

    const { customerName, customerEmail, amount, pixCode, pixQrCodeUrl, transactionId, productName, expiresAt } = body;

    if (!customerEmail || !pixCode || !transactionId) {
      throw new Error("Campos obrigatórios ausentes");
    }

    const formattedAmount = (amount / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const firstName = customerName.split(' ')[0];

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PIX Gerado - PowerHair</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%); padding: 32px; border-radius: 16px 16px 0 0; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">💜 PowerHair</h1>
              <p style="margin: 8px 0 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">Seu PIX foi gerado com sucesso!</p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 32px;">
              <p style="margin: 0 0 24px 0; font-size: 16px; color: #333333;">
                Olá <strong>${firstName}</strong>! 👋
              </p>
              
              <p style="margin: 0 0 24px 0; font-size: 16px; color: #555555; line-height: 1.6;">
                Seu pedido do <strong>${productName}</strong> está quase finalizado! Complete o pagamento via PIX para garantir sua compra.
              </p>
              
              <!-- Amount Box -->
              <table role="presentation" style="width: 100%; margin-bottom: 24px;">
                <tr>
                  <td style="background-color: #F3E8FF; padding: 20px; border-radius: 12px; text-align: center;">
                    <p style="margin: 0 0 4px 0; font-size: 14px; color: #7C3AED;">Valor a pagar:</p>
                    <p style="margin: 0 0 4px 0; font-size: 14px; color: #9CA3AF; text-decoration: line-through;">De R$ 149,00</p>
                    <p style="margin: 0; font-size: 32px; font-weight: bold; color: #7C3AED;">\${formattedAmount}</p>
                    <p style="margin: 4px 0 0 0; font-size: 12px; color: #10B981; font-weight: bold;">Economize R$ 69,10! ✨</p>
                  </td>
                </tr>
              </table>
              
              <!-- QR Code -->
              <table role="presentation" style="width: 100%; margin-bottom: 24px;">
                <tr>
                  <td align="center" style="padding: 20px; background-color: #fafafa; border-radius: 12px;">
                    <p style="margin: 0 0 16px 0; font-size: 14px; color: #666666;">Escaneie o QR Code:</p>
                    <img src="${pixQrCodeUrl}" alt="QR Code PIX" style="width: 200px; height: 200px; border-radius: 8px;">
                  </td>
                </tr>
              </table>
              
              <!-- PIX Code -->
              <table role="presentation" style="width: 100%; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 16px; background-color: #f0f0f0; border-radius: 8px;">
                    <p style="margin: 0 0 8px 0; font-size: 12px; color: #666666; text-align: center;">Ou copie o código PIX:</p>
                    <p style="margin: 0; font-size: 11px; color: #333333; word-break: break-all; text-align: center; font-family: monospace; line-height: 1.4;">
                      ${pixCode}
                    </p>
                  </td>
                </tr>
              </table>
              
              <!-- Warning -->
              <table role="presentation" style="width: 100%; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 16px; background-color: #FEF3C7; border-radius: 8px; border-left: 4px solid #F59E0B;">
                    <p style="margin: 0; font-size: 14px; color: #92400E;">
                      ⏰ <strong>Atenção:</strong> Este PIX expira em 30 minutos. Realize o pagamento o mais rápido possível para garantir sua compra.
                    </p>
                  </td>
                </tr>
              </table>
              
              <!-- Steps -->
              <p style="margin: 0 0 16px 0; font-size: 14px; color: #555555; font-weight: bold;">Como pagar:</p>
              <ol style="margin: 0 0 24px 0; padding-left: 20px; color: #555555; font-size: 14px; line-height: 1.8;">
                <li>Abra o app do seu banco</li>
                <li>Escolha pagar com PIX</li>
                <li>Escaneie o QR Code ou cole o código</li>
                <li>Confirme o pagamento</li>
              </ol>
              
              <p style="margin: 0; font-size: 14px; color: #555555; line-height: 1.6;">
                Após a confirmação do pagamento, você receberá um e-mail com os detalhes da entrega. 📦
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 24px; background-color: #fafafa; border-radius: 0 0 16px 16px; text-align: center;">
              <p style="margin: 0 0 8px 0; font-size: 12px; color: #888888;">
                Pedido #${transactionId}
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
</html>
    `;

    const emailResponse = await resend.emails.send({
      from: "PowerHair <noreply@ipolishbrasil.shop>",
      to: [customerEmail],
      subject: `💜 PIX Gerado - Complete seu pagamento de ${formattedAmount}`,
      html: emailHtml,
    });

    console.log("PIX email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ success: true, data: emailResponse }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error) {
    console.error("Error sending PIX email:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
