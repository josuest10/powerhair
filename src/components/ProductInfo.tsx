 import { Star, Heart, ShoppingBag } from "lucide-react";
import { Zap, Shield, Truck, Clock } from "lucide-react";
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
  const originalPrice = 199.00;
   const discount = Math.round(((originalPrice - totalPrice) / originalPrice) * 100);
  const pixPrice = totalPrice * 0.95;
 
   return (
     <div className="space-y-6">
       {/* Badges */}
       <div className="flex flex-wrap gap-2">
        <Badge className="bg-accent text-accent-foreground animate-pulse">
           {discount}% OFF
         </Badge>
        <Badge variant="outline" className="border-success text-success">
          🔥 Mais Vendido
         </Badge>
         <Badge variant="outline" className="border-success text-success">
          🚚 Frete Grátis
        </Badge>
        <Badge variant="outline" className="border-primary text-primary">
          ✨ Resultado em 30 dias
         </Badge>
       </div>
 
       {/* Rating */}
       <div className="flex items-center gap-2">
         <div className="flex items-center gap-1 px-3 py-1 rounded-full border border-border">
           {[...Array(5)].map((_, i) => (
             <Star
               key={i}
               className={`w-4 h-4 ${i < rating ? "fill-rating text-rating" : "text-border"}`}
             />
           ))}
          <span className="text-sm text-muted-foreground ml-1">({reviewCount} avaliações)</span>
         </div>
        <span className="text-xs text-success font-medium">98% recomendam</span>
       </div>
 
       {/* Title and Brand */}
       <div className="flex items-start justify-between gap-4">
         <div>
           <h1 className="text-xl md:text-2xl font-medium text-foreground leading-tight">
             {title}
           </h1>
          <p className="text-2xl md:text-3xl font-bold tracking-[0.15em] mt-3 text-primary">
             {brand}
           </p>
          <p className="text-sm text-muted-foreground mt-1">Tratamento Profissional Fitoterápico</p>
         </div>
         <Button variant="ghost" size="icon" className="flex-shrink-0">
           <Heart className="w-6 h-6" />
         </Button>
       </div>
 
       {/* Kit Items */}
       <div>
         <p className="text-sm font-medium text-foreground mb-3">Itens inclusos neste Kit:</p>
         <div className="flex gap-3">
           {kitItems.map((item, index) => (
             <div 
               key={index} 
              className="border border-border rounded-xl p-3 hover:border-primary hover:shadow-lg transition-all cursor-pointer flex-1 bg-card"
             >
              <div className="w-full h-20 mb-2 rounded-lg overflow-hidden bg-secondary">
                 <img src={item.image} alt="" className="w-full h-full object-contain" />
               </div>
              <p className="text-xs font-semibold text-foreground text-center">{item.name}</p>
              <p className="text-xs text-muted-foreground text-center">{item.installments}</p>
             </div>
           ))}
         </div>
       </div>
 
       {/* Price Box */}
      <div className="border-2 border-primary rounded-2xl p-6 space-y-4 bg-gradient-to-br from-primary/5 to-primary/10 relative overflow-hidden">
        {/* Decorative element */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        
         {/* Original Price */}
         <div className="flex items-center gap-3">
           <span className="text-price-old line-through text-lg">
             De R$ {originalPrice.toFixed(2).replace(".", ",")}
           </span>
          <Badge className="bg-accent text-accent-foreground text-xs">
            Economize R$ {(originalPrice - totalPrice).toFixed(2).replace(".", ",")}
          </Badge>
         </div>
 
        {/* PIX Price */}
        <div className="bg-success/10 border border-success/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-5 h-5 text-success" />
            <span className="text-sm font-medium text-success">Preço à vista no PIX</span>
          </div>
          <p className="text-3xl md:text-4xl font-bold text-success">
            R$ {pixPrice.toFixed(2).replace(".", ",")}
          </p>
        </div>

        {/* Installment Price */}
        <div className="flex items-center gap-3 pt-2">
          <div className="w-4 h-4 rounded-full border-4 border-primary" />
           <div>
            <p className="text-2xl md:text-3xl font-bold text-foreground">
               R$ {totalPrice.toFixed(2).replace(".", ",")}
             </p>
             <p className="text-sm text-muted-foreground">
              ou até <span className="font-semibold text-foreground">{installmentCount}x de R$ {installmentPrice.toFixed(2).replace(".", ",")}</span> sem juros
             </p>
           </div>
         </div>
 
        <Button className="w-full h-14 text-lg font-bold rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]">
           <ShoppingBag className="w-5 h-5 mr-2" />
          COMPRAR COM FRETE GRÁTIS
         </Button>
 
        {/* Trust badges */}
        <div className="grid grid-cols-3 gap-2 pt-2">
          <div className="flex flex-col items-center text-center">
            <Shield className="w-5 h-5 text-muted-foreground mb-1" />
            <span className="text-xs text-muted-foreground">Compra Segura</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <Truck className="w-5 h-5 text-success mb-1" />
            <span className="text-xs text-success font-medium">Frete Grátis</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <Clock className="w-5 h-5 text-muted-foreground mb-1" />
            <span className="text-xs text-muted-foreground">Envio Imediato</span>
          </div>
        </div>
       </div>
 
       {/* Urgency */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-xl p-4">
        <p className="text-sm text-foreground font-medium text-center flex items-center justify-center gap-2 flex-wrap">
          <span className="inline-block animate-pulse">🔥</span>
          <span className="text-primary font-bold">Oferta por tempo limitado!</span>
          <span className="text-muted-foreground">•</span>
          <span>47 pessoas compraram hoje</span>
         </p>
       </div>
 
       {/* Shipping Calculator */}
       <div className="space-y-3">
         <p className="font-medium text-foreground">Consultar frete e prazo</p>
         <p className="text-sm text-muted-foreground">
          <span className="text-success font-medium">✓ Este produto tem frete grátis!</span> Calcule o prazo de entrega para seu CEP.
         </p>
         <div className="flex gap-2">
          <Input placeholder="Digite seu CEP" className="flex-1 rounded-xl" />
          <Button variant="outline" className="rounded-xl">Calcular</Button>
         </div>
       </div>
     </div>
   );
 };
 
 export default ProductInfo;