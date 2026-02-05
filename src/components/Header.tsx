import { Search, MapPin, User, ShoppingBag, Heart, HelpCircle, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PowerHairLogo = () => (
  <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
    <div className="relative w-10 h-10 md:w-12 md:h-12">
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        {/* Leaf shape */}
        <path
          d="M24 4C24 4 8 12 8 28C8 36 14 44 24 44C34 44 40 36 40 28C40 12 24 4 24 4Z"
          className="fill-primary"
        />
        {/* Hair strands */}
        <path
          d="M18 20C18 20 20 28 24 32M24 16C24 16 24 26 24 34M30 20C30 20 28 28 24 32"
          className="stroke-primary-foreground"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* Shine */}
        <circle cx="16" cy="18" r="2" className="fill-primary-foreground/40" />
      </svg>
    </div>
    <div className="flex flex-col">
      <span className="text-xl md:text-2xl font-bold tracking-tight text-primary leading-none">
        POWER
      </span>
      <span className="text-lg md:text-xl font-light tracking-widest text-foreground leading-none">
        HAIR
      </span>
    </div>
  </Link>
);

 const Header = () => {
   return (
     <header className="border-b border-border bg-background">
       {/* Top bar */}
       <div className="hidden md:flex items-center justify-between px-6 py-2 text-xs text-muted-foreground border-b border-border">
         <div className="flex items-center gap-6">
           <button className="hover:text-foreground transition-colors">Acessibilidade</button>
          <button className="hover:text-foreground transition-colors">Sobre Nós</button>
         </div>
         <div className="flex items-center gap-6">
           <button className="flex items-center gap-1 hover:text-foreground transition-colors">
             <HelpCircle className="w-3.5 h-3.5" />
             Precisa de ajuda?
           </button>
          <button className="hover:text-foreground transition-colors">Rastrear Pedido</button>
          <button className="hover:text-foreground transition-colors">Seja Parceiro</button>
         </div>
       </div>
       
       {/* Main header */}
       <div className="flex items-center justify-between px-4 md:px-6 py-4 gap-4">
         <Button variant="ghost" size="icon" className="md:hidden">
           <Menu className="w-6 h-6" />
         </Button>
         
        <PowerHairLogo />
         
         <div className="hidden md:flex flex-1 max-w-xl mx-8">
           <div className="relative w-full">
             <Input 
              placeholder="O que você procura?" 
               className="pr-10 rounded-full border-border"
             />
             <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
           </div>
         </div>
         
         <div className="flex items-center gap-2 md:gap-4">
           <Button variant="ghost" size="sm" className="hidden md:flex items-center gap-2 text-sm">
             <MapPin className="w-4 h-4" />
             <span className="text-muted-foreground">Localização</span>
           </Button>
           
           <Button variant="ghost" size="sm" className="hidden md:flex items-center gap-2 text-sm">
             <User className="w-4 h-4" />
             <div className="flex flex-col items-start text-xs">
               <span className="text-muted-foreground">Olá! Entrar na</span>
               <span className="font-medium">Minha Conta</span>
             </div>
           </Button>
           
           <Button variant="ghost" size="icon" className="hidden md:flex">
             <Heart className="w-5 h-5" />
           </Button>
           
           <Button variant="ghost" size="sm" className="flex items-center gap-2">
             <ShoppingBag className="w-5 h-5" />
             <span className="hidden md:inline text-sm">Sacola</span>
           </Button>
         </div>
       </div>
       
       {/* Mobile search */}
       <div className="md:hidden px-4 pb-4">
         <div className="relative w-full">
           <Input 
            placeholder="O que você procura?" 
             className="pr-10 rounded-full"
           />
           <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
         </div>
       </div>
     </header>
   );
 };
 
 export default Header;