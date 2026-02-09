import { Star, Heart, ShoppingBag, Loader2, Plus, Minus, Truck, CheckCircle } from "lucide-react";
import { Shield, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
 
interface KitItem {
  image: string;
  price: number;
  installments: string;
  name?: string;
}

interface ProductInfoProps {
  title: string;
  brand: string;
  rating: number;
  reviewCount: number;
  kitItems: KitItem[];
  totalPrice: number;
  installmentPrice: number;
  installmentCount: number;
}

interface ShippingResult {
  city: string;
  state: string;
  estimatedDays: string;
}

const ProductInfo = ({
  title,
  brand,
  rating,
  reviewCount,
  kitItems,
  totalPrice,
  installmentPrice,
  installmentCount,
}: ProductInfoProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [cep, setCep] = useState("");
  const [cepLoading, setCepLoading] = useState(false);
  const [shippingResult, setShippingResult] = useState<ShippingResult | null>(null);
  const [cepError, setCepError] = useState<string | null>(null);
  
  const originalPrice = 179.90;
  const unitPrice = totalPrice;
  const currentTotalPrice = unitPrice * quantity;
  const discount = Math.round(((originalPrice - unitPrice) / originalPrice) * 100);
  const pixPrice = currentTotalPrice; // Preço PIX sem desconto adicional
  const installmentTotal = currentTotalPrice / installmentCount;

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, Math.min(10, prev + delta)));
  };

  const handleBuyClick = () => {
    setIsLoading(true);
    // Pequeno delay para garantir que os scripts de rastreamento carreguem
    setTimeout(() => {
      navigate("/checkout", { state: { quantity } });
    }, 800);
  };

  const formatCEP = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    return numbers.replace(/(\d{5})(\d)/, "$1-$2").slice(0, 9);
  };

  const abortControllerRef = useRef<AbortController | null>(null);

  const calculateShipping = async (cepValue: string) => {
    const cleanCep = cepValue.replace(/\D/g, "");
    
    if (cleanCep.length !== 8) {
      return;
    }

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
    
    setCepLoading(true);
    setCepError(null);
    
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`, {
        signal: abortControllerRef.current.signal,
      });
      const data = await response.json();
      
      if (data.erro) {
        setCepError("CEP não encontrado");
        setShippingResult(null);
        return;
      }
      
      // Calculate estimated days based on region
      const region = data.uf;
      let estimatedDays = "5 a 9 dias úteis";
      
      if (["SP", "RJ", "MG", "ES"].includes(region)) {
        estimatedDays = "3 a 5 dias úteis";
      } else if (["PR", "SC", "RS", "GO", "MT", "MS", "DF"].includes(region)) {
        estimatedDays = "5 a 7 dias úteis";
      } else if (["BA", "SE", "AL", "PE", "PB", "RN", "CE", "PI", "MA"].includes(region)) {
        estimatedDays = "7 a 10 dias úteis";
      } else {
        estimatedDays = "10 a 15 dias úteis";
      }
      
      setShippingResult({
        city: data.localidade,
        state: data.uf,
        estimatedDays,
      });
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        console.error("Error fetching CEP:", error);
        setCepError("Erro ao buscar CEP");
      }
    } finally {
      setCepLoading(false);
    }
  };

  const handleCepChange = (value: string) => {
    const formatted = formatCEP(value);
    setCep(formatted);
    setCepError(null);
    
    // Auto-search when CEP is complete
    const cleanCep = formatted.replace(/\D/g, "");
    if (cleanCep.length === 8) {
      calculateShipping(formatted);
    } else {
      setShippingResult(null);
    }
  };

  return (
    <div className="space-y-6">
       {/* Badges */}
       <div className="flex flex-wrap gap-2">
         <Badge className="bg-destructive text-destructive-foreground animate-pulse">
           🔥 PROMOÇÃO
         </Badge>
         <Badge className="bg-primary text-primary-foreground">
           {discount}% OFF
         </Badge>
         <Badge variant="secondary">Mais Vendido</Badge>
         <Badge variant="secondary">Frete Grátis</Badge>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2">
       <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < rating ? "fill-rating text-rating" : "text-border"}`}
            />
          ))}
        </div>
       <span className="text-sm text-muted-foreground">({reviewCount} avaliações)</span>
      </div>

      {/* Title and Brand */}
      <div className="flex items-start justify-between gap-4">
        <div>
         <p className="text-sm text-primary font-medium mb-1">{brand}</p>
         <h1 className="text-xl md:text-2xl font-semibold text-foreground leading-tight">
            {title}
          </h1>
        </div>
       <Button variant="ghost" size="icon" className="flex-shrink-0 hover:text-primary">
          <Heart className="w-6 h-6" />
        </Button>
      </div>

      {/* Kit Items */}
      <div>
       <p className="text-sm text-muted-foreground mb-3">Itens do kit:</p>
        <div className="flex gap-3">
          {kitItems.map((item, index) => (
            <div 
              key={index} 
             className="border border-border rounded-lg p-3 hover:border-primary transition-colors cursor-pointer flex-1"
            >
             <div className="w-full h-16 mb-2">
                <img src={item.image} alt="" className="w-full h-full object-contain" />
              </div>
             <p className="text-xs font-medium text-foreground text-center">{item.name}</p>
             <p className="text-xs text-muted-foreground text-center">{item.installments}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-foreground">Quantidade:</span>
        <div className="flex items-center border border-border rounded-lg">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-10 w-10 rounded-r-none"
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1}
          >
            <Minus className="w-4 h-4" />
          </Button>
          <span className="w-12 text-center font-medium text-foreground">{quantity}</span>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-10 w-10 rounded-l-none"
            onClick={() => handleQuantityChange(1)}
            disabled={quantity >= 10}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        {quantity > 1 && (
          <span className="text-sm text-primary font-medium">
            {quantity} kits
          </span>
        )}
      </div>

      {/* Price Box */}
     <div className="space-y-4">
       {/* Prices */}
       <div className="space-y-1">
         <div className="flex items-center gap-2">
           <p className="text-sm text-muted-foreground line-through">
             De R$ {(originalPrice * quantity).toFixed(2).replace(".", ",")}
           </p>
           <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded">
             -{Math.round((((originalPrice * quantity) - pixPrice) / (originalPrice * quantity)) * 100)}%
           </span>
         </div>
         <p className="text-3xl font-bold text-foreground">
           R$ {pixPrice.toFixed(2).replace(".", ",")}
           <span className="text-sm font-normal text-primary ml-2">no PIX</span>
         </p>
         <p className="text-sm text-muted-foreground">
           ou R$ {currentTotalPrice.toFixed(2).replace(".", ",")} em até {installmentCount}x de R$ {installmentTotal.toFixed(2).replace(".", ",")}
         </p>
       </div>

         <Button 
           onClick={handleBuyClick}
           disabled={isLoading}
           className="w-full h-12 text-base font-semibold rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground mt-6"
         >
           {isLoading ? (
             <>
               <Loader2 className="w-5 h-5 mr-2 animate-spin" />
               Carregando...
             </>
           ) : (
             <>
               <ShoppingBag className="w-5 h-5 mr-2" />
               Comprar agora
             </>
           )}
         </Button>

       {/* Trust indicators */}
       <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
         <span className="flex items-center gap-1">
           <Shield className="w-4 h-4" /> Compra segura
         </span>
         <span className="flex items-center gap-1">
           <Truck className="w-4 h-4" /> Frete grátis
         </span>
         <span className="flex items-center gap-1">
           <CreditCard className="w-4 h-4" /> Até 12x
         </span>
       </div>
      </div>

      {/* Shipping Calculator */}
     <div className="pt-4 border-t border-border space-y-3">
       <p className="text-sm font-medium text-foreground">Calcular prazo de entrega</p>
        <div className="flex gap-2">
         <Input 
           placeholder="00000-000" 
           className="flex-1" 
           value={cep}
           onChange={(e) => handleCepChange(e.target.value)}
           maxLength={9}
         />
         {cepLoading && (
           <div className="flex items-center px-3">
             <Loader2 className="w-4 h-4 animate-spin text-primary" />
           </div>
         )}
        </div>
       
       {cepError && (
         <p className="text-xs text-destructive">{cepError}</p>
       )}
       
       {shippingResult && (
         <div className="bg-secondary/50 rounded-lg p-3 space-y-2">
           <div className="flex items-center gap-2 text-sm">
             <CheckCircle className="w-4 h-4 text-primary" />
             <span className="font-medium text-foreground">
               {shippingResult.city}, {shippingResult.state}
             </span>
           </div>
           <div className="flex items-center justify-between text-sm">
             <div className="flex items-center gap-2">
               <Truck className="w-4 h-4 text-primary" />
               <span className="text-foreground">Frete Grátis</span>
             </div>
             <span className="text-muted-foreground">{shippingResult.estimatedDays}</span>
           </div>
         </div>
       )}
       
       <p className="text-xs text-muted-foreground">
         <a 
           href="https://buscacepinter.correios.com.br/app/endereco/index.php" 
           target="_blank" 
           rel="noopener noreferrer"
           className="text-primary hover:underline"
         >
           Não sei meu CEP
         </a>
       </p>
      </div>
    </div>
  );
};

export default ProductInfo;