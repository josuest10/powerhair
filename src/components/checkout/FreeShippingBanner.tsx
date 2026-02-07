import { Truck, CheckCircle } from "lucide-react";

const FreeShippingBanner = () => {
  return (
    <div className="flex items-center justify-center gap-3 px-4 py-2.5 bg-primary/5 border border-primary/20 rounded-xl">
      <div className="flex items-center gap-2">
        <div className="p-1.5 bg-primary/10 rounded-full">
          <Truck className="w-4 h-4 text-primary" />
        </div>
        <div className="flex items-center gap-1.5">
          <CheckCircle className="w-3.5 h-3.5 text-primary" />
          <span className="text-sm font-medium text-foreground">
            Frete Grátis
          </span>
          <span className="text-xs text-muted-foreground">
            para todo Brasil
          </span>
        </div>
      </div>
    </div>
  );
};

export default FreeShippingBanner;
