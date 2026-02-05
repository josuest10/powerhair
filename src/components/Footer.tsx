 import { Facebook, Instagram, Youtube, Twitter, Mail, Phone, MapPin } from "lucide-react";
 import { Separator } from "@/components/ui/separator";
 
 const Footer = () => {
   const institutionalLinks = [
     { label: "Sobre a Eudora", href: "#" },
     { label: "Trabalhe Conosco", href: "#" },
     { label: "Política de Privacidade", href: "#" },
     { label: "Termos de Uso", href: "#" },
     { label: "Responsabilidade Social", href: "#" },
   ];
 
   const helpLinks = [
     { label: "Central de Ajuda", href: "#" },
     { label: "Trocas e Devoluções", href: "#" },
     { label: "Formas de Pagamento", href: "#" },
     { label: "Prazo de Entrega", href: "#" },
     { label: "Fale Conosco", href: "#" },
   ];
 
   const categoryLinks = [
     { label: "Perfumaria", href: "#" },
     { label: "Maquiagem", href: "#" },
     { label: "Cabelos", href: "#" },
     { label: "Corpo e Banho", href: "#" },
     { label: "Kits e Presentes", href: "#" },
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
               <button className="px-6 py-2 bg-accent text-accent-foreground rounded-md font-medium hover:bg-accent/90 transition-colors">
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
               <h2 className="text-2xl font-serif tracking-widest mb-4">EUDORA</h2>
               <p className="text-sm text-primary-foreground/80 mb-4">
                 Beleza que transforma, produtos que inspiram.
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
               <h4 className="font-semibold mb-4">Categorias</h4>
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
                   contato@eudora.com.br
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
             © 2024 Eudora. Todos os direitos reservados. CNPJ: 00.000.000/0001-00
           </p>
         </div>
       </div>
     </footer>
   );
 };
 
 export default Footer;