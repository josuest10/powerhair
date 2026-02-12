import { ShoppingBag, Menu, Package, HelpCircle, Home, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const PowerHairLogo = () => (
  <Link to="/inicio" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
    <div className="relative w-10 h-10">
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
      <span className="text-xl font-bold tracking-tight text-primary leading-none">
        POWER
      </span>
      <span className="text-lg font-light tracking-widest text-foreground leading-none">
        HAIR
      </span>
    </div>
  </Link>
);

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="border-b border-border bg-background">
      {/* Main header - clean like ForPatas */}
      <div className="flex items-center justify-between px-4 md:px-6 py-3">
        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px]">
            <SheetHeader>
              <SheetTitle className="text-left">Menu</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-2 mt-6">
              <Link 
                to="/inicio" 
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-muted transition-colors"
              >
                <Home className="w-5 h-5 text-primary" />
                <span className="font-medium">Início</span>
              </Link>
              <Link 
                to="/" 
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-muted transition-colors"
              >
                <ShoppingBag className="w-5 h-5 text-primary" />
                <span className="font-medium">Comprar Agora</span>
              </Link>
              <Link 
                to="/rastreio" 
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-muted transition-colors"
              >
                <Package className="w-5 h-5 text-primary" />
                <span className="font-medium">Rastrear Pedido</span>
              </Link>
              <Link 
                to="/central-de-ajuda" 
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-muted transition-colors"
              >
                <HelpCircle className="w-5 h-5 text-primary" />
                <span className="font-medium">Central de Ajuda</span>
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        
        {/* Desktop left nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link to="/rastreio" className="text-muted-foreground hover:text-foreground transition-colors">
            Rastrear Pedido
          </Link>
          <Link to="/central-de-ajuda" className="text-muted-foreground hover:text-foreground transition-colors">
            Central de Ajuda
          </Link>
        </nav>

        {/* Logo centered */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <PowerHairLogo />
        </div>
        
        {/* Right icons */}
        <div className="flex items-center gap-2 ml-auto">
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            <span className="hidden md:inline text-sm">Sacola</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
