 import { Star, Heart, ShoppingBag } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 import { Badge } from "@/components/ui/badge";
 
 interface KitItem {
   image: string;
   price: number;
   installments: string;
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
   const originalPrice = 199.90;
   const discount = Math.round(((originalPrice - totalPrice) / originalPrice) * 100);
 
   return (
     <div className="space-y-6">
       {/* Badges */}
       <div className="flex flex-wrap gap-2">
         <Badge className="bg-accent text-accent-foreground">
           {discount}% OFF
         </Badge>
         <Badge variant="outline" className="border-accent text-accent">
           Mais Vendido
         </Badge>
         <Badge variant="outline" className="border-success text-success">
           Frete Grátis
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
           <span className="text-sm text-muted-foreground ml-1">({reviewCount})</span>
         </div>
       </div>
 
       {/* Title and Brand */}
       <div className="flex items-start justify-between gap-4">
         <div>
           <h1 className="text-xl md:text-2xl font-medium text-foreground leading-tight">
             {title}
           </h1>
           <p className="text-2xl md:text-3xl font-serif tracking-[0.2em] mt-3 text-foreground">
             {brand}
           </p>
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
               className="border border-border rounded-lg p-3 hover:border-accent hover:shadow-md transition-all cursor-pointer flex-1"
             >
               <div className="w-full h-20 mb-2">
                 <img src={item.image} alt="" className="w-full h-full object-contain" />
               </div>
               <p className="text-sm font-medium text-price">
                 R$ {item.price.toFixed(2).replace(".", ",")}
               </p>
               <p className="text-xs text-muted-foreground">{item.installments}</p>
             </div>
           ))}
         </div>
       </div>
 
       {/* Price Box */}
       <div className="border-2 border-accent rounded-xl p-6 space-y-4 bg-accent/5">
         {/* Original Price */}
         <div className="flex items-center gap-3">
           <span className="text-price-old line-through text-lg">
             De R$ {originalPrice.toFixed(2).replace(".", ",")}
           </span>
         </div>
 
         <div className="flex items-center gap-3">
           <div className="w-4 h-4 rounded-full border-4 border-accent" />
           <div>
             <p className="text-3xl md:text-4xl font-bold text-foreground">
               R$ {totalPrice.toFixed(2).replace(".", ",")}
             </p>
             <p className="text-sm text-muted-foreground">
               ou {installmentCount}x de <span className="font-semibold text-foreground">R$ {installmentPrice.toFixed(2).replace(".", ",")}</span> sem juros
             </p>
             <p className="text-xs text-accent font-medium mt-1">
               Economize R$ {(originalPrice - totalPrice).toFixed(2).replace(".", ",")}
             </p>
           </div>
         </div>
 
         <Button className="w-full h-14 text-lg font-semibold rounded-lg bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg">
           <ShoppingBag className="w-5 h-5 mr-2" />
           COMPRAR AGORA
         </Button>
 
         <p className="text-center text-xs text-muted-foreground">
           🔒 Compra 100% segura • Entrega garantida
         </p>
       </div>
 
       {/* Urgency */}
       <div className="bg-promo/10 border border-promo/20 rounded-lg p-4">
         <p className="text-sm text-foreground font-medium text-center">
           🔥 <span className="text-promo-highlight font-bold">Últimas unidades!</span> 23 pessoas estão vendo este produto agora
         </p>
       </div>
 
       {/* Shipping Calculator */}
       <div className="space-y-3">
         <p className="font-medium text-foreground">Consultar frete e prazo</p>
         <p className="text-sm text-muted-foreground">
           Informações de frete válidas apenas para este produto. 
           Confira as <a href="#" className="text-accent underline">condições definitivas na sacola</a>.
         </p>
         <div className="flex gap-2">
           <Input placeholder="Digite seu CEP" className="flex-1" />
           <Button variant="outline">OK</Button>
         </div>
       </div>
     </div>
   );
 };
 
 export default ProductInfo;