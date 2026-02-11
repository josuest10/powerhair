import { Loader2, Lock, Shield, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StickyCheckoutCTAProps {
  finalPrice: number;
  originalPrice: number;
  isSubmitting: boolean;
  onSubmit: () => void;
}

const StickyCheckoutCTA = ({ 
  finalPrice, 
  originalPrice, 
  isSubmitting,
  onSubmit 
}: StickyCheckoutCTAProps) => {
  const savings = originalPrice - finalPrice;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-card/95 backdrop-blur-md border-t-2 border-primary/20 shadow-[0_-4px_20px_rgba(0,0,0,0.15)] animate-slide-up">
      <div className="container max-w-4xl mx-auto px-4 py-3">
        {/* Frete Grátis Badge */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <Truck className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-medium text-primary">Frete Grátis para todo Brasil</span>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Price Summary */}
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-foreground">
                R$ {finalPrice.toFixed(2).replace(".", ",")}
              </span>
              <span className="text-xs text-primary font-medium">
                no PIX
              </span>
            </div>
            <p className="text-[10px] text-muted-foreground">
              Economia de R$ {savings.toFixed(2).replace(".", ",")}
            </p>
          </div>
          
          {/* CTA Button */}
          <Button 
            type="submit"
            onClick={onSubmit}
            disabled={isSubmitting}
            className="h-12 px-6 text-sm font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/30 animate-pulse-subtle"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processando...
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 mr-2" />
                Pagar com PIX
              </>
            )}
          </Button>
        </div>
        
        {/* Trust Indicators */}
        <div className="flex items-center justify-center gap-4 mt-2 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <Shield className="w-3 h-3" />
            Compra Segura
          </span>
          <span className="flex items-center gap-1">
            <Lock className="w-3 h-3" />
            Dados Protegidos
          </span>
        </div>
      </div>
    </div>
  );
};

export default StickyCheckoutCTA;
