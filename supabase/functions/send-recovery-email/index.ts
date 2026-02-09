import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function buildRecoveryEmailHtml(firstName: string, productName: string, formattedAmount: string, transactionId: string, checkoutUrl: string) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Seu cabelo merece atenção - PowerHair</title>
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
              <div style="font-size: 48px; margin-bottom: 8px;">💔</div>
              <p style="margin: 0; color: rgba(255,255,255,0.95); font-size: 18px; font-weight: 600;">Você esqueceu de algo importante...</p>
            </td>
          </tr>
          
          <!-- Emotional Copy -->
          <tr>
            <td style="padding: 32px;">
              <p style="margin: 0 0 20px 0; font-size: 18px; color: #2d3319; font-weight: bold;">
                ${firstName}, você realmente vai desistir do seu cabelo?
              </p>
              <p style="margin: 0 0 16px 0; font-size: 16px; color: #555555; line-height: 1.7;">
                Seu pedido do <strong>${productName}</strong> ainda está esperando por você. O pagamento não foi concluído e seu pedido será cancelado em breve.
              </p>
              <p style="margin: 0 0 16px 0; font-size: 16px; color: #555555; line-height: 1.7;">
                Sabemos que às vezes a vida corrida atrapalha, mas pense: <strong>quantos dias mais você vai deixar seu cabelo sem os cuidados que ele precisa?</strong>
              </p>
              <p style="margin: 0 0 24px 0; font-size: 16px; color: #555555; line-height: 1.7;">
                Cada dia que passa sem tratamento é um dia a mais de queda, ressecamento e danos. Seu cabelo está pedindo socorro. 🥺
              </p>

              <!-- Coupon -->
              <table role="presentation" style="width: 100%; margin-bottom: 24px;">
                <tr>
                  <td style="background: linear-gradient(135deg, #d4a017 0%, #b8860b 100%); padding: 24px; border-radius: 12px; text-align: center;">
                    <p style="margin: 0 0 4px 0; font-size: 14px; color: rgba(255,255,255,0.9);">🎁 Presente especial só pra você:</p>
                    <p style="margin: 0 0 8px 0; font-size: 36px; font-weight: bold; color: #ffffff;">10% OFF</p>
                    <p style="margin: 0 0 12px 0; font-size: 14px; color: rgba(255,255,255,0.9);">Use o cupom no checkout:</p>
                    <div style="background-color: rgba(255,255,255,0.95); display: inline-block; padding: 10px 24px; border-radius: 8px;">
                      <span style="font-size: 20px; font-weight: bold; color: #b8860b; letter-spacing: 3px; font-family: monospace;">VOLTEI10</span>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Order reminder -->
              <table role="presentation" style="width: 100%; margin-bottom: 24px; border: 1px solid #dde4cc; border-radius: 12px; overflow: hidden;">
                <tr>
                  <td style="background-color: #f4f7ec; padding: 12px 16px; border-bottom: 1px solid #dde4cc;">
                    <p style="margin: 0; font-size: 14px; font-weight: bold; color: #3d4a24;">📦 Seu Pedido Pendente</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px;">
                    <table role="presentation" style="width: 100%;">
                      <tr>
                        <td style="padding: 4px 0; font-size: 14px; color: #6B7280;">Pedido nº</td>
                        <td style="padding: 4px 0; font-size: 14px; color: #111827; text-align: right; font-weight: 600;">#${transactionId}</td>
                      </tr>
                      <tr>
                        <td style="padding: 4px 0; font-size: 14px; color: #6B7280;">Produto</td>
                        <td style="padding: 4px 0; font-size: 14px; color: #111827; text-align: right;">${productName}</td>
                      </tr>
                      <tr>
                        <td style="padding: 4px 0; font-size: 14px; color: #6B7280;">Valor original</td>
                        <td style="padding: 4px 0; font-size: 14px; color: #111827; text-align: right;">${formattedAmount}</td>
                      </tr>
                      <tr>
                        <td colspan="2" style="padding: 8px 0 0 0; border-top: 1px solid #dde4cc;"></td>
                      </tr>
                      <tr>
                        <td style="padding: 4px 0; font-size: 14px; color: #608C1A; font-weight: bold;">Com cupom VOLTEI10</td>
                        <td style="padding: 4px 0; font-size: 16px; color: #608C1A; text-align: right; font-weight: bold;">-10% 🎉</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table role="presentation" style="width: 100%; margin-bottom: 24px;">
                <tr>
                  <td align="center">
                    <a href="${checkoutUrl}" style="display: inline-block; background: linear-gradient(135deg, #739926 0%, #608C1A 100%); color: #ffffff; text-decoration: none; padding: 16px 48px; border-radius: 12px; font-size: 18px; font-weight: bold; box-shadow: 0 4px 12px rgba(96, 140, 26, 0.4);">
                      Quero cuidar do meu cabelo! 💚
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Urgency -->
              <table role="presentation" style="width: 100%; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 16px; background-color: #fef9e7; border-radius: 8px; border-left: 4px solid #d4a017;">
                    <p style="margin: 0; font-size: 14px; color: #7a5c00;">
                      ⏰ <strong>Atenção:</strong> Este cupom é válido apenas por 24 horas. Não deixe para depois!
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Social Proof -->
              <p style="margin: 0 0 8px 0; font-size: 14px; color: #555; text-align: center; line-height: 1.6;">
                <strong>+2.000 mulheres</strong> já transformaram seus cabelos com PowerHair.
              </p>
              <p style="margin: 0; font-size: 14px; color: #555; text-align: center; line-height: 1.6;">
                Não fique de fora dessa transformação! ✨
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 24px; background-color: #f4f7ec; border-radius: 0 0 16px 16px; text-align: center;">
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
</html>`;
}

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

    // Find orders waiting_payment created between 1h and 3h ago, not yet sent recovery
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const threeHoursAgo = new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString();

    const { data: pendingOrders, error: fetchError } = await supabase
      .from("orders")
      .select("id, transaction_id, customer_email, customer_name, product_name, amount")
      .eq("status", "waiting_payment")
      .eq("recovery_email_sent", false)
      .lt("created_at", oneHourAgo)
      .gt("created_at", threeHoursAgo);

    if (fetchError) {
      console.error("Error fetching pending orders:", fetchError);
      throw fetchError;
    }

    console.log(`Found ${pendingOrders?.length || 0} orders for recovery email`);

    let sent = 0;
    const checkoutUrl = "https://powerhair.lovable.app/checkout";

    for (const order of pendingOrders || []) {
      const firstName = order.customer_name.split(' ')[0];
      const formattedAmount = (order.amount / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

      const emailHtml = buildRecoveryEmailHtml(
        firstName,
        order.product_name,
        formattedAmount,
        order.transaction_id,
        checkoutUrl
      );

      try {
        await resend.emails.send({
          from: "PowerHair <noreply@ipolishbrasil.shop>",
          to: [order.customer_email],
          subject: `${firstName}, você vai deixar seu cabelo assim? 💔 Ganhe 10% OFF`,
          html: emailHtml,
        });

        await supabase
          .from("orders")
          .update({ recovery_email_sent: true })
          .eq("id", order.id);

        sent++;
        console.log(`✅ Recovery email sent to ${order.customer_email} for order ${order.transaction_id}`);
      } catch (emailError) {
        console.error(`❌ Failed to send recovery email for order ${order.transaction_id}:`, emailError);
      }
    }

    return new Response(
      JSON.stringify({ success: true, found: pendingOrders?.length || 0, sent }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error) {
    console.error("Error in recovery email function:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
