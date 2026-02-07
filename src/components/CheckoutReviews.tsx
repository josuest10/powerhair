import { Star, CheckCircle2, Quote, ThumbsUp } from "lucide-react";
import review1 from "@/assets/reviews/review-1.png";
import review2 from "@/assets/reviews/review-2.png";
import review3 from "@/assets/reviews/review-3.png";

interface Review {
  name: string;
  location: string;
  rating: number;
  text: string;
  date: string;
  verified: boolean;
  helpfulCount: number;
  image?: string;
}

const reviews: Review[] = [
  {
    name: "Ana Paula S.",
    location: "São Paulo, SP",
    rating: 5,
    text: "Meu cabelo parou de cair depois de 2 semanas usando o kit! O tônico é maravilhoso, sinto o couro cabeludo mais saudável. Super recomendo!",
    date: "15/01/2026",
    verified: true,
    helpfulCount: 47,
    image: review1,
  },
  {
    name: "Carla M.",
    location: "Rio de Janeiro, RJ",
    rating: 5,
    text: "Produto excelente! Meu cabelo está mais forte e brilhante. A máscara deixa os fios super macios. Entrega foi super rápida, chegou antes do prazo.",
    date: "12/01/2026",
    verified: true,
    helpfulCount: 32,
    image: review2,
  },
  {
    name: "Fernanda L.",
    location: "Belo Horizonte, MG",
    rating: 5,
    text: "Já é o terceiro kit que compro. Resultado incrível no crescimento capilar! Minha família toda já usa. Virou item obrigatório aqui em casa.",
    date: "08/01/2026",
    verified: true,
    helpfulCount: 28,
    image: review3,
  },
];

// Generate initials from name
const getInitials = (name: string) => {
  const parts = name.split(" ");
  return parts.length > 1 
    ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
    : parts[0].slice(0, 2).toUpperCase();
};

// Generate a consistent color based on name
const getAvatarColor = (name: string) => {
  const colors = [
    "bg-rose-500",
    "bg-violet-500", 
    "bg-blue-500",
    "bg-emerald-500",
    "bg-amber-500",
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
};

const CheckoutReviews = () => {
  return (
    <div className="space-y-4">
      {/* Summary header */}
      <div className="flex items-center justify-between pb-3 border-b border-border">
        <div>
          <h3 className="text-base font-semibold text-foreground">Avaliações de Clientes</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Baseado em +2.500 avaliações verificadas</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-rating text-rating" />
            ))}
          </div>
          <span className="text-lg font-bold text-foreground">4.9</span>
        </div>
      </div>
      
      {/* Reviews list */}
      <div className="space-y-4 pt-2">
        {reviews.map((review, index) => (
          <div 
            key={index} 
            className="relative bg-secondary/30 rounded-xl p-4 border border-border/50"
          >
            {/* Quote icon */}
            <Quote className="absolute top-3 right-3 w-5 h-5 text-primary/20" />
            
            {/* Header with avatar */}
            <div className="flex items-start gap-3 mb-3">
              <div className={`w-10 h-10 rounded-full ${getAvatarColor(review.name)} flex items-center justify-center text-white text-sm font-semibold flex-shrink-0`}>
                {getInitials(review.name)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-semibold text-foreground">{review.name}</span>
                  {review.verified && (
                    <span className="flex items-center gap-1 text-[10px] text-primary bg-primary/10 px-1.5 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3" />
                      Verificada
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-muted-foreground">{review.location}</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{review.date}</span>
                </div>
              </div>
            </div>
            
            {/* Stars */}
            <div className="flex items-center gap-0.5 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${i < review.rating ? "fill-rating text-rating" : "text-border"}`}
                />
              ))}
            </div>
            
            {/* Review text */}
            <p className="text-sm text-foreground/80 leading-relaxed">{review.text}</p>
            
            {/* Review image */}
            {review.image && (
              <div className="mt-3">
                <img 
                  src={review.image} 
                  alt={`Resultado de ${review.name}`}
                  className="w-full max-w-[200px] h-auto rounded-lg border border-border/50"
                />
              </div>
            )}
            
            {/* Helpful count */}
            <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-border/50">
              <ThumbsUp className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                {review.helpfulCount} pessoas acharam útil
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckoutReviews;
