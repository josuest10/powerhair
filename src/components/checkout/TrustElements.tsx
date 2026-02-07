import { Shield, Lock, CreditCard, RotateCcw, CheckCircle2, Star, Users } from "lucide-react";

// Enhanced trust badges above submit button - more visible and reassuring
export const SecurityBadges = () => {
  return (
    <div className="space-y-3 mb-4">
      {/* Main guarantee banner */}
      <div className="flex items-center gap-3 p-3 bg-primary/5 border border-primary/20 rounded-xl">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Shield className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-foreground">Compra 100% Segura</p>
          <p className="text-xs text-muted-foreground">Seus dados estão protegidos com criptografia SSL</p>
        </div>
        <Lock className="w-5 h-5 text-primary flex-shrink-0" />
      </div>
      
      {/* Trust badges row */}
      <div className="grid grid-cols-3 gap-2">
        <div className="flex flex-col items-center p-2 bg-secondary/50 rounded-lg">
          <RotateCcw className="w-5 h-5 text-primary mb-1" />
          <span className="text-[10px] font-medium text-center text-foreground">7 dias para devolução</span>
        </div>
        <div className="flex flex-col items-center p-2 bg-secondary/50 rounded-lg">
          <CreditCard className="w-5 h-5 text-primary mb-1" />
          <span className="text-[10px] font-medium text-center text-foreground">PIX instantâneo</span>
        </div>
        <div className="flex flex-col items-center p-2 bg-secondary/50 rounded-lg">
          <Users className="w-5 h-5 text-primary mb-1" />
          <span className="text-[10px] font-medium text-center text-foreground">+10 mil clientes</span>
        </div>
      </div>
    </div>
  );
};

// Compact inline rating display for checkout
export const CheckoutRating = () => {
  return (
    <div className="flex items-center justify-center gap-2 py-2 text-sm">
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 fill-rating text-rating" />
        ))}
      </div>
      <span className="font-semibold text-foreground">4.9</span>
      <span className="text-muted-foreground text-xs">(+2.500 avaliações verificadas)</span>
    </div>
  );
};

// Total savings highlight - makes the deal feel unmissable
export const SavingsHighlight = ({ originalPrice, finalPrice, couponApplied }: { 
  originalPrice: number; 
  finalPrice: number; 
  couponApplied: boolean 
}) => {
  const savings = originalPrice - finalPrice;
  const percentage = Math.round((savings / originalPrice) * 100);
  
  return (
    <div className="relative overflow-hidden p-3 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/30 rounded-xl">
      <div className="absolute -right-4 -top-4 w-20 h-20 bg-primary/10 rounded-full blur-2xl" />
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <CheckCircle2 className="w-4 h-4 text-primary-foreground" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Você está economizando</p>
            <p className="text-lg font-bold text-primary">R$ {savings.toFixed(2).replace(".", ",")}</p>
          </div>
        </div>
        <div className="text-right">
          <span className="inline-block px-3 py-1 text-sm font-bold text-primary-foreground bg-primary rounded-full shadow-lg shadow-primary/30">
            {percentage}% OFF
          </span>
          {couponApplied && (
            <p className="text-[10px] text-primary mt-1">+ cupom aplicado! 🎉</p>
          )}
        </div>
      </div>
    </div>
  );
};
