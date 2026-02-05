 import { Search, MapPin, User, ShoppingBag, Heart, HelpCircle, Menu } from "lucide-react";
 import { Input } from "@/components/ui/input";
 import { Button } from "@/components/ui/button";
 
 const Header = () => {
   return (
     <header className="border-b border-border bg-background">
       {/* Top bar */}
       <div className="hidden md:flex items-center justify-between px-6 py-2 text-xs text-muted-foreground border-b border-border">
         <div className="flex items-center gap-6">
           <button className="hover:text-foreground transition-colors">Acessibilidade</button>
           <button className="hover:text-foreground transition-colors">Marcas do Grupo</button>
         </div>
         <div className="flex items-center gap-6">
           <button className="flex items-center gap-1 hover:text-foreground transition-colors">
             <HelpCircle className="w-3.5 h-3.5" />
             Precisa de ajuda?
           </button>
           <button className="hover:text-foreground transition-colors">Portal do Revendedor</button>
           <button className="hover:text-foreground transition-colors">Quero Revender</button>
         </div>
       </div>
       
       {/* Main header */}
       <div className="flex items-center justify-between px-4 md:px-6 py-4 gap-4">
         <Button variant="ghost" size="icon" className="md:hidden">
           <Menu className="w-6 h-6" />
         </Button>
         
         <div className="text-2xl md:text-3xl font-serif tracking-widest text-primary font-semibold">
           EUDORA
         </div>
         
         <div className="hidden md:flex flex-1 max-w-xl mx-8">
           <div className="relative w-full">
             <Input 
               placeholder="Busque aqui seu produto ideal" 
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
             placeholder="Busque aqui seu produto ideal" 
             className="pr-10 rounded-full"
           />
           <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
         </div>
       </div>
     </header>
   );
 };
 
 export default Header;