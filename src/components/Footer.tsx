 import { Facebook, Instagram, Youtube, Twitter, Mail, Phone, MapPin } from "lucide-react";
 import { Separator } from "@/components/ui/separator";
 
const PowerHairLogo = () => (
  <div className="flex items-center gap-2">
    <div className="relative w-10 h-10">
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
      <span className="text-lg font-bold tracking-tight text-primary-foreground leading-none">
        POWER
      </span>
      <span className="text-base font-light tracking-widest text-primary-foreground/80 leading-none">
        HAIR
      </span>
    </div>
  </div>
);

 const Footer = () => {
   const institutionalLinks = [
    { label: "Sobre a Power Hair", href: "#" },
     { label: "Trabalhe Conosco", href: "#" },
    { label: "Política de Privacidade", href: "/politica-de-privacidade" },
    { label: "Termos de Uso", href: "/termos-de-uso" },
    { label: "Sustentabilidade", href: "#" },
   ];
 
   const helpLinks = [
     { label: "Central de Ajuda", href: "#" },
    { label: "Trocas e Devoluções", href: "/trocas-e-devolucoes" },
     { label: "Formas de Pagamento", href: "#" },
     { label: "Prazo de Entrega", href: "#" },
     { label: "Fale Conosco", href: "#" },
   ];
 
   const categoryLinks = [
    { label: "Antiqueda", href: "#" },
    { label: "Crescimento", href: "#" },
    { label: "Hidratação", href: "#" },
    { label: "Fortalecimento", href: "#" },
    { label: "Kits Completos", href: "#" },
   ];
 
   return (
     <footer className="bg-primary text-primary-foreground">
       {/* Newsletter Section */}
       <div className="bg-secondary py-8">
         <div className="container max-w-7xl mx-auto px-4 md:px-6">
           <div className="flex flex-col md:flex-row items-center justify-between gap-4">
             <div>
               <h3 className="text-lg font-semibold text-foreground">Receba nossas novidades</h3>
               <p className="text-sm text-muted-foreground">Cadastre-se e fique por dentro das promoções exclusivas</p>
             </div>
             <div className="flex w-full md:w-auto gap-2">
               <input
                 type="email"
                 placeholder="Digite seu e-mail"
                 className="flex-1 md:w-80 px-4 py-2 rounded-md border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
               />
              <button className="px-6 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors">
                 Cadastrar
               </button>
             </div>
           </div>
         </div>
       </div>
 
       {/* Main Footer */}
       <div className="py-12">
         <div className="container max-w-7xl mx-auto px-4 md:px-6">
           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
             {/* Logo and Social */}
             <div className="col-span-2 md:col-span-4 lg:col-span-1">
              <div className="mb-4">
                <PowerHairLogo />
              </div>
               <p className="text-sm text-primary-foreground/80 mb-4">
                Cabelos fortes, saudáveis e bonitos.
               </p>
               <div className="flex gap-3">
                 <a href="#" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
                   <Facebook className="w-5 h-5" />
                 </a>
                 <a href="#" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
                   <Instagram className="w-5 h-5" />
                 </a>
                 <a href="#" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
                   <Youtube className="w-5 h-5" />
                 </a>
                 <a href="#" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
                   <Twitter className="w-5 h-5" />
                 </a>
               </div>
             </div>
 
             {/* Institutional */}
             <div>
               <h4 className="font-semibold mb-4">Institucional</h4>
               <ul className="space-y-2">
                 {institutionalLinks.map((link) => (
                   <li key={link.label}>
                     <a href={link.href} className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                       {link.label}
                     </a>
                   </li>
                 ))}
               </ul>
             </div>
 
             {/* Help */}
             <div>
               <h4 className="font-semibold mb-4">Ajuda</h4>
               <ul className="space-y-2">
                 {helpLinks.map((link) => (
                   <li key={link.label}>
                     <a href={link.href} className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                       {link.label}
                     </a>
                   </li>
                 ))}
               </ul>
             </div>
 
             {/* Categories */}
             <div>
              <h4 className="font-semibold mb-4">Tratamentos</h4>
               <ul className="space-y-2">
                 {categoryLinks.map((link) => (
                   <li key={link.label}>
                     <a href={link.href} className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                       {link.label}
                     </a>
                   </li>
                 ))}
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
                 <li className="flex items-start gap-2 text-sm text-primary-foreground/80">
                   <MapPin className="w-4 h-4 mt-0.5" />
                   São Paulo, SP - Brasil
                 </li>
               </ul>
             </div>
           </div>
 
           <Separator className="my-8 bg-primary-foreground/20" />
 
           {/* Payment and Security */}
           <div className="flex flex-col md:flex-row items-center justify-between gap-6">
             <div>
               <p className="text-sm text-primary-foreground/60 mb-2">Formas de Pagamento</p>
               <div className="flex gap-2">
                 {["Visa", "Master", "Elo", "Amex", "Pix", "Boleto"].map((method) => (
                   <span key={method} className="px-2 py-1 bg-primary-foreground/10 rounded text-xs">
                     {method}
                   </span>
                 ))}
               </div>
             </div>
             <div>
               <p className="text-sm text-primary-foreground/60 mb-2">Segurança</p>
               <div className="flex gap-2">
                 {["SSL", "PCI DSS", "Norton"].map((seal) => (
                   <span key={seal} className="px-2 py-1 bg-primary-foreground/10 rounded text-xs">
                     {seal}
                   </span>
                 ))}
               </div>
             </div>
           </div>
         </div>
       </div>
 
       {/* Copyright */}
       <div className="bg-primary/80 py-4">
         <div className="container max-w-7xl mx-auto px-4 md:px-6">
           <p className="text-center text-sm text-primary-foreground/60">
            © 2026 Power Hair. Todos os direitos reservados. CNPJ: 00.000.000/0001-00
           </p>
         </div>
       </div>
     </footer>
   );
 };
 
 export default Footer;