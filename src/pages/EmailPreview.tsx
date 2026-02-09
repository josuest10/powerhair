import { useState } from "react";
import { Button } from "@/components/ui/button";

const LOGO_URL = "https://zaqllkndnofeggnlmlrp.supabase.co/storage/v1/object/public/email-assets/powerhair-logo.png";

const sampleData = {
  firstName: "Maria",
  customerName: "Maria Silva Santos",
  customerEmail: "maria@email.com",
  customerPhone: "(11) 99999-9999",
  maskedCpf: "123.***.***-45",
  transactionId: "98765432",
  productName: "Kit SOS Crescimento e Antiqueda",
  quantity: 1,
  formattedAmount: "R$ 77,91",
  fullAddress: "Rua das Flores, 123, Centro, São Paulo/SP - CEP 01234-567",
  pixCode: "00020126580014br.gov.bcb.pix0136example-pix-code-here5204000053039865802BR5925POWERHAIR6009SAO PAULO",
  pixQrCodeUrl: "https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=example",
};

const OrderConfirmationEmail = () => `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;background-color:#f5f5f5;">
<table role="presentation" style="width:100%;border-collapse:collapse;">
<tr><td align="center" style="padding:40px 20px;">
<table role="presentation" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:16px;box-shadow:0 4px 6px rgba(0,0,0,0.1);">
<tr><td style="background:linear-gradient(135deg,#8B5CF6 0%,#A855F7 100%);padding:32px;border-radius:16px 16px 0 0;text-align:center;">
<img src="${LOGO_URL}" alt="PowerHair" style="max-width:180px;height:auto;margin-bottom:12px;">
<p style="margin:0;color:rgba(255,255,255,0.9);font-size:16px;">Pedido criado com sucesso!</p>
</td></tr>
<tr><td style="padding:32px 32px 0 32px;">
<p style="margin:0 0 16px 0;font-size:16px;color:#333;">Olá <strong>${sampleData.firstName}</strong>! 👋</p>
<p style="margin:0 0 24px 0;font-size:16px;color:#555;line-height:1.6;">Recebemos seu pedido! Confira abaixo o resumo e realize o pagamento via PIX para garantir sua compra.</p>
</td></tr>
<tr><td style="padding:0 32px;">
<table role="presentation" style="width:100%;margin-bottom:24px;border:1px solid #E5E7EB;border-radius:12px;overflow:hidden;">
<tr><td style="background-color:#F9FAFB;padding:12px 16px;border-bottom:1px solid #E5E7EB;"><p style="margin:0;font-size:14px;font-weight:bold;color:#374151;">📦 Resumo do Pedido</p></td></tr>
<tr><td style="padding:16px;">
<table role="presentation" style="width:100%;">
<tr><td style="padding:4px 0;font-size:14px;color:#6B7280;">Pedido nº</td><td style="padding:4px 0;font-size:14px;color:#111827;text-align:right;font-weight:600;">#${sampleData.transactionId}</td></tr>
<tr><td style="padding:4px 0;font-size:14px;color:#6B7280;">Produto</td><td style="padding:4px 0;font-size:14px;color:#111827;text-align:right;">${sampleData.productName}</td></tr>
<tr><td style="padding:4px 0;font-size:14px;color:#6B7280;">Quantidade</td><td style="padding:4px 0;font-size:14px;color:#111827;text-align:right;">${sampleData.quantity}</td></tr>
<tr><td style="padding:4px 0;font-size:14px;color:#6B7280;">Frete</td><td style="padding:4px 0;font-size:14px;color:#10B981;text-align:right;font-weight:600;">Grátis ✨</td></tr>
<tr><td colspan="2" style="padding:8px 0 0 0;border-top:1px solid #E5E7EB;"></td></tr>
<tr><td style="padding:4px 0;font-size:16px;color:#111827;font-weight:bold;">Total</td><td style="padding:4px 0;font-size:18px;color:#7C3AED;text-align:right;font-weight:bold;">${sampleData.formattedAmount}</td></tr>
</table>
</td></tr></table>
</td></tr>
<tr><td style="padding:0 32px;">
<table role="presentation" style="width:100%;margin-bottom:24px;border:1px solid #E5E7EB;border-radius:12px;overflow:hidden;">
<tr><td style="background-color:#F9FAFB;padding:12px 16px;border-bottom:1px solid #E5E7EB;"><p style="margin:0;font-size:14px;font-weight:bold;color:#374151;">👤 Seus Dados</p></td></tr>
<tr><td style="padding:16px;">
<table role="presentation" style="width:100%;">
<tr><td style="padding:4px 0;font-size:14px;color:#6B7280;">Nome</td><td style="padding:4px 0;font-size:14px;color:#111827;text-align:right;">${sampleData.customerName}</td></tr>
<tr><td style="padding:4px 0;font-size:14px;color:#6B7280;">E-mail</td><td style="padding:4px 0;font-size:14px;color:#111827;text-align:right;">${sampleData.customerEmail}</td></tr>
<tr><td style="padding:4px 0;font-size:14px;color:#6B7280;">Telefone</td><td style="padding:4px 0;font-size:14px;color:#111827;text-align:right;">${sampleData.customerPhone}</td></tr>
<tr><td style="padding:4px 0;font-size:14px;color:#6B7280;">CPF</td><td style="padding:4px 0;font-size:14px;color:#111827;text-align:right;">${sampleData.maskedCpf}</td></tr>
</table>
</td></tr></table>
</td></tr>
<tr><td style="padding:0 32px;">
<table role="presentation" style="width:100%;margin-bottom:24px;border:1px solid #E5E7EB;border-radius:12px;overflow:hidden;">
<tr><td style="background-color:#F9FAFB;padding:12px 16px;border-bottom:1px solid #E5E7EB;"><p style="margin:0;font-size:14px;font-weight:bold;color:#374151;">🚚 Endereço de Entrega</p></td></tr>
<tr><td style="padding:16px;"><p style="margin:0;font-size:14px;color:#111827;line-height:1.6;">${sampleData.fullAddress}</p></td></tr>
</table>
</td></tr>
<tr><td style="padding:0 32px;">
<table role="presentation" style="width:100%;margin-bottom:24px;"><tr><td style="background:linear-gradient(135deg,#7C3AED 0%,#9333EA 100%);padding:24px;border-radius:12px;text-align:center;">
<p style="margin:0 0 4px 0;font-size:14px;color:rgba(255,255,255,0.9);">Valor a pagar via PIX:</p>
<p style="margin:0;font-size:32px;font-weight:bold;color:#ffffff;">${sampleData.formattedAmount}</p>
</td></tr></table>
</td></tr>
<tr><td style="padding:0 32px;">
<table role="presentation" style="width:100%;margin-bottom:24px;"><tr><td align="center" style="padding:20px;background-color:#fafafa;border-radius:12px;">
<p style="margin:0 0 16px 0;font-size:14px;color:#666;">Escaneie o QR Code abaixo:</p>
<img src="${sampleData.pixQrCodeUrl}" alt="QR Code PIX" style="width:200px;height:200px;border-radius:8px;">
</td></tr></table>
</td></tr>
<tr><td style="padding:0 32px;">
<table role="presentation" style="width:100%;margin-bottom:24px;"><tr><td style="padding:16px;background-color:#FEF3C7;border-radius:8px;border-left:4px solid #F59E0B;">
<p style="margin:0;font-size:14px;color:#92400E;">⏰ <strong>Atenção:</strong> Este PIX expira em 30 minutos.</p>
</td></tr></table>
</td></tr>
<tr><td style="padding:24px;background-color:#fafafa;border-radius:0 0 16px 16px;text-align:center;">
<p style="margin:0 0 8px 0;font-size:12px;color:#888;">Pedido #${sampleData.transactionId}</p>
<p style="margin:0;font-size:12px;color:#888;">© 2025 PowerHair. Todos os direitos reservados.</p>
</td></tr>
</table>
</td></tr></table>
</body></html>`;

const PaymentConfirmationEmail = () => `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;background-color:#f5f5f5;">
<table role="presentation" style="width:100%;border-collapse:collapse;">
<tr><td align="center" style="padding:40px 20px;">
<table role="presentation" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:16px;box-shadow:0 4px 6px rgba(0,0,0,0.1);">
<tr><td style="background:linear-gradient(135deg,#10B981 0%,#059669 100%);padding:32px;border-radius:16px 16px 0 0;text-align:center;">
<img src="${LOGO_URL}" alt="PowerHair" style="max-width:180px;height:auto;margin-bottom:12px;">
<div style="font-size:48px;margin-bottom:8px;">✅</div>
<h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:bold;">Pagamento Confirmado!</h1>
<p style="margin:8px 0 0 0;color:rgba(255,255,255,0.9);font-size:14px;">Seu pedido foi aprovado com sucesso</p>
</td></tr>
<tr><td style="padding:32px;">
<p style="margin:0 0 24px 0;font-size:16px;color:#333;">Olá <strong>${sampleData.firstName}</strong>! 🎉</p>
<p style="margin:0 0 24px 0;font-size:16px;color:#555;line-height:1.6;">Ótimas notícias! Recebemos seu pagamento e seu pedido já está sendo preparado para envio.</p>
<table role="presentation" style="width:100%;margin-bottom:24px;border:1px solid #e5e5e5;border-radius:12px;overflow:hidden;">
<tr><td style="padding:16px;background-color:#fafafa;border-bottom:1px solid #e5e5e5;"><p style="margin:0;font-size:14px;font-weight:bold;color:#333;">📦 Resumo do Pedido</p></td></tr>
<tr><td style="padding:16px;">
<table role="presentation" style="width:100%;">
<tr><td style="padding:8px 0;font-size:14px;color:#666;">Pedido:</td><td style="padding:8px 0;font-size:14px;color:#333;text-align:right;font-weight:bold;">#${sampleData.transactionId}</td></tr>
<tr><td style="padding:8px 0;font-size:14px;color:#666;">Produto:</td><td style="padding:8px 0;font-size:14px;color:#333;text-align:right;">${sampleData.productName}</td></tr>
<tr><td style="padding:8px 0;font-size:14px;color:#666;border-top:1px solid #e5e5e5;padding-top:16px;">Total pago:</td><td style="padding:8px 0;font-size:18px;color:#10B981;text-align:right;font-weight:bold;border-top:1px solid #e5e5e5;padding-top:16px;">${sampleData.formattedAmount}</td></tr>
</table>
</td></tr></table>
<table role="presentation" style="width:100%;margin-bottom:24px;border:1px solid #e5e5e5;border-radius:12px;overflow:hidden;">
<tr><td style="padding:16px;background-color:#fafafa;border-bottom:1px solid #e5e5e5;"><p style="margin:0;font-size:14px;font-weight:bold;color:#333;">🚚 Endereço de Entrega</p></td></tr>
<tr><td style="padding:16px;"><p style="margin:0;font-size:14px;color:#555;line-height:1.8;">${sampleData.fullAddress}</p></td></tr>
</table>
<table role="presentation" style="width:100%;margin-bottom:24px;"><tr><td style="padding:20px;background-color:#EFF6FF;border-radius:12px;border-left:4px solid #3B82F6;">
<p style="margin:0 0 12px 0;font-size:14px;color:#1E40AF;font-weight:bold;">📬 Próximos passos:</p>
<ul style="margin:0;padding-left:20px;color:#1E40AF;font-size:14px;line-height:1.8;">
<li>Seu pedido será enviado em até 2 dias úteis</li>
<li>Você receberá o código de rastreio por e-mail</li>
<li>O prazo de entrega é de 5-12 dias úteis</li>
</ul>
</td></tr></table>
<p style="margin:0;font-size:14px;color:#555;line-height:1.6;text-align:center;">Obrigado por escolher a PowerHair! 💜</p>
</td></tr>
<tr><td style="padding:24px;background-color:#fafafa;border-radius:0 0 16px 16px;text-align:center;">
<p style="margin:0 0 8px 0;font-size:12px;color:#888;">Dúvidas? Responda este e-mail que teremos prazer em ajudar.</p>
<p style="margin:0;font-size:12px;color:#888;">© 2025 PowerHair. Todos os direitos reservados.</p>
</td></tr>
</table>
</td></tr></table>
</body></html>`;

const EmailPreview = () => {
  const [activeEmail, setActiveEmail] = useState<"order" | "confirmation">("order");

  const emailHtml = activeEmail === "order" ? OrderConfirmationEmail() : PaymentConfirmationEmail();

  return (
    <div className="min-h-screen bg-muted">
      <div className="sticky top-0 z-10 bg-background border-b border-border px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <h1 className="text-lg font-bold text-foreground">Preview de E-mails</h1>
          <div className="flex gap-2">
            <Button
              variant={activeEmail === "order" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveEmail("order")}
            >
              📦 Pedido Criado
            </Button>
            <Button
              variant={activeEmail === "confirmation" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveEmail("confirmation")}
            >
              ✅ Pagamento Confirmado
            </Button>
          </div>
        </div>
      </div>
      <div className="max-w-3xl mx-auto p-4">
        <iframe
          srcDoc={emailHtml}
          className="w-full bg-white rounded-xl shadow-lg border border-border"
          style={{ minHeight: "900px" }}
          title="Email Preview"
        />
      </div>
    </div>
  );
};

export default EmailPreview;
