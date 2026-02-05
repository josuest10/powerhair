 import { Badge } from "@/components/ui/badge";
 
 const PromoBanner = () => {
   return (
     <div className="bg-promo py-3 px-4 text-center">
       <p className="text-promo-foreground text-sm md:text-base font-medium">
         Frete Grátis <span className="text-promo-highlight font-bold">+ 15% OFF</span> em itens não promocionados
         <Badge variant="outline" className="ml-3 border-promo-foreground/50 text-promo-foreground bg-transparent">
           CUPOM
         </Badge>
         <span className="ml-2 font-semibold">BEMVINDA15</span>
       </p>
     </div>
   );
 };
 
 export default PromoBanner;