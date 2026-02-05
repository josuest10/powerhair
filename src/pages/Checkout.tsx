 import { useState } from "react";
 import { z } from "zod";
 import { useForm } from "react-hook-form";
 import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Copy, Check, Clock, Shield, QrCode, Truck } from "lucide-react";
 import { Link } from "react-router-dom";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { Label } from "@/components/ui/label";
 import { Separator } from "@/components/ui/separator";
 import { useToast } from "@/hooks/use-toast";
 
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
   cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido (use: 000.000.000-00)"),
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
 
 const Checkout = () => {
   const { toast } = useToast();
   const [step, setStep] = useState<"form" | "pix" | "success">("form");
   const [copied, setCopied] = useState(false);
   const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
 
   const productPrice = 97.0;
   const pixDiscount = productPrice * 0.05;
   const finalPrice = productPrice - pixDiscount;
 
   const pixCode = "00020126580014br.gov.bcb.pix0136a1b2c3d4-e5f6-7890-abcd-ef1234567890520400005303986540592.155802BR5925POWER HAIR COMERCIO LTDA6009SAO PAULO62140510PWRHAIR2026630445B2";
 
   const {
     register,
     handleSubmit,
     formState: { errors, isSubmitting },
   } = useForm<CheckoutFormData>({
     resolver: zodResolver(checkoutSchema),
   });
 
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
 
   const onSubmit = async (data: CheckoutFormData) => {
     // Simulate API call
     await new Promise((resolve) => setTimeout(resolve, 1000));
     console.log("Order data:", data);
     setStep("pix");
     
     // Start countdown
     const timer = setInterval(() => {
       setTimeLeft((prev) => {
         if (prev <= 1) {
           clearInterval(timer);
           return 0;
         }
         return prev - 1;
       });
     }, 1000);
   };
 
   const copyPixCode = () => {
     navigator.clipboard.writeText(pixCode);
     setCopied(true);
     toast({
       title: "Código copiado!",
       description: "Cole no seu aplicativo de banco para pagar.",
     });
     setTimeout(() => setCopied(false), 3000);
   };
 
   const simulatePayment = () => {
     setStep("success");
   };
 
   const formatTime = (seconds: number) => {
     const mins = Math.floor(seconds / 60);
     const secs = seconds % 60;
     return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
   };
 
   return (
     <div className="min-h-screen bg-background">
       {/* Header */}
       <header className="border-b border-border bg-background py-4">
         <div className="container max-w-4xl mx-auto px-4 flex items-center justify-between">
           <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
             <ArrowLeft className="w-4 h-4" />
             <span className="text-sm">Voltar</span>
           </Link>
           <PowerHairLogo />
           <div className="flex items-center gap-1 text-xs text-muted-foreground">
             <Shield className="w-4 h-4" />
             <span>Compra Segura</span>
           </div>
         </div>
       </header>
 
       <main className="container max-w-4xl mx-auto px-4 py-8">
         {step === "form" && (
          <div className="space-y-6">
            {/* Order Summary - Top */}
            <div className="bg-secondary rounded-lg p-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-lg bg-background overflow-hidden flex-shrink-0">
                  <img
                    src="https://cdn.awsli.com.br/400x400/2814/2814407/produto/347799082/whatsapp-image-2023-09-06-at-10-41-32-eaicsvr39k-ylddlj70fy.jpeg"
                    alt="Kit SOS Crescimento"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">Kit SOS Crescimento e Antiqueda</p>
                  <p className="text-xs text-muted-foreground">Shampoo + Máscara + Tônico</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs text-muted-foreground line-through">R$ {productPrice.toFixed(2).replace(".", ",")}</p>
                  <p className="text-lg font-bold text-foreground">R$ {finalPrice.toFixed(2).replace(".", ",")}</p>
                  <p className="text-xs text-primary font-medium">5% OFF no PIX</p>
                </div>
              </div>
            </div>
 
            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Personal Data */}
              <div className="bg-card border border-border rounded-lg p-5">
                <h2 className="text-base font-semibold text-foreground mb-4">Dados Pessoais</h2>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-xs text-muted-foreground">Nome Completo</Label>
                    <Input
                      id="name"
                      placeholder="Seu nome completo"
                      {...register("name")}
                      className={`mt-1 ${errors.name ? "border-destructive" : ""}`}
                    />
                    {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-xs text-muted-foreground">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      {...register("email")}
                      className={`mt-1 ${errors.email ? "border-destructive" : ""}`}
                    />
                    {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="cpf" className="text-xs text-muted-foreground">CPF</Label>
                       <Input
                        id="cpf"
                        placeholder="000.000.000-00"
                        {...register("cpf")}
                        onChange={(e) => {
                          e.target.value = formatCPF(e.target.value);
                        }}
                        className={`mt-1 ${errors.cpf ? "border-destructive" : ""}`}
                       />
                      {errors.cpf && <p className="text-xs text-destructive mt-1">{errors.cpf.message}</p>}
                     </div>
                     
                    <div>
                      <Label htmlFor="phone" className="text-xs text-muted-foreground">Telefone</Label>
                       <Input
                         id="phone"
                         placeholder="(00) 00000-0000"
                         {...register("phone")}
                         onChange={(e) => {
                           e.target.value = formatPhone(e.target.value);
                         }}
                        className={`mt-1 ${errors.phone ? "border-destructive" : ""}`}
                       />
                      {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone.message}</p>}
                     </div>
                   </div>
                 </div>
              </div>
 
              {/* Address */}
              <div className="bg-card border border-border rounded-lg p-5">
                <h2 className="text-base font-semibold text-foreground mb-4">Endereço de Entrega</h2>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cep" className="text-xs text-muted-foreground">CEP</Label>
                    <Input
                      id="cep"
                      placeholder="00000-000"
                      {...register("cep")}
                      onChange={(e) => {
                        e.target.value = formatCEP(e.target.value);
                      }}
                      className={`mt-1 max-w-[140px] ${errors.cep ? "border-destructive" : ""}`}
                    />
                    {errors.cep && <p className="text-xs text-destructive mt-1">{errors.cep.message}</p>}
                  </div>
                  
                  <div className="grid grid-cols-4 gap-3">
                    <div className="col-span-3">
                      <Label htmlFor="address" className="text-xs text-muted-foreground">Endereço</Label>
                      <Input
                        id="address"
                        placeholder="Rua, Avenida..."
                        {...register("address")}
                        className={`mt-1 ${errors.address ? "border-destructive" : ""}`}
                      />
                      {errors.address && <p className="text-xs text-destructive mt-1">{errors.address.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor="number" className="text-xs text-muted-foreground">Nº</Label>
                      <Input
                        id="number"
                        placeholder="123"
                        {...register("number")}
                        className={`mt-1 ${errors.number ? "border-destructive" : ""}`}
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
                        {...register("state")}
                        onChange={(e) => {
                          e.target.value = e.target.value.toUpperCase();
                        }}
                        className={`mt-1 ${errors.state ? "border-destructive" : ""}`}
                      />
                      {errors.state && <p className="text-xs text-destructive mt-1">{errors.state.message}</p>}
                    </div>
                   </div>
                 </div>
              </div>
 
              {/* Summary and Submit */}
              <div className="bg-card border border-border rounded-lg p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>Subtotal: R$ {productPrice.toFixed(2).replace(".", ",")}</span>
                      <span className="text-primary">(-5% PIX)</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Truck className="w-4 h-4 text-primary" />
                      <span className="text-primary font-medium">Frete Grátis</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Total</p>
                    <p className="text-2xl font-bold text-foreground">R$ {finalPrice.toFixed(2).replace(".", ",")}</p>
                   </div>
                 </div>
                
                <Button type="submit" className="w-full h-12 text-base font-semibold" disabled={isSubmitting}>
                  {isSubmitting ? "Processando..." : "Pagar com PIX"}
                </Button>
               </div>
            </form>
           </div>
         )}
 
         {step === "pix" && (
           <div className="max-w-md mx-auto text-center space-y-6">
             <div>
               <h1 className="text-2xl font-bold text-foreground">Pagamento PIX</h1>
               <p className="text-sm text-muted-foreground mt-1">Escaneie o QR Code ou copie o código</p>
             </div>
 
             {/* Timer */}
             <div className="flex items-center justify-center gap-2 text-muted-foreground">
               <Clock className="w-4 h-4" />
               <span className="text-sm">Expira em: <span className="font-mono font-semibold text-foreground">{formatTime(timeLeft)}</span></span>
             </div>
 
             {/* QR Code */}
             <div className="bg-white p-6 rounded-lg inline-block mx-auto">
               <div className="w-48 h-48 bg-secondary flex items-center justify-center rounded">
                 <QrCode className="w-32 h-32 text-foreground" />
               </div>
             </div>
 
             {/* Amount */}
             <div className="bg-secondary rounded-lg p-4">
               <p className="text-sm text-muted-foreground">Valor a pagar</p>
               <p className="text-3xl font-bold text-foreground">R$ {finalPrice.toFixed(2).replace(".", ",")}</p>
             </div>
 
             {/* PIX Code */}
             <div className="space-y-3">
               <p className="text-sm text-muted-foreground">Ou copie o código PIX:</p>
               <div className="bg-secondary rounded-lg p-3 flex items-center gap-2">
                 <code className="flex-1 text-xs text-muted-foreground truncate">{pixCode}</code>
                 <Button variant="outline" size="sm" onClick={copyPixCode}>
                   {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                 </Button>
               </div>
             </div>
 
             {/* Instructions */}
             <div className="text-left bg-secondary rounded-lg p-4 space-y-2">
               <p className="text-sm font-medium text-foreground">Como pagar:</p>
               <ol className="text-xs text-muted-foreground space-y-1 list-decimal pl-4">
                 <li>Abra o app do seu banco</li>
                 <li>Escolha pagar com PIX usando QR Code ou código</li>
                 <li>Escaneie o QR Code ou cole o código copiado</li>
                 <li>Confirme o pagamento</li>
               </ol>
             </div>
 
             {/* Simulate Payment Button (for demo) */}
             <Button onClick={simulatePayment} className="w-full">
               Simular Pagamento Confirmado
             </Button>
 
             <p className="text-xs text-muted-foreground">
               Após o pagamento, você receberá a confirmação por e-mail.
             </p>
           </div>
         )}
 
         {step === "success" && (
           <div className="max-w-md mx-auto text-center space-y-6">
             <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
               <Check className="w-10 h-10 text-primary" />
             </div>
 
             <div>
               <h1 className="text-2xl font-bold text-foreground">Pagamento Confirmado!</h1>
               <p className="text-sm text-muted-foreground mt-1">Seu pedido foi recebido com sucesso</p>
             </div>
 
             <div className="bg-secondary rounded-lg p-5 text-left space-y-3">
               <div className="flex justify-between">
                 <span className="text-sm text-muted-foreground">Número do pedido</span>
                 <span className="text-sm font-medium text-foreground">#PWH{Date.now().toString().slice(-8)}</span>
               </div>
               <div className="flex justify-between">
                 <span className="text-sm text-muted-foreground">Valor pago</span>
                 <span className="text-sm font-medium text-foreground">R$ {finalPrice.toFixed(2).replace(".", ",")}</span>
               </div>
               <div className="flex justify-between">
                 <span className="text-sm text-muted-foreground">Forma de pagamento</span>
                 <span className="text-sm font-medium text-foreground">PIX</span>
               </div>
               <div className="flex justify-between">
                 <span className="text-sm text-muted-foreground">Previsão de entrega</span>
                 <span className="text-sm font-medium text-foreground">5-10 dias úteis</span>
               </div>
             </div>
 
             <div className="bg-primary/10 rounded-lg p-4">
               <p className="text-sm text-primary">
                 📧 Enviamos os detalhes do pedido para o seu e-mail.
               </p>
             </div>
 
             <Link to="/">
               <Button variant="outline" className="w-full">
                 Voltar para a loja
               </Button>
             </Link>
           </div>
         )}
       </main>
 
       {/* Footer */}
       <footer className="border-t border-border py-6 mt-12">
         <div className="container max-w-4xl mx-auto px-4">
           <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
             <div className="flex items-center gap-4">
               <Shield className="w-4 h-4" />
               <span>Ambiente seguro</span>
               <span>•</span>
               <span>Dados criptografados</span>
             </div>
             <div className="flex items-center gap-4">
               <Link to="/termos-de-uso" className="hover:text-foreground transition-colors">Termos de Uso</Link>
               <Link to="/politica-de-privacidade" className="hover:text-foreground transition-colors">Privacidade</Link>
             </div>
           </div>
         </div>
       </footer>
     </div>
   );
 };
 
 export default Checkout;