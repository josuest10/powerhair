import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface RecoveryEmailRequest {
  customerName: string;
  customerEmail: string;
  amount: number;
  productName: string;
  transactionId: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body: RecoveryEmailRequest = await req.json();

    const { customerName, customerEmail, amount, productName, transactionId } = body;

    if (!customerEmail || !transactionId) {
      throw new Error("Campos obrigatórios ausentes");
    }

    const formattedAmount = (amount / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const firstName = customerName.split(' ')[0];

    // Generate a new checkout URL with coupon code
    const couponCode = "VOLTEI10";
    const checkoutUrl = `https://powerhair.lovable.app/checkout?cupom=${couponCode}`;
    
    // Calculate discounted price (10% off)
    const discountedAmount = amount * 0.90;
    const formattedDiscountedAmount = (discountedAmount / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ainda dá tempo! - PowerHair</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%); padding: 32px; border-radius: 16px 16px 0 0; text-align: center;">
              <div style="font-size: 48px; margin-bottom: 8px;">⏰</div>
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: bold;">Seu PIX expirou, mas ainda dá tempo!</h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 32px;">
              <p style="margin: 0 0 24px 0; font-size: 16px; color: #333333;">
                Olá <strong>${firstName}</strong>! 👋
              </p>
              
              <p style="margin: 0 0 24px 0; font-size: 16px; color: #555555; line-height: 1.6;">
                Notamos que você iniciou a compra do <strong>${productName}</strong>, mas o PIX expirou antes do pagamento. 😔
              </p>
              
              <p style="margin: 0 0 24px 0; font-size: 16px; color: #555555; line-height: 1.6;">
                Não se preocupe! Separamos seu kit e você ainda pode garantir sua compra com o <strong>mesmo desconto especial</strong>:
              </p>
              
              <!-- Coupon Box -->
              <table role="presentation" style="width: 100%; margin-bottom: 24px;">
                <tr>
                  <td style="background: linear-gradient(135deg, #10B981 0%, #059669 100%); padding: 16px; border-radius: 12px; text-align: center;">
                    <p style="margin: 0 0 4px 0; font-size: 12px; color: rgba(255,255,255,0.9); text-transform: uppercase; letter-spacing: 1px;">🎁 Cupom exclusivo de recuperação</p>
                    <p style="margin: 0; font-size: 28px; font-weight: bold; color: #ffffff; letter-spacing: 3px; font-family: monospace;">${couponCode}</p>
                    <p style="margin: 8px 0 0 0; font-size: 14px; color: #FEF3C7; font-weight: bold;">10% OFF adicional no seu pedido!</p>
                  </td>
                </tr>
              </table>
              
              <!-- Price Box -->
              <table role="presentation" style="width: 100%; margin-bottom: 24px;">
                <tr>
                  <td style="background: linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%); padding: 24px; border-radius: 12px; text-align: center;">
                    <p style="margin: 0 0 4px 0; font-size: 14px; color: rgba(255,255,255,0.9);">Valor especial com cupom:</p>
                    <p style="margin: 0 0 4px 0; font-size: 16px; color: rgba(255,255,255,0.7); text-decoration: line-through;">De R$ 149,00</p>
                    <p style="margin: 0 0 4px 0; font-size: 14px; color: rgba(255,255,255,0.5); text-decoration: line-through;">\${formattedAmount}</p>
                    <p style="margin: 0; font-size: 36px; font-weight: bold; color: #ffffff;">\${formattedDiscountedAmount}</p>
                    <p style="margin: 8px 0 0 0; font-size: 14px; color: #4ADE80; font-weight: bold;">Economia total de R$ 61,70! 🎉</p>
                    <p style="margin: 8px 0 0 0; font-size: 12px; color: rgba(255,255,255,0.8);">+ Frete Grátis + Brinde Exclusivo 🎁</p>
                  </td>
                </tr>
              </table>
              
              <!-- Benefits -->
              <table role="presentation" style="width: 100%; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 20px; background-color: #F0FDF4; border-radius: 12px; border-left: 4px solid #10B981;">
                    <p style="margin: 0 0 12px 0; font-size: 14px; color: #065F46; font-weight: bold;">✨ Por que milhares de mulheres escolhem o Kit SOS:</p>
                    <ul style="margin: 0; padding-left: 20px; color: #065F46; font-size: 14px; line-height: 1.8;">
                      <li>Resultados visíveis em 30 dias</li>
                      <li>Fórmula 100% natural e vegana</li>
                      <li>Aprovado pela ANVISA</li>
                      <li>Garantia de 30 dias ou seu dinheiro de volta</li>
                    </ul>
                  </td>
                </tr>
              </table>
              
              <!-- CTA Button -->
              <table role="presentation" style="width: 100%; margin-bottom: 24px;">
                <tr>
                  <td align="center">
                    <a href="${checkoutUrl}" style="display: inline-block; background: linear-gradient(135deg, #10B981 0%, #059669 100%); color: #ffffff; text-decoration: none; padding: 18px 48px; border-radius: 12px; font-size: 18px; font-weight: bold; box-shadow: 0 4px 14px rgba(16, 185, 129, 0.4);">
                      🛒 QUERO FINALIZAR MINHA COMPRA
                    </a>
                  </td>
                </tr>
              </table>
              
              <!-- Urgency -->
              <table role="presentation" style="width: 100%; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 16px; background-color: #FEF3C7; border-radius: 8px; text-align: center;">
                    <p style="margin: 0; font-size: 14px; color: #92400E;">
                      ⚡ <strong>Oferta por tempo limitado!</strong> Garantimos esse valor especial apenas por mais 24 horas.
                    </p>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 0; font-size: 14px; color: #888888; line-height: 1.6; text-align: center;">
                Teve algum problema no pagamento? Responda este e-mail que te ajudamos! 💜
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 24px; background-color: #fafafa; border-radius: 0 0 16px 16px; text-align: center;">
              <p style="margin: 0 0 8px 0; font-size: 12px; color: #888888;">
                Você recebeu este e-mail porque iniciou uma compra em powerhair.lovable.app
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
      subject: `⏰ ${firstName}, seu PIX expirou - Finalize sua compra com desconto!`,
      html: emailHtml,
    });

    console.log("Recovery email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ success: true, data: emailResponse }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error) {
    console.error("Error sending recovery email:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
