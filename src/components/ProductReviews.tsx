 import { Star, ThumbsUp, CheckCircle, Camera } from "lucide-react";
 import { Button } from "@/components/ui/button";
 import { Progress } from "@/components/ui/progress";
 
 interface Review {
   id: number;
   author: string;
   rating: number;
   date: string;
   title: string;
   content: string;
   helpful: number;
   verified: boolean;
   images?: string[];
 }
 
 const reviews: Review[] = [
   {
     id: 1,
     author: "Mariana S.",
     rating: 5,
     date: "15/01/2025",
     title: "Melhor kit para crescimento que já usei!",
     content: "Estou usando há 2 meses e já consigo ver a diferença! Meu cabelo estava muito fraco e quebradiço, agora está mais forte e notei vários fios novos nascendo. O cheiro é maravilhoso e dura o dia todo. Super recomendo para quem quer cabelos mais longos e saudáveis.",
     helpful: 47,
     verified: true,
     images: [
       "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=100&h=100&fit=crop",
     ],
   },
   {
     id: 2,
     author: "Carolina M.",
     rating: 5,
     date: "28/12/2024",
     title: "Meu cabelo nunca esteve tão bonito",
     content: "Comprei na promoção e não me arrependi! A máscara é muito potente, deixa o cabelo super macio. O shampoo limpa bem sem ressecar. Já estou no segundo kit e pretendo continuar usando.",
     helpful: 32,
     verified: true,
   },
   {
     id: 3,
     author: "Fernanda L.",
     rating: 4,
     date: "10/01/2025",
     title: "Ótimo custo-benefício",
     content: "O kit rende bastante e os resultados são visíveis. Tirei uma estrela porque achei o condicionador um pouco pesado para meu tipo de cabelo (fino), mas o shampoo e a máscara são perfeitos. No geral, super indico!",
     helpful: 18,
     verified: true,
   },
   {
     id: 4,
     author: "Ana Paula R.",
     rating: 5,
     date: "05/01/2025",
     title: "Resultado impressionante!",
     content: "Sofria muito com queda de cabelo e depois de usar esse kit por 6 semanas, a queda reduziu drasticamente. Minha escova já não fica mais cheia de cabelo como antes. Os produtos têm um perfume delicioso que não é enjoativo.",
     helpful: 56,
     verified: true,
     images: [
       "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=100&h=100&fit=crop",
       "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=100&h=100&fit=crop",
     ],
   },
 ];
 
 const ratingDistribution = [
   { stars: 5, percentage: 78 },
   { stars: 4, percentage: 15 },
   { stars: 3, percentage: 5 },
   { stars: 2, percentage: 1 },
   { stars: 1, percentage: 1 },
 ];
 
 const ProductReviews = () => {
   const averageRating = 4.8;
   const totalReviews = 224;
 
   return (
     <div className="border-t border-border py-8">
       <h2 className="text-xl font-semibold text-foreground mb-6">Avaliações dos Clientes</h2>
 
       {/* Rating Summary */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 p-6 bg-secondary rounded-xl">
         {/* Overall Rating */}
         <div className="text-center md:border-r border-border">
           <div className="text-5xl font-bold text-foreground">{averageRating}</div>
           <div className="flex justify-center gap-1 my-2">
             {[...Array(5)].map((_, i) => (
               <Star
                 key={i}
                 className={`w-5 h-5 ${i < Math.round(averageRating) ? "fill-rating text-rating" : "text-border"}`}
               />
             ))}
           </div>
           <p className="text-sm text-muted-foreground">Baseado em {totalReviews} avaliações</p>
         </div>
 
         {/* Rating Distribution */}
         <div className="space-y-2">
           {ratingDistribution.map((item) => (
             <div key={item.stars} className="flex items-center gap-2">
               <span className="text-sm text-muted-foreground w-12">{item.stars} {item.stars === 1 ? "estrela" : "estrelas"}</span>
               <Progress value={item.percentage} className="flex-1 h-2" />
               <span className="text-sm text-muted-foreground w-10">{item.percentage}%</span>
             </div>
           ))}
         </div>
 
         {/* CTA */}
         <div className="flex flex-col items-center justify-center gap-3">
           <p className="text-sm text-muted-foreground text-center">Comprou este produto?</p>
           <Button variant="outline" className="w-full max-w-[200px]">
             Escrever Avaliação
           </Button>
         </div>
       </div>
 
       {/* Reviews List */}
       <div className="space-y-6">
         {reviews.map((review) => (
           <div key={review.id} className="border-b border-border pb-6 last:border-b-0">
             <div className="flex items-start justify-between mb-3">
               <div>
                 <div className="flex items-center gap-2 mb-1">
                   <div className="flex">
                     {[...Array(5)].map((_, i) => (
                       <Star
                         key={i}
                         className={`w-4 h-4 ${i < review.rating ? "fill-rating text-rating" : "text-border"}`}
                       />
                     ))}
                   </div>
                   {review.verified && (
                     <span className="flex items-center gap-1 text-xs text-accent">
                       <CheckCircle className="w-3 h-3" />
                       Compra verificada
                     </span>
                   )}
                 </div>
                 <h4 className="font-medium text-foreground">{review.title}</h4>
               </div>
               <span className="text-sm text-muted-foreground">{review.date}</span>
             </div>
 
             <p className="text-muted-foreground mb-3">{review.content}</p>
 
             {review.images && review.images.length > 0 && (
               <div className="flex gap-2 mb-3">
                 {review.images.map((img, index) => (
                   <div key={index} className="w-16 h-16 rounded-lg overflow-hidden">
                     <img src={img} alt="" className="w-full h-full object-cover" />
                   </div>
                 ))}
               </div>
             )}
 
             <div className="flex items-center justify-between">
               <span className="text-sm text-muted-foreground">Por {review.author}</span>
               <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                 <ThumbsUp className="w-4 h-4" />
                 Útil ({review.helpful})
               </button>
             </div>
           </div>
         ))}
       </div>
 
       <div className="flex justify-center mt-6">
         <Button variant="outline">Ver todas as {totalReviews} avaliações</Button>
       </div>
     </div>
   );
 };
 
 export default ProductReviews;