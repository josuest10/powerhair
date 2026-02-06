import { useState, useEffect } from "react";
import { Users, Clock, Flame, Zap, TrendingUp } from "lucide-react";

// Simulated live viewer count with realistic fluctuations
const useViewerCount = () => {
  const [count, setCount] = useState(() => Math.floor(Math.random() * 8) + 12); // 12-19
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        const newCount = prev + change;
        return Math.min(Math.max(newCount, 8), 24); // Keep between 8-24
      });
    }, 4000 + Math.random() * 3000); // Random interval 4-7s
    
    return () => clearInterval(interval);
  }, []);
  
  return count;
};

// Fixed 15 minute offer timer
const useOfferTimer = () => {
  const [timeLeft, setTimeLeft] = useState(() => {
    const storedExpiry = sessionStorage.getItem('offerExpiry');
    if (storedExpiry) {
      const remaining = Math.floor((parseInt(storedExpiry) - Date.now()) / 1000);
      return remaining > 0 ? remaining : 0;
    }
    // Fixed 15 minutes
    const expiry = Date.now() + 15 * 60 * 1000;
    sessionStorage.setItem('offerExpiry', expiry.toString());
    return 15 * 60; // 15 minutes in seconds
  });
  
  useEffect(() => {
    if (timeLeft <= 0) return;
    
    const interval = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
    }, 1000);
    
    return () => clearInterval(interval);
  }, [timeLeft]);
  
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  
  return { minutes, seconds, isExpired: timeLeft <= 0 };
};

// Removed aggressive LiveViewerBadge - keeping export for backwards compatibility
export const LiveViewerBadge = () => null;

export const OfferCountdown = () => {
  const { minutes, seconds, isExpired } = useOfferTimer();
  
  if (isExpired) {
    return null; // Just hide when expired, no pressure message
  }
  
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3 bg-secondary/50 border border-border rounded-xl">
      <div className="flex items-center gap-2">
        <div className="p-1.5 bg-primary/10 rounded-lg">
          <Clock className="w-4 h-4 text-primary" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Preço promocional válido por</p>
          <p className="text-sm font-medium text-foreground">Aproveite o desconto!</p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <div className="bg-muted text-foreground px-2 py-1 rounded font-mono font-bold text-lg min-w-[2.5rem] text-center">
          {String(minutes).padStart(2, '0')}
        </div>
        <span className="text-muted-foreground font-bold text-lg">:</span>
        <div className="bg-muted text-foreground px-2 py-1 rounded font-mono font-bold text-lg min-w-[2.5rem] text-center">
          {String(seconds).padStart(2, '0')}
        </div>
      </div>
    </div>
  );
};

// Removed aggressive stock warning - keeping export for backwards compatibility
export const StockWarning = () => null;

export const RecentPurchase = () => {
  const [show, setShow] = useState(false);
  const names = ["Maria S.", "Ana C.", "Juliana M.", "Carla F.", "Patricia R.", "Fernanda L."];
  const cities = ["São Paulo", "Rio de Janeiro", "Belo Horizonte", "Curitiba", "Salvador"];
  
  const [purchase] = useState(() => ({
    name: names[Math.floor(Math.random() * names.length)],
    city: cities[Math.floor(Math.random() * cities.length)],
    minutes: Math.floor(Math.random() * 10) + 2,
  }));
  
  useEffect(() => {
    // Show notification after 8-15 seconds
    const showTimer = setTimeout(() => {
      setShow(true);
      // Hide after 5 seconds
      setTimeout(() => setShow(false), 5000);
    }, 8000 + Math.random() * 7000);
    
    return () => clearTimeout(showTimer);
  }, []);
  
  if (!show) return null;
  
  return (
    <div className="fixed bottom-4 left-4 z-50 animate-fade-in">
      <div className="flex items-center gap-3 px-4 py-3 bg-card border border-border rounded-xl shadow-lg max-w-xs">
        <div className="p-2 bg-primary/10 rounded-full">
          <Zap className="w-4 h-4 text-primary" />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">
            {purchase.name} de {purchase.city}
          </p>
          <p className="text-xs text-muted-foreground">
            comprou há {purchase.minutes} minutos
          </p>
        </div>
      </div>
    </div>
  );
};

export const ProgressSteps = ({ currentStep }: { currentStep: 1 | 2 | 3 }) => {
  const steps = [
    { num: 1, label: "Dados" },
    { num: 2, label: "Pagamento" },
    { num: 3, label: "Confirmação" },
  ];
  
  return (
    <div className="flex items-center justify-center gap-2 mb-6">
      {steps.map((step, index) => (
        <div key={step.num} className="flex items-center">
          <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold transition-all duration-300 ${
            currentStep >= step.num
              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
              : "bg-muted text-muted-foreground"
          }`}>
            {step.num}
          </div>
          <span className={`ml-2 text-xs font-medium hidden sm:inline ${
            currentStep >= step.num ? "text-foreground" : "text-muted-foreground"
          }`}>
            {step.label}
          </span>
          {index < steps.length - 1 && (
            <div className={`w-8 sm:w-12 h-0.5 mx-2 transition-all duration-300 ${
              currentStep > step.num ? "bg-primary" : "bg-muted"
            }`} />
          )}
        </div>
      ))}
    </div>
  );
};

export const SavingsBadge = ({ originalPrice, finalPrice }: { originalPrice: number; finalPrice: number }) => {
  const savings = originalPrice - finalPrice;
  const percentage = Math.round((savings / originalPrice) * 100);
  
  return (
    <div className="flex items-center justify-between px-3 py-2 bg-primary/5 border border-primary/20 rounded-lg">
      <div className="flex items-center gap-2">
        <Zap className="w-4 h-4 text-primary" />
        <span className="text-sm text-muted-foreground">
          Economia de <span className="font-semibold text-primary">R$ {savings.toFixed(2).replace(".", ",")}</span>
        </span>
      </div>
      <span className="text-xs font-bold text-primary-foreground bg-primary px-2 py-0.5 rounded-full">
        {percentage}% OFF
      </span>
    </div>
  );
};

export const TrustBar = () => {
  return (
    <div className="grid grid-cols-3 gap-2 py-3">
      <div className="flex flex-col items-center text-center p-2">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-1">
          <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <span className="text-[10px] sm:text-xs font-medium text-foreground">Compra 100% Segura</span>
      </div>
      <div className="flex flex-col items-center text-center p-2">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-1">
          <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <span className="text-[10px] sm:text-xs font-medium text-foreground">+10.000 Vendidos</span>
      </div>
      <div className="flex flex-col items-center text-center p-2">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-1">
          <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </div>
        <span className="text-[10px] sm:text-xs font-medium text-foreground">7 Dias de Garantia</span>
      </div>
    </div>
  );
};
