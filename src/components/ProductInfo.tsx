import { Star, ShoppingBag, Loader2, Truck, CheckCircle, Shield, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface KitOption {
  id: string;
  label: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  badge?: string;
  productName: string;
  productDescription: string;
}

interface ProductInfoProps {
  title: string;
  brand: string;
  rating: number;
  reviewCount: number;
  kits: KitOption[];
  selectedKit: string;
  onSelectKit: (kitId: string) => void;
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
  kits,
  selectedKit,
  onSelectKit,
  installmentCount,
}: ProductInfoProps) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [cep, setCep] = useState("");
  const [cepLoading, setCepLoading] = useState(false);
  const [shippingResult, setShippingResult] = useState<ShippingResult | null>(null);
  const [cepError, setCepError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const activeKit = kits.find(k => k.id === selectedKit) || kits[0];
  const discount = Math.round(((activeKit.originalPrice - activeKit.price) / activeKit.originalPrice) * 100);
  const installmentTotal = activeKit.price / installmentCount;

  const handleBuyClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate("/checkout", {
        state: {
          kitId: activeKit.id,
          kitPrice: activeKit.price,
          kitOriginalPrice: activeKit.originalPrice,
          kitProductName: activeKit.productName,
          kitProductDescription: activeKit.productDescription,
        },
      });
    }, 800);
  };

  const formatCEP = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    return numbers.replace(/(\d{5})(\d)/, "$1-$2").slice(0, 9);
  };

  const calculateShipping = async (cepValue: string) => {
    const cleanCep = cepValue.replace(/\D/g, "");
    if (cleanCep.length !== 8) return;

    if (abortControllerRef.current) abortControllerRef.current.abort();
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

      const region = data.uf;
      let estimatedDays = "5 a 9 dias úteis";
      if (["SP", "RJ", "MG", "ES"].includes(region)) estimatedDays = "3 a 5 dias úteis";
      else if (["PR", "SC", "RS", "GO", "MT", "MS", "DF"].includes(region)) estimatedDays = "5 a 7 dias úteis";
      else if (["BA", "SE", "AL", "PE", "PB", "RN", "CE", "PI", "MA"].includes(region)) estimatedDays = "7 a 10 dias úteis";
      else estimatedDays = "10 a 15 dias úteis";

      setShippingResult({ city: data.localidade, state: data.uf, estimatedDays });
    } catch (error) {
      if ((error as Error).name !== "AbortError") {
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
    const cleanCep = formatted.replace(/\D/g, "");
    if (cleanCep.length === 8) calculateShipping(formatted);
    else setShippingResult(null);
  };

  return (
    <div className="space-y-5">
      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        <span className="bg-destructive text-destructive-foreground text-xs font-bold px-3 py-1 rounded-full animate-pulse">
          🔥 QUEIMA DE ESTOQUE
        </span>
        <span className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">
          FRETE GRÁTIS
        </span>
      </div>

      {/* Title */}
      <h1 className="text-xl md:text-2xl font-bold text-foreground leading-tight">
        {title}
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < rating ? "fill-rating text-rating" : "text-border"}`}
            />
          ))}
        </div>
        <span className="text-sm text-muted-foreground">({reviewCount} avaliações)</span>
      </div>

      {/* Price */}
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <span className="text-3xl font-bold text-foreground">
            R$ {activeKit.price.toFixed(2).replace(".", ",")}
          </span>
          <span className="text-base text-muted-foreground line-through">
            R$ {activeKit.originalPrice.toFixed(2).replace(".", ",")}
          </span>
          <span className="bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-full">
            - {discount}%
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          em até {installmentCount}x de <strong className="text-foreground">R$ {installmentTotal.toFixed(2).replace(".", ",")}</strong>
        </p>
      </div>

      {/* Kit Selector - ForPatas style */}
      <div className="space-y-2">
        <p className="text-sm font-semibold text-foreground">Quantidade:</p>
        <div className="space-y-2">
          {kits.map((kit) => {
            const isSelected = selectedKit === kit.id;
            return (
              <button
                key={kit.id}
                onClick={() => onSelectKit(kit.id)}
                className={`relative w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                  isSelected
                    ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                    : "border-border bg-card hover:border-muted-foreground/40"
                }`}
              >
                {/* Radio circle */}
                <div
                  className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                    isSelected ? "border-primary" : "border-muted-foreground/40"
                  }`}
                >
                  {isSelected && (
                    <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                  )}
                </div>

                {/* Kit info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-sm md:text-base">
                    {kit.label}
                  </p>
                  <p className="text-xs text-muted-foreground">{kit.subtitle}</p>
                </div>

                {/* Price */}
                <div className="text-right flex-shrink-0">
                  <p className="font-bold text-foreground text-sm md:text-base">
                    R$ {kit.price.toFixed(2).replace(".", ",")}
                  </p>
                  <p className="text-xs text-muted-foreground line-through">
                    R$ {kit.originalPrice.toFixed(2).replace(".", ",")}
                  </p>
                </div>

                {/* Badge */}
                {kit.badge && (
                  <span className="absolute -top-2.5 right-4 bg-primary text-primary-foreground text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide">
                    {kit.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* CTA Button */}
      <Button
        onClick={handleBuyClick}
        disabled={isLoading}
        className="w-full h-14 text-base font-bold rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 uppercase tracking-wide"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Carregando...
          </>
        ) : (
          <>
            <ShoppingBag className="w-5 h-5 mr-2" />
            Comprar Agora
          </>
        )}
      </Button>


      {/* Trust Elements */}
      <div className="space-y-3 pt-2">
        <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
          <Truck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-foreground">Frete Grátis</p>
            <p className="text-xs text-muted-foreground">
              Entrega realizada pelos Correios Brasileiro©
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
          <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-foreground">Devoluções Gratuitas</p>
            <p className="text-xs text-muted-foreground">
              Estorno de 100% do seu dinheiro • 7 dias após o recebimento
            </p>
          </div>
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

        {cepError && <p className="text-xs text-destructive">{cepError}</p>}

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
