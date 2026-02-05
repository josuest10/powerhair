 import { Star, Heart, ShoppingBag } from "lucide-react";
import { Shield, Truck, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
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
  const originalPrice = 149.90;
   const discount = Math.round(((originalPrice - totalPrice) / originalPrice) * 100);
  const pixPrice = totalPrice * 0.95;
 
   return (
     <div className="space-y-6">
       {/* Badges */}
       <div className="flex flex-wrap gap-2">
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
 
       {/* Price Box */}
      <div className="space-y-4">
        {/* Prices */}
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground line-through">
            R$ {originalPrice.toFixed(2).replace(".", ",")}
          </p>
          <p className="text-3xl font-bold text-foreground">
            R$ {pixPrice.toFixed(2).replace(".", ",")}
            <span className="text-sm font-normal text-primary ml-2">no PIX</span>
          </p>
          <p className="text-sm text-muted-foreground">
            ou R$ {totalPrice.toFixed(2).replace(".", ",")} em até {installmentCount}x de R$ {installmentPrice.toFixed(2).replace(".", ",")}
          </p>
        </div>
 
        <Link to="/checkout">
          <Button className="w-full h-12 text-base font-semibold rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground">
            <ShoppingBag className="w-5 h-5 mr-2" />
            Comprar agora
          </Button>
        </Link>
 
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
          <Input placeholder="CEP" className="flex-1" />
          <Button variant="outline">OK</Button>
         </div>
        <p className="text-xs text-muted-foreground">
          <a href="#" className="text-primary hover:underline">Não sei meu CEP</a>
        </p>
       </div>
     </div>
   );
 };
 
 export default ProductInfo;