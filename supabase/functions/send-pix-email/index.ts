import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface OrderEmailRequest {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerCpf: string;
  amount: number;
  pixCode: string;
  pixQrCodeUrl: string;
  transactionId: string;
  productName: string;
  quantity: number;
  shipping: {
    address: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    cep: string;
  };
  expiresAt?: string;
}

function buildPixEmailHtml(
  firstName: string, customerName: string, customerEmail: string,
  customerPhone: string, maskedCpf: string, formattedAmount: string,
  transactionId: string, productName: string, quantity: number,
  fullAddress: string, pixQrCodeUrl: string, pixCode: string
) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pedido Criado - PowerHair</title>
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
              <p style="margin: 0; color: rgba(255,255,255,0.95); font-size: 16px; font-weight: 500;">Pedido criado com sucesso! 🌿</p>
            </td>
          </tr>
          
          <!-- Greeting -->
          <tr>
            <td style="padding: 32px 32px 0 32px;">
              <p style="margin: 0 0 16px 0; font-size: 16px; color: #2d3319;">
                Olá <strong>${firstName}</strong>! 👋
              </p>
              <p style="margin: 0 0 24px 0; font-size: 16px; color: #555555; line-height: 1.6;">
                Recebemos seu pedido! Confira abaixo o resumo e realize o pagamento via PIX para garantir sua compra.
              </p>
            </td>
          </tr>

          <!-- Order Summary -->
          <tr>
            <td style="padding: 0 32px;">
              <table role="presentation" style="width: 100%; margin-bottom: 24px; border: 1px solid #dde4cc; border-radius: 12px; overflow: hidden;">
                <tr>
                  <td style="background-color: #f4f7ec; padding: 12px 16px; border-bottom: 1px solid #dde4cc;">
                    <p style="margin: 0; font-size: 14px; font-weight: bold; color: #3d4a24;">📦 Resumo do Pedido</p>
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
                        <td style="padding: 4px 0; font-size: 14px; color: #6B7280;">Quantidade</td>
                        <td style="padding: 4px 0; font-size: 14px; color: #111827; text-align: right;">${quantity}</td>
                      </tr>
                      <tr>
                        <td style="padding: 4px 0; font-size: 14px; color: #6B7280;">Frete</td>
                        <td style="padding: 4px 0; font-size: 14px; color: #608C1A; text-align: right; font-weight: 600;">Grátis ✨</td>
                      </tr>
                      <tr>
                        <td colspan="2" style="padding: 8px 0 0 0; border-top: 1px solid #dde4cc;"></td>
                      </tr>
                      <tr>
                        <td style="padding: 4px 0; font-size: 16px; color: #111827; font-weight: bold;">Total</td>
                        <td style="padding: 4px 0; font-size: 18px; color: #608C1A; text-align: right; font-weight: bold;">${formattedAmount}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Customer Data -->
          <tr>
            <td style="padding: 0 32px;">
              <table role="presentation" style="width: 100%; margin-bottom: 24px; border: 1px solid #dde4cc; border-radius: 12px; overflow: hidden;">
                <tr>
                  <td style="background-color: #f4f7ec; padding: 12px 16px; border-bottom: 1px solid #dde4cc;">
                    <p style="margin: 0; font-size: 14px; font-weight: bold; color: #3d4a24;">👤 Seus Dados</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px;">
                    <table role="presentation" style="width: 100%;">
                      <tr>
                        <td style="padding: 4px 0; font-size: 14px; color: #6B7280;">Nome</td>
                        <td style="padding: 4px 0; font-size: 14px; color: #111827; text-align: right;">${customerName}</td>
                      </tr>
                      <tr>
                        <td style="padding: 4px 0; font-size: 14px; color: #6B7280;">E-mail</td>
                        <td style="padding: 4px 0; font-size: 14px; color: #111827; text-align: right;">${customerEmail}</td>
                      </tr>
                      <tr>
                        <td style="padding: 4px 0; font-size: 14px; color: #6B7280;">Telefone</td>
                        <td style="padding: 4px 0; font-size: 14px; color: #111827; text-align: right;">${customerPhone}</td>
                      </tr>
                      <tr>
                        <td style="padding: 4px 0; font-size: 14px; color: #6B7280;">CPF</td>
                        <td style="padding: 4px 0; font-size: 14px; color: #111827; text-align: right;">${maskedCpf}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Shipping Address -->
          <tr>
            <td style="padding: 0 32px;">
              <table role="presentation" style="width: 100%; margin-bottom: 24px; border: 1px solid #dde4cc; border-radius: 12px; overflow: hidden;">
                <tr>
                  <td style="background-color: #f4f7ec; padding: 12px 16px; border-bottom: 1px solid #dde4cc;">
                    <p style="margin: 0; font-size: 14px; font-weight: bold; color: #3d4a24;">🚚 Endereço de Entrega</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px;">
                    <p style="margin: 0; font-size: 14px; color: #111827; line-height: 1.6;">${fullAddress}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- PIX Payment -->
          <tr>
            <td style="padding: 0 32px;">
              <table role="presentation" style="width: 100%; margin-bottom: 24px;">
                <tr>
                  <td style="background: linear-gradient(135deg, #739926 0%, #608C1A 100%); padding: 24px; border-radius: 12px; text-align: center;">
                    <p style="margin: 0 0 4px 0; font-size: 14px; color: rgba(255,255,255,0.9);">Valor a pagar via PIX:</p>
                    <p style="margin: 0; font-size: 32px; font-weight: bold; color: #ffffff;">${formattedAmount}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- QR Code -->
          <tr>
            <td style="padding: 0 32px;">
              <table role="presentation" style="width: 100%; margin-bottom: 24px;">
                <tr>
                  <td align="center" style="padding: 20px; background-color: #f4f7ec; border-radius: 12px;">
                    <p style="margin: 0 0 16px 0; font-size: 14px; color: #555;">Escaneie o QR Code abaixo:</p>
                    <img src="${pixQrCodeUrl}" alt="QR Code PIX" style="width: 200px; height: 200px; border-radius: 8px;">
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- PIX Code -->
          <tr>
            <td style="padding: 0 32px;">
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
            </td>
          </tr>

          <!-- Warning -->
          <tr>
            <td style="padding: 0 32px;">
              <table role="presentation" style="width: 100%; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 16px; background-color: #fef9e7; border-radius: 8px; border-left: 4px solid #d4a017;">
                    <p style="margin: 0; font-size: 14px; color: #7a5c00;">
                      ⏰ <strong>Atenção:</strong> Este PIX expira em 30 minutos. Realize o pagamento o mais rápido possível.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Steps -->
          <tr>
            <td style="padding: 0 32px 32px 32px;">
              <p style="margin: 0 0 16px 0; font-size: 14px; color: #555555; font-weight: bold;">Como pagar:</p>
              <ol style="margin: 0 0 24px 0; padding-left: 20px; color: #555555; font-size: 14px; line-height: 1.8;">
                <li>Abra o app do seu banco</li>
                <li>Escolha pagar com PIX</li>
                <li>Escaneie o QR Code ou cole o código</li>
                <li>Confirme o pagamento</li>
              </ol>
              <p style="margin: 0; font-size: 14px; color: #555555; line-height: 1.6;">
                Após a confirmação, você receberá um e-mail com os detalhes da entrega. 📦
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
    const body: OrderEmailRequest = await req.json();
    const {
      customerName, customerEmail, customerPhone, customerCpf,
      amount, pixCode, pixQrCodeUrl, transactionId, productName,
      quantity, shipping,
    } = body;

    if (!customerEmail || !pixCode || !transactionId) {
      throw new Error("Campos obrigatórios ausentes");
    }

    const formattedAmount = (amount / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const firstName = customerName.split(' ')[0];
    const maskedCpf = customerCpf.replace(/(\d{3})\d{3}\d{3}(\d{2})/, '$1.***.***-$2');
    const formattedCep = shipping.cep.replace(/(\d{5})(\d{3})/, '$1-$2');
    const fullAddress = `${shipping.address}, ${shipping.number}${shipping.complement ? ` - ${shipping.complement}` : ''}, ${shipping.neighborhood}, ${shipping.city}/${shipping.state} - CEP ${formattedCep}`;

    const emailHtml = buildPixEmailHtml(
      firstName, customerName, customerEmail, customerPhone,
      maskedCpf, formattedAmount, transactionId, productName,
      quantity, fullAddress, pixQrCodeUrl, pixCode
    );

    const emailResponse = await resend.emails.send({
      from: "PowerHair <noreply@ipolishbrasil.shop>",
      to: [customerEmail],
      subject: `✅ Pedido #${transactionId} criado - Finalize o pagamento via PIX`,
      html: emailHtml,
    });

    console.log("Order confirmation email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ success: true, data: emailResponse }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error) {
    console.error("Error sending order email:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
