import { Star, ThumbsUp, CheckCircle } from "lucide-react";
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
    author: "Camila R.",
     rating: 5,
    date: "02/02/2026",
    title: "Resultado incrível em 30 dias!",
    content: "Estava com muita queda de cabelo e decidi testar esse kit. Em 30 dias de uso correto (shampoo, máscara e tônico diariamente), meus cabelos pararam de cair e já vejo fios novos nascendo! O tônico é essencial, uso todo dia na raiz. Super recomendo!",
    helpful: 156,
     verified: true,
   },
   {
     id: 2,
    author: "Roberto M.",
     rating: 5,
    date: "25/01/2026",
    title: "Funciona para homem também!",
    content: "Tinha calvície começando e estava receoso de usar. Depois de 2 meses usando o kit completo, os fios estão mais grossos e fortes. O segredo é usar o tônico diariamente direto no couro cabeludo. Recomendo para homens que estão com queda!",
    helpful: 98,
     verified: true,
   },
   {
     id: 3,
    author: "Ana Paula",
    rating: 5,
    date: "18/01/2026",
    title: "Melhor investimento que fiz!",
    content: "Depois da gravidez meu cabelo caía muito. Esse kit salvou meu cabelo! A máscara deixa os fios muito macios e o tônico tem cheiro agradável sem deixar oleoso. Em 1 mês já vi diferença absurda. Frete grátis foi um bônus!",
    helpful: 87,
     verified: true,
   },
   {
     id: 4,
    author: "Fernanda S.",
     rating: 5,
    date: "10/01/2026",
    title: "Crescimento acelerado real!",
    content: "Estava querendo deixar o cabelo crescer e esse kit acelerou muito o processo. Meus colegas já comentaram a diferença em menos de 2 meses! O shampoo limpa muito bem e a máscara é super nutritiva. Já comprei o segundo kit.",
    helpful: 64,
     verified: true,
   },
 ];
 
 const ratingDistribution = [
  { stars: 5, percentage: 92, count: 779 },
  { stars: 4, percentage: 5, count: 42 },
  { stars: 3, percentage: 2, count: 17 },
  { stars: 2, percentage: 1, count: 6 },
  { stars: 1, percentage: 0, count: 3 },
 ];
 
 const ProductReviews = () => {
  const averageRating = 4.9;
  const totalReviews = 847;
 
   return (
     <div className="border-t border-border py-8">
      <h2 className="text-2xl font-bold text-foreground mb-6">O que nossos clientes dizem</h2>
 
       {/* Rating Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 p-6 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl border border-primary/20">
         {/* Overall Rating */}
        <div className="text-center md:border-r border-primary/20">
          <div className="text-6xl font-bold text-foreground">{averageRating}</div>
          <div className="flex justify-center gap-1 my-3">
             {[...Array(5)].map((_, i) => (
               <Star
                 key={i}
                className={`w-6 h-6 ${i < Math.round(averageRating) ? "fill-rating text-rating" : "text-border"}`}
               />
             ))}
           </div>
          <p className="text-sm text-muted-foreground">Baseado em <strong className="text-foreground">{totalReviews}</strong> avaliações</p>
          <p className="text-xs text-success font-medium mt-1">98% recomendam este produto</p>
         </div>
 
         {/* Rating Distribution */}
        <div className="space-y-3">
           {ratingDistribution.map((item) => (
             <div key={item.stars} className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground w-8 flex items-center gap-1">
                {item.stars} <Star className="w-3 h-3 fill-rating text-rating" />
              </span>
              <Progress value={item.percentage} className="flex-1 h-3" />
              <span className="text-sm text-muted-foreground w-14 text-right">({item.count})</span>
             </div>
           ))}
         </div>
 
         {/* CTA */}
         <div className="flex flex-col items-center justify-center gap-3">
          <p className="text-sm text-muted-foreground text-center">Já comprou este produto?</p>
          <Button variant="outline" className="w-full max-w-[200px] rounded-xl">
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
                    <span className="flex items-center gap-1 text-xs bg-success/10 text-success font-medium px-2 py-0.5 rounded-full">
                       <CheckCircle className="w-3 h-3" />
                      Compra Verificada
                     </span>
                   )}
                 </div>
                 <h4 className="font-medium text-foreground">{review.title}</h4>
               </div>
               <span className="text-sm text-muted-foreground">{review.date}</span>
             </div>
 
             <p className="text-muted-foreground mb-3">{review.content}</p>
 
             <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground font-medium">Por {review.author}</span>
              <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                 <ThumbsUp className="w-4 h-4" />
                 Útil ({review.helpful})
               </button>
             </div>
           </div>
         ))}
       </div>
 
       <div className="flex justify-center mt-6">
        <Button variant="outline" className="rounded-xl">Ver todas as {totalReviews} avaliações</Button>
       </div>
     </div>
   );
 };
 
 export default ProductReviews;