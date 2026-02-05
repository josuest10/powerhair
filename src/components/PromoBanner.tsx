 import { Badge } from "@/components/ui/badge";
 
 const PromoBanner = () => {
   return (
    <div className="bg-promo py-3 px-4 text-center animate-pulse">
      <p className="text-promo-foreground text-sm md:text-base font-medium flex items-center justify-center gap-2 flex-wrap">
        <span className="inline-flex items-center gap-1">
          💸 Pague com <strong>PIX</strong> e ganhe
        </span>
        <span className="text-promo-highlight font-bold text-lg">5% de desconto</span>
        <span className="hidden md:inline">•</span>
        <span className="inline-flex items-center gap-1">
          🚚 <strong>Frete Grátis</strong> para todo Brasil
        </span>
      </p>
     </div>
   );
 };
 
 export default PromoBanner;