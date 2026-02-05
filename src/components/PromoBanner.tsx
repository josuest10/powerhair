 import { Badge } from "@/components/ui/badge";
 
 const PromoBanner = () => {
   return (
    <div className="bg-primary py-2.5 px-4 text-center">
      <p className="text-primary-foreground text-sm font-medium">
        Frete Grátis em todo Brasil • <span className="text-promo-highlight font-semibold">5% OFF no PIX</span>
      </p>
     </div>
   );
 };
 
 export default PromoBanner;