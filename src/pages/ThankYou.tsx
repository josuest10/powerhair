import { useEffect, useRef } from "react";
import { Check, Shield, Truck, PartyPopper, Mail, Clock, ArrowLeft, Package } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { trackMetaPurchase } from "@/lib/meta-pixel";
import { trackCompletePayment } from "@/lib/tiktok-pixel";
import { clearUTMParams } from "@/lib/utm-tracker";

const PowerHairLogo = () => (
  <div className="flex items-center gap-2">
    <div className="relative w-8 h-8">
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <path
          d="M24 4C24 4 8 12 8 28C8 36 14 44 24 44C34 44 40 36 40 28C40 12 24 4 24 4Z"
          className="fill-primary"
        />
        <path
          d="M18 20C18 20 20 28 24 32M24 16C24 16 24 26 24 34M30 20C30 20 28 28 24 32"
          className="stroke-primary-foreground"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="16" cy="18" r="2" className="fill-primary-foreground/40" />
      </svg>
    </div>
    <div className="flex flex-col">
      <span className="text-base font-bold tracking-tight text-primary leading-none">POWER</span>
      <span className="text-sm font-light tracking-widest text-foreground leading-none">HAIR</span>
    </div>
  </div>
);

interface OrderDetails {
  orderId: string;
  amount: number;
  transactionId?: string; // Full transaction ID for Meta deduplication
  email?: string;
}

const ThankYou = () => {
  const location = useLocation();
  const orderDetails = location.state as OrderDetails | undefined;
  const hasTracked = useRef(false);

  const orderId = orderDetails?.orderId || `PWH${Date.now().toString().slice(-8)}`;
  const amount = orderDetails?.amount || 79.90; // Preço PIX sem desconto adicional
  const transactionId = orderDetails?.transactionId; // Full ID for deduplication

  // Track Purchase events when page loads (single source of truth for conversions)
  useEffect(() => {
    if (hasTracked.current) return;
    hasTracked.current = true;

    // Generate consistent event_id for deduplication with server-side CAPI
    const eventId = transactionId ? `purchase_${transactionId}` : `purchase_${orderId}`;

    // Meta Pixel Purchase
    trackMetaPurchase({
      value: amount,
      currency: 'BRL',
      content_ids: ['kit-sos-crescimento'],
      content_name: 'Kit SOS Crescimento e Antiqueda',
      num_items: 1,
      order_id: transactionId || orderId,
      event_id: eventId,
    });

    // TikTok Pixel CompletePayment (with event_id for server-side deduplication)
    trackCompletePayment({
      value: amount,
      currency: 'BRL',
      content_id: 'kit-sos-crescimento',
      content_name: 'Kit SOS Crescimento e Antiqueda',
      order_id: transactionId || orderId,
      event_id: eventId,
    });

    // Clear UTM params after successful purchase
    clearUTMParams();

    console.log('ThankYou: Purchase tracked (Meta + TikTok)', { orderId, amount, eventId });
  }, [amount, orderId, transactionId]);
 
   return (
     <div className="min-h-screen bg-background">
       {/* Header */}
       <header className="border-b border-border bg-background py-3">
         <div className="container max-w-4xl mx-auto px-4 flex items-center justify-center gap-3">
           <PowerHairLogo />
         </div>
       </header>
 
       <main className="container max-w-lg mx-auto px-4 py-12">
         {/* Success Animation */}
         <div className="text-center mb-8">
           <div className="relative inline-block">
             <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>
             <div className="relative w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
               <Check className="w-12 h-12 text-primary" />
             </div>
           </div>
           
           <div className="mt-6 flex items-center justify-center gap-2 text-primary">
             <PartyPopper className="w-5 h-5" />
             <span className="font-semibold">Parabéns!</span>
             <PartyPopper className="w-5 h-5" />
           </div>
           
           <h1 className="text-2xl md:text-3xl font-bold text-foreground mt-2">
             Pagamento Confirmado!
           </h1>
           <p className="text-muted-foreground mt-2">
             Seu pedido foi recebido e está sendo processado
           </p>
         </div>
 
         {/* Order Summary Card */}
         <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg">
           {/* Order Header */}
           <div className="bg-primary/5 px-6 py-4 border-b border-border">
             <div className="flex items-center justify-between">
               <div>
                 <p className="text-xs text-muted-foreground">Número do pedido</p>
                 <p className="text-lg font-bold text-foreground">#{orderId}</p>
               </div>
               <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                 <Check className="w-4 h-4" />
                 Pago
               </div>
             </div>
           </div>
 
           {/* Order Details */}
           <div className="p-6 space-y-4">
             {/* Product */}
             <div className="flex items-center gap-4 pb-4 border-b border-border">
               <div className="w-16 h-16 rounded-lg bg-secondary overflow-hidden flex-shrink-0">
                 <img
                   src="https://cdn.awsli.com.br/400x400/2814/2814407/produto/347799082/whatsapp-image-2023-09-06-at-10-41-32-eaicsvr39k-ylddlj70fy.jpeg"
                   alt="Kit SOS Crescimento"
                   className="w-full h-full object-contain"
                 />
               </div>
               <div className="flex-1 min-w-0">
                 <p className="font-medium text-foreground">Kit SOS Crescimento e Antiqueda</p>
                 <p className="text-sm text-muted-foreground">Shampoo + Máscara + Tônico</p>
               </div>
               <p className="font-bold text-foreground">
                 R$ {amount.toFixed(2).replace(".", ",")}
               </p>
             </div>
 
             {/* Info Grid */}
             <div className="grid grid-cols-2 gap-4">
               <div className="flex items-start gap-3">
                 <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                   <Package className="w-4 h-4 text-primary" />
                 </div>
                 <div>
                   <p className="text-xs text-muted-foreground">Forma de pagamento</p>
                   <p className="text-sm font-medium text-foreground">PIX</p>
                 </div>
               </div>
               
               <div className="flex items-start gap-3">
                 <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                   <Truck className="w-4 h-4 text-primary" />
                 </div>
                 <div>
                   <p className="text-xs text-muted-foreground">Previsão de entrega</p>
                   <p className="text-sm font-medium text-foreground">5-10 dias úteis</p>
                 </div>
               </div>
             </div>
           </div>
 
           {/* Email Notice */}
           <div className="bg-secondary/50 px-6 py-4 flex items-center gap-3 border-t border-border">
             <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
               <Mail className="w-5 h-5 text-primary" />
             </div>
             <div>
               <p className="text-sm font-medium text-foreground">Confirmação enviada por e-mail</p>
               <p className="text-xs text-muted-foreground">Verifique sua caixa de entrada e spam</p>
             </div>
           </div>
         </div>
 
         {/* Timeline */}
         <div className="mt-8 bg-card border border-border rounded-2xl p-6">
           <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
             <Clock className="w-4 h-4 text-primary" />
             Próximos passos
           </h3>
           <div className="space-y-4">
             <div className="flex gap-4">
               <div className="flex flex-col items-center">
                 <div className="w-3 h-3 rounded-full bg-primary"></div>
                 <div className="w-0.5 h-full bg-primary/30"></div>
               </div>
               <div>
                 <p className="text-sm font-medium text-foreground">Pagamento confirmado</p>
                 <p className="text-xs text-muted-foreground">Agora</p>
               </div>
             </div>
             <div className="flex gap-4">
               <div className="flex flex-col items-center">
                 <div className="w-3 h-3 rounded-full bg-muted-foreground/30"></div>
                 <div className="w-0.5 h-full bg-muted-foreground/20"></div>
               </div>
               <div>
                 <p className="text-sm font-medium text-muted-foreground">Preparando seu pedido</p>
                 <p className="text-xs text-muted-foreground">1-2 dias úteis</p>
               </div>
             </div>
             <div className="flex gap-4">
               <div className="flex flex-col items-center">
                 <div className="w-3 h-3 rounded-full bg-muted-foreground/30"></div>
                 <div className="w-0.5 h-full bg-transparent"></div>
               </div>
               <div>
                 <p className="text-sm font-medium text-muted-foreground">Enviado para entrega</p>
                 <p className="text-xs text-muted-foreground">Rastreio por e-mail</p>
               </div>
             </div>
           </div>
         </div>
 
         {/* Back to Store */}
         <div className="mt-8 text-center">
           <Link to="/">
             <Button variant="outline" className="gap-2">
               <ArrowLeft className="w-4 h-4" />
               Voltar para a loja
             </Button>
           </Link>
         </div>
 
         {/* Trust Badges */}
         <div className="mt-8 flex items-center justify-center gap-6 text-xs text-muted-foreground">
           <div className="flex items-center gap-1">
             <Shield className="w-4 h-4" />
             <span>Compra Segura</span>
           </div>
           <span>•</span>
           <div className="flex items-center gap-1">
             <Truck className="w-4 h-4" />
             <span>Frete Grátis</span>
           </div>
         </div>
       </main>
     </div>
   );
 };
 
 export default ThankYou;