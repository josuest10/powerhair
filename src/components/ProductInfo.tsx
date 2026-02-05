 import { Star, Heart, ShoppingBag } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { Input } from "@/components/ui/input";
 
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
   return (
     <div className="space-y-6">
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
         <p className="text-sm font-medium text-foreground mb-3">Itens desse Kit:</p>
         <div className="flex gap-3">
           {kitItems.map((item, index) => (
             <div 
               key={index} 
               className="border border-border rounded-lg p-3 hover:border-primary transition-colors cursor-pointer"
             >
               <div className="w-16 h-16 mb-2">
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
       <div className="border border-border rounded-xl p-6 space-y-4">
         <div className="flex items-center gap-3">
           <div className="w-4 h-4 rounded-full border-4 border-accent" />
           <div>
             <p className="text-2xl md:text-3xl font-bold text-foreground">
               R$ {totalPrice.toFixed(2).replace(".", ",")}
             </p>
             <p className="text-sm text-muted-foreground">
               {installmentCount}x de R$ {installmentPrice.toFixed(2).replace(".", ",")} no cartão
             </p>
           </div>
         </div>
 
         <Button className="w-full h-14 text-lg font-medium rounded-lg bg-primary hover:bg-primary/90">
           <ShoppingBag className="w-5 h-5 mr-2" />
           COMPRAR
         </Button>
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