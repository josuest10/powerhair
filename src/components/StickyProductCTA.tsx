import { useState } from "react";
import { ShoppingBag, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface StickyProductCTAProps {
  price: number;
  originalPrice: number;
  isVisible: boolean;
}

const StickyProductCTA = ({ price, originalPrice, isVisible }: StickyProductCTAProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const discount = Math.round(((originalPrice - price) / originalPrice) * 100);

  const handleBuyClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate("/checkout", { state: { quantity: 1 } });
    }, 800);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-card/95 backdrop-blur-md border-t-2 border-primary/20 shadow-[0_-4px_20px_rgba(0,0,0,0.15)] animate-slide-up">
      <div className="container max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center gap-3">
          {/* Price Summary */}
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2">
              <span className="text-xs text-muted-foreground line-through">
                R$ {originalPrice.toFixed(2).replace(".", ",")}
              </span>
              <span className="text-xs font-semibold text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                -{discount}%
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-foreground">
                R$ {price.toFixed(2).replace(".", ",")}
              </span>
              <span className="text-xs text-primary font-medium">
                no PIX
              </span>
            </div>
          </div>
          
          {/* CTA Button */}
          <Button 
            onClick={handleBuyClick}
            disabled={isLoading}
            className="h-12 px-6 text-sm font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/30"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Carregando...
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4 mr-2" />
                Comprar Agora
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StickyProductCTA;
