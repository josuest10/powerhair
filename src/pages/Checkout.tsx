import { useState, useRef, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Copy, Check, Clock, Shield, Truck, Lock, Loader2, AlertCircle, Sparkles, Gift, CheckCircle2, MapPin, Facebook, Instagram, Youtube, Twitter, Mail, Phone, Star, CreditCard } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { QRCodeSVG } from "qrcode.react";
import { validateCPF } from "@/lib/cpf-validator";
import { trackInitiateCheckout, identifyUser } from "@/lib/tiktok-pixel";
import { trackMetaInitiateCheckout, trackMetaLead, updateMetaAdvancedMatching } from "@/lib/meta-pixel";
import { getStoredUTMParams } from "@/lib/utm-tracker";
import { saveCheckoutData } from "@/lib/checkout-storage";
import CheckoutReviews from "@/components/CheckoutReviews";
import { Separator } from "@/components/ui/separator";
import { 
  OfferCountdown, 
  RecentPurchase, 
  ProgressSteps, 
  SavingsBadge, 
  TrustBar 
} from "@/components/checkout/UrgencyElements";
import { SecurityBadges } from "@/components/checkout/TrustElements";
import StickyCheckoutCTA from "@/components/checkout/StickyCheckoutCTA";
import FreeShippingBanner from "@/components/checkout/FreeShippingBanner";
import OrderBump from "@/components/checkout/OrderBump";

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
 
 const checkoutSchema = z.object({
   name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres").max(100),
   email: z.string().email("E-mail inválido").max(255),
  cpf: z.string()
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido (use: 000.000.000-00)")
    .refine((cpf) => validateCPF(cpf), "CPF inválido. Verifique os números digitados."),
   phone: z.string().regex(/^\(\d{2}\) \d{5}-\d{4}$/, "Telefone inválido (use: (00) 00000-0000)"),
   cep: z.string().regex(/^\d{5}-\d{3}$/, "CEP inválido (use: 00000-000)"),
   address: z.string().min(5, "Endereço deve ter pelo menos 5 caracteres").max(200),
   number: z.string().min(1, "Número é obrigatório"),
   complement: z.string().max(100).optional(),
   neighborhood: z.string().min(2, "Bairro é obrigatório").max(100),
   city: z.string().min(2, "Cidade é obrigatória").max(100),
   state: z.string().length(2, "Use a sigla do estado (ex: SP)"),
 });
 
 type CheckoutFormData = z.infer<typeof checkoutSchema>;
 
  // Check for preview mode and coupon via URL params
  const urlParams = new URLSearchParams(window.location.search);
  const isPreviewMode = urlParams.get('preview') === 'pix';
  const urlCoupon = urlParams.get('cupom')?.toUpperCase();
  const VALID_COUPONS: Record<string, number> = { "VOLTEI10": 0.10, "TESTE90": 0.90 };
 
 const Checkout = () => {
   const { toast } = useToast();
   const navigate = useNavigate();
   const [step, setStep] = useState<"form" | "pix" | "success">(isPreviewMode ? "pix" : "form");
   const [copied, setCopied] = useState(false);
   const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
  const [pixData, setPixData] = useState<{
    qrCode: string | null;
    qrCodeImage: string | null;
    transactionId: string | null;
  } | null>(isPreviewMode ? {
    qrCode: "00020126580014br.gov.bcb.pix0136exemplo-pix-code-para-preview-visual-only5204000053039865802BR5913Power Hair Co6008Sao Paulo62070503***6304ABCD",
    qrCodeImage: null,
    transactionId: "PREVIEW123",
  } : null);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const timerRef = useRef<number | null>(null);
   const pollingRef = useRef<number | null>(null);
   const savedFormDataRef = useRef<CheckoutFormData | null>(null);
   const [paymentStatus, setPaymentStatus] = useState<"waiting" | "checking" | "paid">("waiting");
   const [selectedShipping, setSelectedShipping] = useState<"free" | "sedex">("free");
   const [showShippingOptions, setShowShippingOptions] = useState(false);
   
   // Coupon state
    const [couponCode, setCouponCode] = useState(urlCoupon || "");
    const [appliedCoupon, setAppliedCoupon] = useState<string | null>(urlCoupon && VALID_COUPONS[urlCoupon] ? urlCoupon : null);
    const [couponError, setCouponError] = useState<string | null>(null);
    const [orderBumpSelected, setOrderBumpSelected] = useState(false);
    const orderBumpPrice = 29.90;

  const shippingOptions = {
    free: { label: "Frete Grátis", price: 0, days: "5 a 9 dias úteis" },
    sedex: { label: "Sedex", price: 9.41, days: "4 a 7 dias úteis" },
  };

   const originalPrice = 179.90;
   const productPrice = 77.91;
   const shippingPrice = shippingOptions[selectedShipping].price;
    const bumpTotal = orderBumpSelected ? orderBumpPrice : 0;
    const subtotalWithShipping = productPrice + shippingPrice + bumpTotal;
    
    // Apply coupon discount - sem desconto PIX adicional
    const couponDiscount = appliedCoupon && VALID_COUPONS[appliedCoupon] ? subtotalWithShipping * VALID_COUPONS[appliedCoupon] : 0;
    const priceAfterCoupon = subtotalWithShipping - couponDiscount;
   
   const pixDiscount = 0; // Preço PIX já é o valor final
   const finalPrice = priceAfterCoupon;
   
   // Function to apply coupon
   const applyCoupon = () => {
     setCouponError(null);
     const code = couponCode.trim().toUpperCase();
     
     if (!code) {
       setCouponError("Digite um código de cupom");
       return;
     }
     
      if (VALID_COUPONS[code]) {
        setAppliedCoupon(code);
        setCouponCode("");
      } else {
        setCouponError("Cupom inválido ou expirado");
      }
   };
   
   const removeCoupon = () => {
     setAppliedCoupon(null);
     setCouponError(null);
   };
 
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });
 
  const [cepLoading, setCepLoading] = useState(false);
  const [cepError, setCepError] = useState<string | null>(null);

  // Track InitiateCheckout once on mount with base product price (no shipping variation)
  const hasTrackedInitiateCheckout = useRef(false);
  
  // Track Lead event once when user fills name + email
  const hasTrackedLead = useRef(false);
  
  // Function to check and fire Lead event when name + email are filled
  const checkAndFireLeadEvent = () => {
    if (hasTrackedLead.current) return;
    
    const formData = getValues();
    const name = formData.name?.trim();
    const email = formData.email?.trim();
    
    // Only fire if both name and email have valid values
    if (name && name.length >= 3 && email && email.includes('@')) {
      hasTrackedLead.current = true;
      
      // Parse name for Advanced Matching
      const nameParts = name.split(/\s+/);
      const firstName = nameParts[0] || '';
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
      
      const userData = {
        email,
        firstName,
        lastName,
        phone: formData.phone,
        city: formData.city,
        state: formData.state,
        zipCode: formData.cep,
        country: 'br',
      };
      
      // Update global Advanced Matching so ALL future events include user data
      updateMetaAdvancedMatching(userData);
      
      // Fire Meta Lead event with full user data
      trackMetaLead({
        value: productPrice,
        currency: 'BRL',
        userData,
      });
      
      // Also identify user for TikTok
      identifyUser({ email, phone: formData.phone });
      
      console.log('Lead event fired', { hasEmail: true, hasName: true });
    }
  };
  
  useEffect(() => {
    if (!hasTrackedInitiateCheckout.current) {
      hasTrackedInitiateCheckout.current = true;
      // Use base product price to avoid variation from shipping options
      const basePrice = productPrice * 0.95; // Product price with PIX discount
      // TikTok InitiateCheckout
      trackInitiateCheckout({
        value: basePrice,
        currency: 'BRL',
        content_id: 'kit-sos-crescimento',
        content_name: 'Kit SOS Crescimento e Antiqueda',
      });
      // Meta InitiateCheckout
      trackMetaInitiateCheckout({
        value: basePrice,
        currency: 'BRL',
        content_ids: ['kit-sos-crescimento'],
        content_name: 'Kit SOS Crescimento e Antiqueda',
        num_items: 1,
      });
    }

    // Start timer in preview mode
    if (isPreviewMode && !timerRef.current) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
      }
    };
  }, []);

   const formatCPF = (value: string) => {
     const numbers = value.replace(/\D/g, "");
     return numbers
       .replace(/(\d{3})(\d)/, "$1.$2")
       .replace(/(\d{3})(\d)/, "$1.$2")
       .replace(/(\d{3})(\d{1,2})/, "$1-$2")
       .slice(0, 14);
   };
 
   const formatPhone = (value: string) => {
     const numbers = value.replace(/\D/g, "");
     return numbers
       .replace(/(\d{2})(\d)/, "($1) $2")
       .replace(/(\d{5})(\d)/, "$1-$2")
       .slice(0, 15);
   };
 
   const formatCEP = (value: string) => {
     const numbers = value.replace(/\D/g, "");
     return numbers.replace(/(\d{5})(\d)/, "$1-$2").slice(0, 9);
   };
 
  const cepAbortRef = useRef<AbortController | null>(null);

  const searchCEP = async (cep: string) => {
    const cleanCep = cep.replace(/\D/g, "");
    
    if (cleanCep.length !== 8) {
      return;
    }

    // Cancel previous request
    if (cepAbortRef.current) {
      cepAbortRef.current.abort();
    }
    cepAbortRef.current = new AbortController();
    
    setCepLoading(true);
    setCepError(null);
    
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`, {
        signal: cepAbortRef.current.signal,
      });
      const data = await response.json();
      
      if (data.erro) {
        setCepError("CEP não encontrado");
        return;
      }
      
      // Auto-fill address fields
      if (data.logradouro) setValue("address", data.logradouro);
      if (data.bairro) setValue("neighborhood", data.bairro);
      if (data.localidade) setValue("city", data.localidade);
      if (data.uf) setValue("state", data.uf);
      
      // Show shipping options after address is filled
      setShowShippingOptions(true);
      
      // Update Meta Advanced Matching with address data for better EMQ
      const formData = getValues();
      if (formData.email || formData.name) {
        const nameParts = (formData.name || '').trim().split(/\s+/);
        updateMetaAdvancedMatching({
          email: formData.email,
          phone: formData.phone,
          firstName: nameParts[0],
          lastName: nameParts.length > 1 ? nameParts.slice(1).join(' ') : undefined,
          city: data.localidade,
          state: data.uf,
          zipCode: cleanCep,
          country: 'br',
        });
      }
      
      // Focus on the number field after auto-fill
      setTimeout(() => {
        const numberInput = document.getElementById("number");
        if (numberInput) numberInput.focus();
      }, 100);
      
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        console.error("Error fetching CEP:", error);
        setCepError("Erro ao buscar CEP");
      }
    } finally {
      setCepLoading(false);
    }
  };

  const handleCepChange = (value: string) => {
    const formatted = formatCEP(value);
    setValue("cep", formatted);
    setCepError(null);
    
    // Auto-search when CEP is complete
    const cleanCep = formatted.replace(/\D/g, "");
    if (cleanCep.length === 8) {
      searchCEP(formatted);
    }
  };

   // Track if we've already fired the purchase event for this transaction
   const hasTrackedPurchase = useRef(false);
   
   // Start polling for payment status
   const startPaymentPolling = (transactionId: string) => {
     // Poll every 5 seconds
     pollingRef.current = window.setInterval(async () => {
       try {
         setPaymentStatus("checking");
         const { data, error } = await supabase.functions.invoke('check-pix-payment', {
           body: { transactionId },
         });
 
         if (error) {
           console.error('Error checking payment:', error);
           setPaymentStatus("waiting");
           return;
         }
 
         if (data?.isPaid) {
           setPaymentStatus("paid");
           if (pollingRef.current) {
             clearInterval(pollingRef.current);
           }
           
           // Fire client-side purchase events as fallback (deduplication via event_id)
           if (!hasTrackedPurchase.current) {
             hasTrackedPurchase.current = true;
             const purchaseValue = finalPrice;
             const eventId = `purchase_${transactionId}`;
             
             console.log('🎯 Firing client-side purchase events as fallback', { transactionId, value: purchaseValue, eventId });
             
              // Note: Meta Purchase is now tracked ONLY on ThankYou page for reliability
               // TikTok tracking removed - focusing on Meta only
               console.log('✅ Payment confirmed, redirecting to thank you page for Meta Purchase tracking');
             }
            
            // Auto redirect after 2 seconds - MUST include user data for Meta Advanced Matching
             setTimeout(() => {
                 // Use saved form data (form is unmounted when step=pix)
                 const formData = savedFormDataRef.current;
                 
                 // Parse name into first and last name for Meta Advanced Matching
                 const nameParts = formData?.name?.trim().split(/\s+/) || [];
                 const firstName = nameParts[0] || '';
                 const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
                 
                 const orderData = {
                   orderId: `PWH${transactionId.toString().slice(-8)}`,
                   amount: finalPrice,
                   transactionId: transactionId,
                   email: formData?.email,
                   phone: formData?.phone,
                   firstName,
                   lastName,
                   city: formData?.city,
                   state: formData?.state,
                   zipCode: formData?.cep,
                 };
                
                // Save to localStorage as fallback before navigating
                saveCheckoutData(orderData);
                
                navigate('/obrigado', { state: orderData });
             }, 2000);
         } else {
           setPaymentStatus("waiting");
         }
       } catch (err) {
         console.error('Polling error:', err);
         setPaymentStatus("waiting");
       }
     }, 5000);
   };
 
   const onSubmit = async (data: CheckoutFormData) => {
     setPaymentError(null);
     
     try {
       const amountInCents = Math.round(finalPrice * 100);
       
       const payload = {
         amount: amountInCents,
         customer: {
           name: data.name,
           email: data.email,
           document: data.cpf,
           phone: data.phone,
         },
          items: [
            {
              name: orderBumpSelected ? "Kit SOS Crescimento e Antiqueda + Condicionador" : "Kit SOS Crescimento e Antiqueda",
              description: orderBumpSelected ? "Shampoo + Máscara + Tônico + Condicionador" : "Shampoo + Máscara + Tônico",
              quantity: 1,
              amount: amountInCents,
            },
          ],
         shipping: {
           name: data.name,
           address: data.address,
           number: data.number,
           complement: data.complement || "",
           neighborhood: data.neighborhood,
           city: data.city,
           state: data.state,
           zipCode: data.cep,
        },
        trackingParameters: getStoredUTMParams(),
       };
       
       const { data: responseData, error } = await supabase.functions.invoke('create-pix-payment', {
         body: payload,
       });
       
       if (error) {
         throw new Error(error.message || 'Erro ao processar pagamento');
       }
       
       if (!responseData?.success) {
         throw new Error(responseData?.error || 'Erro ao criar pagamento PIX');
       }
       
       setPixData({
         qrCode: responseData.pix?.qrCode || null,
         qrCodeImage: responseData.pix?.qrCodeImage || null,
         transactionId: responseData.transactionId || null,
       });
       
        // Save form data BEFORE unmounting the form (step change destroys it)
        savedFormDataRef.current = data;
        
        setStep("pix");
        
        // Scroll to top after React renders the PIX screen
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'instant' });
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
        }, 100);
        
        // Start polling for payment status
       if (responseData.transactionId) {
         startPaymentPolling(responseData.transactionId);
       }
       
       timerRef.current = window.setInterval(() => {
         setTimeLeft((prev) => {
           if (prev <= 1) {
             if (timerRef.current) clearInterval(timerRef.current);
             return 0;
           }
           return prev - 1;
         });
       }, 1000);
       
     } catch (err) {
       console.error('Payment error:', err);
       const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
       setPaymentError(errorMessage);
       toast({
         variant: "destructive",
         title: "Erro no pagamento",
         description: errorMessage,
       });
     }
   };
 
   const copyPixCode = () => {
     if (!pixData?.qrCode) return;
     navigator.clipboard.writeText(pixData.qrCode);
     setCopied(true);
     toast({
       title: "Código copiado!",
       description: "Cole no seu aplicativo de banco para pagar.",
     });
     setTimeout(() => setCopied(false), 3000);
   };
 
  const handlePaymentConfirmed = () => {
    if (paymentStatus !== "paid") {
      toast({
        variant: "destructive",
        title: "Aguarde o pagamento",
        description: "O pagamento ainda não foi confirmado. Escaneie o QR Code ou cole o código PIX no seu banco.",
      });
      return;
    }
    
    // Pass transactionId + customer data for Meta/TikTok deduplication and advanced matching
    // Use saved form data (form is unmounted when step=pix)
    const formData = savedFormDataRef.current;
    
    // Parse name into first and last name for Meta Advanced Matching
    const nameParts = formData?.name?.trim().split(/\s+/) || [];
    const firstName = nameParts[0] || '';
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
    
    const orderData = {
      orderId: pixData?.transactionId ? `PWH${pixData.transactionId.toString().slice(-8)}` : undefined,
      amount: finalPrice,
      transactionId: pixData?.transactionId,
      email: formData?.email,
      phone: formData?.phone,
      firstName,
      lastName,
      city: formData?.city,
      state: formData?.state,
      zipCode: formData?.cep,
    };
    
    // Save to localStorage as fallback before navigating
    saveCheckoutData(orderData);
    
    navigate('/obrigado', { state: orderData });
   };
 
   const formatTime = (seconds: number) => {
     const mins = Math.floor(seconds / 60);
     const secs = seconds % 60;
     return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
   };
 
  return (
      <div className="min-h-screen bg-background">
       {/* Promo Banner */}
       <div className="bg-primary py-2.5 px-4 text-center">
         <p className="text-primary-foreground text-sm font-medium">
           Frete Grátis em todo Brasil • <span className="font-semibold bg-primary-foreground/20 px-2 py-0.5 rounded">5% OFF no PIX</span>
         </p>
       </div>
       
       {/* Header */}
       <header className="border-b border-border bg-background py-3 sticky top-0 z-40 backdrop-blur-sm bg-background/95">
         <div className="container max-w-4xl mx-auto px-4 flex items-center justify-between">
           <PowerHairLogo />
           <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
             <Lock className="w-3.5 h-3.5 text-primary" />
             <span>Checkout Seguro</span>
           </div>
         </div>
       </header>
 
       <main className="container max-w-4xl mx-auto px-4 py-6">
         {step === "form" && (
          <div className="space-y-5 animate-fade-in">
           {/* Progress Steps */}
           <ProgressSteps currentStep={1} />
           
           {/* Urgency Timer */}
           <OfferCountdown />
           
           {/* Order Summary - Collapsible */}
           <details className="bg-card border-2 border-primary/20 rounded-2xl overflow-hidden transition-all duration-300 shadow-md group" open>
             <summary className="bg-gradient-to-r from-primary/10 to-primary/5 px-4 py-3 cursor-pointer list-none flex items-center justify-between">
               <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
                 <Gift className="w-4 h-4 text-primary" />
                 Seu Pedido Especial
               </h2>
               <svg className="w-5 h-5 text-muted-foreground transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
               </svg>
             </summary>
              
             <div className="p-4 space-y-4">
               {/* Kit Items */}
               <div className="space-y-3">
                 <div className="flex items-center gap-3">
                   <div className="w-14 h-14 rounded-lg bg-secondary overflow-hidden flex-shrink-0">
                     <img
                       src="https://cdn.awsli.com.br/400x400/2814/2814407/produto/347799082/whatsapp-image-2023-09-06-at-10-41-32-eaicsvr39k-ylddlj70fy.jpeg"
                       alt="Shampoo SOS"
                       className="w-full h-full object-contain"
                     />
                   </div>
                   <div className="flex-1 min-w-0">
                     <p className="text-sm font-medium text-foreground">Shampoo SOS Crescimento</p>
                     <p className="text-xs text-muted-foreground">300ml</p>
                   </div>
                   <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                 </div>
                 
                 <div className="flex items-center gap-3">
                   <div className="w-14 h-14 rounded-lg bg-secondary overflow-hidden flex-shrink-0">
                     <img
                       src="https://cdn.awsli.com.br/400x400/2814/2814407/produto/347799082/whatsapp-image-2023-09-06-at-10-35-03--1--nhlvvncapn-216zxetspe.jpeg"
                       alt="Tônico SOS"
                       className="w-full h-full object-contain"
                     />
                   </div>
                   <div className="flex-1 min-w-0">
                     <p className="text-sm font-medium text-foreground">Tônico Fortalecedor SOS</p>
                     <p className="text-xs text-muted-foreground">100ml</p>
                   </div>
                   <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                 </div>
                 
                 <div className="flex items-center gap-3">
                   <div className="w-14 h-14 rounded-lg bg-secondary overflow-hidden flex-shrink-0">
                     <img
                       src="https://cdn.awsli.com.br/400x400/2814/2814407/produto/347799082/whatsapp-image-2023-09-06-at-10-35-03--2--ikuz221p1v-ucdpgudncg.jpeg"
                       alt="Máscara SOS"
                       className="w-full h-full object-contain"
                     />
                   </div>
                   <div className="flex-1 min-w-0">
                     <p className="text-sm font-medium text-foreground">Máscara SOS Crescimento</p>
                     <p className="text-xs text-muted-foreground">300g</p>
                   </div>
                   <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                 </div>
                 
                 {/* Brinde Extra */}
                 <div className="flex items-center gap-3 p-2 bg-primary/5 rounded-lg border border-primary/20">
                   <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0">
                     <Gift className="w-7 h-7 text-primary" />
                   </div>
                   <div className="flex-1 min-w-0">
                     <p className="text-sm font-medium text-primary">🎁 BRINDE EXCLUSIVO</p>
                     <p className="text-xs text-muted-foreground">Pente Massageador para Couro Cabeludo</p>
                   </div>
                   <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded">GRÁTIS</span>
                 </div>
               </div>
             </div>
           </details>
 
            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Personal Data */}
               <div className="bg-card border border-border rounded-lg p-5 transition-all duration-300 hover:shadow-md animate-fade-in" style={{ animationDelay: '100ms' }}>
                <h2 className="text-base font-semibold text-foreground mb-4">Dados Pessoais</h2>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-xs text-muted-foreground">Nome Completo</Label>
                    <Input
                      id="name"
                      placeholder="Seu nome completo"
                      autoComplete="name"
                      {...register("name")}
                      className={`mt-1 transition-all duration-200 focus:scale-[1.01] focus:shadow-sm ${errors.name ? "border-destructive" : ""}`}
                    />
                    {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-xs text-muted-foreground">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      autoComplete="email"
                      {...register("email")}
                      onBlur={() => checkAndFireLeadEvent()}
                      className={`mt-1 transition-all duration-200 focus:scale-[1.01] focus:shadow-sm ${errors.email ? "border-destructive" : ""}`}
                    />
                    {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="cpf" className="text-xs text-muted-foreground">CPF</Label>
                       <Input
                        id="cpf"
                        placeholder="000.000.000-00"
                        inputMode="numeric"
                        {...register("cpf")}
                        onChange={(e) => {
                          e.target.value = formatCPF(e.target.value);
                        }}
                        className={`mt-1 transition-all duration-200 focus:scale-[1.01] focus:shadow-sm ${errors.cpf ? "border-destructive" : ""}`}
                       />
                      {errors.cpf && <p className="text-xs text-destructive mt-1">{errors.cpf.message}</p>}
                     </div>
                     
                    <div>
                      <Label htmlFor="phone" className="text-xs text-muted-foreground">Telefone</Label>
                       <Input
                         id="phone"
                         placeholder="(00) 00000-0000"
                         autoComplete="tel"
                         inputMode="tel"
                         {...register("phone")}
                         onChange={(e) => {
                           e.target.value = formatPhone(e.target.value);
                         }}
                        className={`mt-1 transition-all duration-200 focus:scale-[1.01] focus:shadow-sm ${errors.phone ? "border-destructive" : ""}`}
                       />
                      {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone.message}</p>}
                     </div>
                   </div>
                 </div>
              </div>
 
              {/* Address */}
              <div className="bg-card border border-border rounded-lg p-5 transition-all duration-300 hover:shadow-md animate-fade-in" style={{ animationDelay: '200ms' }}>
                <h2 className="text-base font-semibold text-foreground mb-4">Endereço de Entrega</h2>
                
                <div className="space-y-4">
                  <div className="relative">
                    <Label htmlFor="cep" className="text-xs text-muted-foreground">CEP</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="relative">
                        <Input
                          id="cep"
                          placeholder="00000-000"
                          autoComplete="postal-code"
                          inputMode="numeric"
                          {...register("cep")}
                          onChange={(e) => handleCepChange(e.target.value)}
                          className={`max-w-[140px] pr-8 transition-all duration-200 focus:scale-[1.01] focus:shadow-sm ${errors.cep ? "border-destructive" : ""}`}
                        />
                        {cepLoading && (
                          <Loader2 className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-primary" />
                        )}
                      </div>
                      {!cepLoading && !cepError && (
                        <a 
                          href="https://buscacepinter.correios.com.br/app/endereco/index.php" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs text-primary hover:underline flex items-center gap-1"
                        >
                          <MapPin className="w-3 h-3" />
                          Não sei meu CEP
                        </a>
                      )}
                    </div>
                    {errors.cep && <p className="text-xs text-destructive mt-1">{errors.cep.message}</p>}
                    {cepError && <p className="text-xs text-destructive mt-1">{cepError}</p>}
                  </div>
                  
                  <div className="grid grid-cols-4 gap-3">
                    <div className="col-span-3">
                      <Label htmlFor="address" className="text-xs text-muted-foreground">Endereço</Label>
                      <Input
                        id="address"
                        placeholder="Rua, Avenida..."
                        autoComplete="street-address"
                        {...register("address")}
                        className={`mt-1 transition-all duration-200 focus:scale-[1.01] focus:shadow-sm ${errors.address ? "border-destructive" : ""}`}
                      />
                      {errors.address && <p className="text-xs text-destructive mt-1">{errors.address.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor="number" className="text-xs text-muted-foreground">Nº</Label>
                      <Input
                        id="number"
                        placeholder="123"
                        inputMode="numeric"
                        {...register("number")}
                        className={`mt-1 transition-all duration-200 focus:scale-[1.01] focus:shadow-sm ${errors.number ? "border-destructive" : ""}`}
                      />
                      {errors.number && <p className="text-xs text-destructive mt-1">{errors.number.message}</p>}
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="complement" className="text-xs text-muted-foreground">Complemento (opcional)</Label>
                    <Input
                      id="complement"
                      placeholder="Apto, Bloco..."
                      {...register("complement")}
                      className="mt-1"
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <Label htmlFor="neighborhood" className="text-xs text-muted-foreground">Bairro</Label>
                      <Input
                        id="neighborhood"
                        placeholder="Seu bairro"
                        autoComplete="address-level3"
                        {...register("neighborhood")}
                        className={`mt-1 ${errors.neighborhood ? "border-destructive" : ""}`}
                      />
                      {errors.neighborhood && <p className="text-xs text-destructive mt-1">{errors.neighborhood.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor="city" className="text-xs text-muted-foreground">Cidade</Label>
                      <Input
                        id="city"
                        placeholder="Sua cidade"
                        autoComplete="address-level2"
                        {...register("city")}
                        className={`mt-1 ${errors.city ? "border-destructive" : ""}`}
                      />
                      {errors.city && <p className="text-xs text-destructive mt-1">{errors.city.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor="state" className="text-xs text-muted-foreground">UF</Label>
                      <Input
                        id="state"
                        placeholder="SP"
                        maxLength={2}
                        autoComplete="address-level1"
                        {...register("state")}
                        onChange={(e) => {
                          e.target.value = e.target.value.toUpperCase();
                        }}
                        className={`mt-1 ${errors.state ? "border-destructive" : ""}`}
                      />
                      {errors.state && <p className="text-xs text-destructive mt-1">{errors.state.message}</p>}
                    </div>
                   </div>
                
                  {/* Shipping Options */}
                  {showShippingOptions && (
                    <div className="mt-4 pt-4 border-t border-border animate-fade-in">
                      <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                        <Truck className="w-4 h-4 text-primary" />
                        Opções de Entrega
                      </h3>
                      <div className="space-y-2">
                        {(Object.keys(shippingOptions) as Array<keyof typeof shippingOptions>).map((key) => {
                          const option = shippingOptions[key];
                          return (
                            <label
                              key={key}
                              className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:scale-[1.01] ${
                                selectedShipping === key
                                  ? "border-primary bg-primary/5 shadow-sm"
                                  : "border-border hover:border-primary/50 hover:shadow-sm"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <input
                                  type="radio"
                                  name="shipping"
                                  value={key}
                                  checked={selectedShipping === key}
                                  onChange={() => setSelectedShipping(key)}
                                  className="w-4 h-4 text-primary accent-primary"
                                />
                                <div>
                                  <p className="text-sm font-medium text-foreground">{option.label}</p>
                                  <p className="text-xs text-muted-foreground">{option.days}</p>
                                </div>
                              </div>
                              <span className={`text-sm font-semibold ${option.price === 0 ? "text-primary" : "text-foreground"}`}>
                                {option.price === 0 ? "Grátis" : `R$ ${option.price.toFixed(2).replace(".", ",")}`}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Bump */}
              <OrderBump 
                isSelected={orderBumpSelected} 
                onToggle={setOrderBumpSelected} 
              />

              {/* Summary and Submit */}
              <div className="bg-gradient-to-b from-card to-secondary/30 border-2 border-primary/20 rounded-2xl p-5 transition-all duration-300 shadow-lg animate-fade-in" style={{ animationDelay: '300ms' }}>
                {/* Coupon Section - Discrete collapsible */}
                {appliedCoupon ? (
                  <div className="mb-4 pb-4 border-b border-border">
                    <div className="flex items-center justify-between p-2.5 bg-primary/10 border border-primary/30 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-primary">{appliedCoupon}</span>
                        <span className="text-xs text-muted-foreground">(-{Math.round((VALID_COUPONS[appliedCoupon] || 0) * 100)}%)</span>
                      </div>
                      <button
                        type="button"
                        onClick={removeCoupon}
                        className="text-xs text-muted-foreground hover:text-destructive hover:underline"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                ) : (
                  <details className="mb-4 pb-4 border-b border-border group">
                    <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors list-none flex items-center gap-1">
                      <span className="underline">Tem um cupom?</span>
                    </summary>
                    <div className="mt-3 space-y-2 animate-fade-in">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Digite seu cupom"
                          value={couponCode}
                          onChange={(e) => {
                            setCouponCode(e.target.value.toUpperCase());
                            setCouponError(null);
                          }}
                          className="flex-1 text-sm uppercase h-9"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={applyCoupon}
                          className="px-3"
                        >
                          Aplicar
                        </Button>
                      </div>
                      {couponError && (
                        <p className="text-xs text-destructive flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {couponError}
                        </p>
                      )}
                    </div>
                  </details>
                )}
                
                {/* Savings badge - minimalist */}
                <div className="flex items-center justify-center gap-2 mb-4 text-sm">
                  <span className="text-primary font-semibold">Você economiza R$ {(originalPrice - finalPrice).toFixed(2).replace(".", ",")}</span>
                  <span className="px-2 py-0.5 text-xs font-bold text-primary-foreground bg-primary rounded-full">
                    {Math.round(((originalPrice - finalPrice) / originalPrice) * 100)}% OFF
                  </span>
                </div>
                
                {/* Price breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm py-1">
                    <span className="text-muted-foreground">Preço original</span>
                    <span className="text-muted-foreground line-through">R$ {originalPrice.toFixed(2).replace(".", ",")}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm py-1">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-muted-foreground">R$ {productPrice.toFixed(2).replace(".", ",")}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm py-1">
                    <span className="text-muted-foreground">Frete ({shippingOptions[selectedShipping].label})</span>
                    <span className={shippingPrice === 0 ? "text-primary font-medium" : "text-muted-foreground"}>
                      {shippingPrice === 0 ? "Grátis" : `R$ ${shippingPrice.toFixed(2).replace(".", ",")}`}
                    </span>
                  </div>
                  {orderBumpSelected && (
                    <div className="flex items-center justify-between text-sm py-1">
                      <span className="text-foreground font-medium flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-primary" />
                        Condicionador SOS
                      </span>
                      <span className="text-foreground font-medium">R$ {orderBumpPrice.toFixed(2).replace(".", ",")}</span>
                    </div>
                  )}
                  {appliedCoupon && (
                    <div className="flex items-center justify-between text-sm py-1">
                      <span className="text-primary font-medium flex items-center gap-1.5">
                        <Gift className="w-4 h-4" />
                        Cupom {appliedCoupon} ({Math.round((VALID_COUPONS[appliedCoupon] || 0) * 100)}%)
                      </span>
                      <span className="text-primary font-semibold">- R$ {couponDiscount.toFixed(2).replace(".", ",")}</span>
                    </div>
                  )}
                </div>
                
                {/* Total */}
                <div className="flex items-center justify-between py-4 mb-6 border-y-2 border-dashed border-primary/30">
                  <span className="text-lg font-semibold text-foreground">Total</span>
                  <div className="text-right">
                    <span className="text-3xl font-bold text-primary">R$ {finalPrice.toFixed(2).replace(".", ",")}</span>
                    <p className="text-xs text-muted-foreground mt-0.5">à vista no PIX</p>
                  </div>
                </div>
                
                {/* Submit button */}
                <Button 
                  type="submit" 
                  className="w-full h-14 text-lg font-bold transition-all duration-200 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] bg-gradient-to-r from-primary to-primary/90 shadow-lg shadow-primary/30 relative overflow-hidden group" 
                  disabled={isSubmitting}
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Gerando PIX...
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5 mr-2" />
                      FINALIZAR COMPRA
                    </>
                  )}
                </Button>
                
                {/* Security badges */}
                <div className="mt-6">
                  <SecurityBadges />
                </div>
                
                {paymentError && (
                  <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg mt-4">
                    <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0" />
                    <p className="text-sm text-destructive">{paymentError}</p>
                  </div>
                )}
              </div>

              {/* Reviews Section */}
              <div className="bg-card border border-border rounded-2xl p-5 transition-all duration-300 hover:shadow-md animate-fade-in" style={{ animationDelay: '400ms' }}>
                <CheckoutReviews />
              </div>
              
           </form>
          </div>
        )}

        {/* Recent Purchase Notification */}
        <RecentPurchase />

        {step === "pix" && (
           <div className="max-w-lg mx-auto animate-fade-in">
             {/* Progress Steps */}
             <ProgressSteps currentStep={2} />
             
              {/* Success Header */}
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-foreground animate-fade-in">Quase lá! 🎉</h1>
                <p className="text-muted-foreground mt-2 animate-fade-in" style={{ animationDelay: '100ms' }}>Escaneie o QR Code ou copie o código para finalizar</p>
              </div>
 
             {/* Main Card */}
             <div className="bg-card border-2 border-primary/20 rounded-2xl overflow-hidden shadow-xl animate-fade-in transition-all duration-300" style={{ animationDelay: '350ms' }}>
                {/* Timer Banner - Elegant Design */}
                <div className="px-6 py-5 bg-gradient-to-br from-muted/50 to-muted/30 border-b border-border">
                  <div className="flex flex-col items-center gap-4">
                    {/* Timer Display */}
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        timeLeft <= 300 
                          ? 'bg-destructive/10 text-destructive' 
                          : 'bg-primary/10 text-primary'
                      }`}>
                        <Clock className={`w-5 h-5 ${timeLeft <= 300 ? 'animate-pulse' : ''}`} />
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                          Tempo restante
                        </p>
                        <div className="flex items-baseline gap-1 mt-0.5">
                          <span className={`text-3xl font-bold tracking-tight tabular-nums ${
                            timeLeft <= 300 ? 'text-destructive' : 'text-foreground'
                          }`}>
                            {formatTime(timeLeft)}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full max-w-xs">
                      <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ease-linear ${
                            timeLeft <= 300 
                              ? 'bg-destructive' 
                              : 'bg-primary'
                          }`}
                          style={{ width: `${(timeLeft / 1800) * 100}%` }}
                        />
                      </div>
                    </div>
                    
                    {/* Urgency Message */}
                    {timeLeft <= 300 && (
                      <p className="text-xs text-destructive font-medium animate-fade-in flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5" />
                        Finalize antes que expire!
                      </p>
                    )}
                  </div>
                </div>
 
               {/* QR Code Section */}
               <div className="p-6 text-center">
                 <div className="bg-white p-4 rounded-xl inline-block shadow-sm border border-border">
                   {pixData?.qrCode ? (
                     <QRCodeSVG 
                       value={pixData.qrCode} 
                       size={200}
                       level="M"
                       includeMargin={false}
                       className="rounded"
                     />
                   ) : (
                     <div className="w-[200px] h-[200px] flex items-center justify-center">
                       <Loader2 className="w-10 h-10 animate-spin text-primary" />
                     </div>
                   )}
                 </div>
                 
                 {/* Amount */}
                 <div className="mt-6">
                   <p className="text-sm text-muted-foreground">Valor total</p>
                   <p className="text-4xl font-bold text-foreground mt-1">
                     R$ {finalPrice.toFixed(2).replace(".", ",")}
                   </p>
                   <div className="flex items-center justify-center gap-2 mt-2">
                     <Gift className="w-4 h-4 text-primary" />
                     <span className="text-sm text-primary font-medium">
                       Você economizou R$ {(originalPrice - finalPrice).toFixed(2).replace(".", ",")}!
                     </span>
                   </div>
                 </div>
               </div>
 
                {/* Copy Code Section */}
                <div className="px-6 pb-6">
                  <p className="text-sm font-medium text-foreground mb-2 text-center">Ou copie o código PIX:</p>
                  <div className={`bg-secondary rounded-xl p-3 flex items-center gap-3 transition-all duration-300 ${copied ? "ring-2 ring-primary/50 bg-primary/5" : ""}`}>
                    <code className="flex-1 text-xs text-muted-foreground truncate font-mono">
                      {pixData?.qrCode || "Carregando..."}
                    </code>
                    <Button 
                       variant={copied ? "default" : "secondary"} 
                       size="default" 
                       onClick={copyPixCode} 
                       disabled={!pixData?.qrCode}
                       className={`transition-all duration-300 font-semibold min-w-[120px] ${
                         copied 
                           ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 scale-105" 
                           : "hover:bg-primary hover:text-primary-foreground hover:scale-105 active:scale-95"
                       }`}
                     >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 mr-2 animate-scale-in" />
                          Copiado!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                          Copiar Código
                        </>
                      )}
                    </Button>
                  </div>
                  {copied && (
                    <p className="text-sm text-primary font-medium text-center mt-3 animate-fade-in flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      Agora cole o código no app do seu banco!
                    </p>
                  )}
                </div>

               {/* Instructions */}
               <div className="bg-secondary/50 px-6 py-4 border-t border-border">
                 <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                   <CheckCircle2 className="w-4 h-4 text-primary" />
                   Como pagar:
                 </p>
                 <div className="grid gap-2">
                   <div className="flex items-start gap-3">
                     <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">1</span>
                     <span className="text-sm text-muted-foreground">Abra o app do seu banco</span>
                   </div>
                   <div className="flex items-start gap-3">
                     <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">2</span>
                     <span className="text-sm text-muted-foreground">Escolha pagar com PIX</span>
                   </div>
                   <div className="flex items-start gap-3">
                     <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">3</span>
                     <span className="text-sm text-muted-foreground">Escaneie o QR Code ou cole o código</span>
                   </div>
                   <div className="flex items-start gap-3">
                     <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">4</span>
                     <span className="text-sm text-muted-foreground">Confirme e pronto! ✨</span>
                   </div>
                 </div>
               </div>
             </div>

             {/* Confirm Payment Button */}
             <div className="mt-6 space-y-3">
              <Button 
                 onClick={handlePaymentConfirmed} 
                 className={`w-full h-12 text-base font-semibold transition-all duration-300 ${paymentStatus === "paid" ? "animate-pulse hover:scale-[1.02]" : ""}`}
                 disabled={paymentStatus === "checking"}
                 variant={paymentStatus === "paid" ? "default" : "outline"}
               >
                {paymentStatus === "checking" && (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Verificando pagamento...
                  </>
                )}
                {paymentStatus === "waiting" && (
                  <>
                    <Clock className="w-4 h-4 mr-2" />
                    Aguardando pagamento...
                  </>
                )}
                {paymentStatus === "paid" && (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Pagamento Confirmado! Clique para continuar
                  </>
                )}
               </Button>
              {paymentStatus === "paid" && (
                 <div className="bg-primary/10 rounded-lg p-3 text-center animate-fade-in">
                   <p className="text-sm text-primary font-medium animate-pulse">
                     🎉 Pagamento detectado! Redirecionando...
                   </p>
                 </div>
               )}
              {paymentStatus === "waiting" && (
                <p className="text-xs text-center text-muted-foreground">
                  O status será atualizado automaticamente após o pagamento.
                </p>
              )}
             </div>

             {/* Trust Badges */}
             <div className="mt-6 flex items-center justify-center gap-4 text-xs text-muted-foreground">
               <div className="flex items-center gap-1">
                 <Shield className="w-4 h-4" />
                 <span>Pagamento Seguro</span>
               </div>
               <span>•</span>
               <div className="flex items-center gap-1">
                 <Lock className="w-4 h-4" />
                 <span>Dados Criptografados</span>
               </div>
             </div>
           </div>
         )}
 
       </main>
 
        {/* Footer */}
        <footer className="bg-primary text-primary-foreground mt-12">
          <div className="py-8">
            <div className="container max-w-4xl mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Logo and Social */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="relative w-8 h-8">
                      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
                        <path
                          d="M24 4C24 4 8 12 8 28C8 36 14 44 24 44C34 44 40 36 40 28C40 12 24 4 24 4Z"
                          className="fill-primary-foreground"
                        />
                        <path
                          d="M18 20C18 20 20 28 24 32M24 16C24 16 24 26 24 34M30 20C30 20 28 28 24 32"
                          className="stroke-primary"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <circle cx="16" cy="18" r="2" className="fill-primary/40" />
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-base font-bold tracking-tight leading-none">POWER</span>
                      <span className="text-sm font-light tracking-widest text-primary-foreground/80 leading-none">HAIR</span>
                    </div>
                  </div>
                  <p className="text-sm text-primary-foreground/80 mb-4">
                    Cabelos fortes, saudáveis e bonitos.
                  </p>
                  <div className="flex gap-3">
                    <a href="#" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
                      <Facebook className="w-4 h-4" />
                    </a>
                    <a href="#" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
                      <Instagram className="w-4 h-4" />
                    </a>
                    <a href="#" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
                      <Youtube className="w-4 h-4" />
                    </a>
                    <a href="#" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
                      <Twitter className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Links */}
                <div>
                  <h4 className="font-semibold mb-4">Links</h4>
                  <ul className="space-y-2">
                    <li>
                      <Link to="/termos-de-uso" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                        Termos de Uso
                      </Link>
                    </li>
                    <li>
                      <Link to="/politica-de-privacidade" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                        Política de Privacidade
                      </Link>
                    </li>
                    <li>
                      <Link to="/trocas-e-devolucoes" className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                        Trocas e Devoluções
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Contact */}
                <div>
                  <h4 className="font-semibold mb-4">Contato</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-sm text-primary-foreground/80">
                      <Phone className="w-4 h-4" />
                      0800 123 4567
                    </li>
                    <li className="flex items-center gap-2 text-sm text-primary-foreground/80">
                      <Mail className="w-4 h-4" />
                      contato@powerhair.com.br
                    </li>
                  </ul>
                </div>
              </div>

              <Separator className="my-6 bg-primary-foreground/20" />

              {/* Security Badges */}
              <div className="space-y-4">
                <p className="text-sm font-medium text-primary-foreground text-center">Compra 100% Segura</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="flex flex-col items-center gap-2 p-3 bg-primary-foreground/5 rounded-lg">
                    <Shield className="w-6 h-6 text-primary-foreground" />
                    <span className="text-xs text-primary-foreground/80 text-center">Site Seguro</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 p-3 bg-primary-foreground/5 rounded-lg">
                    <Lock className="w-6 h-6 text-primary-foreground" />
                    <span className="text-xs text-primary-foreground/80 text-center">SSL 256-bit</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 p-3 bg-primary-foreground/5 rounded-lg">
                    <CheckCircle2 className="w-6 h-6 text-primary-foreground" />
                    <span className="text-xs text-primary-foreground/80 text-center">Compra Verificada</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 p-3 bg-primary-foreground/5 rounded-lg">
                    <Truck className="w-6 h-6 text-primary-foreground" />
                    <span className="text-xs text-primary-foreground/80 text-center">Entrega Garantida</span>
                  </div>
                </div>
                
                {/* Payment Methods */}
                <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                  {["Visa", "Mastercard", "Elo", "Amex", "PIX", "Boleto"].map((method) => (
                    <span key={method} className="px-3 py-1.5 bg-primary-foreground/10 rounded text-xs font-medium">
                      {method}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="bg-primary/80 py-4">
            <div className="container max-w-4xl mx-auto px-4">
              <p className="text-center text-sm text-primary-foreground/60">
                © 2026 Power Hair. Todos os direitos reservados. CNPJ: 15.190.451/0001-06
              </p>
            </div>
          </div>
        </footer>
      </div>
    );
  };
  
  export default Checkout;