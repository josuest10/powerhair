import { Star, CheckCircle2 } from "lucide-react";

interface Review {
  name: string;
  rating: number;
  text: string;
  date: string;
  verified: boolean;
}

const reviews: Review[] = [
  {
    name: "Ana Paula S.",
    rating: 5,
    text: "Meu cabelo parou de cair depois de 2 semanas usando o kit! Super recomendo.",
    date: "15/01/2026",
    verified: true,
  },
  {
    name: "Carla M.",
    rating: 5,
    text: "Produto excelente! Meu cabelo está mais forte e brilhante. Entrega foi super rápida.",
    date: "12/01/2026",
    verified: true,
  },
  {
    name: "Fernanda L.",
    rating: 5,
    text: "Já é o terceiro kit que compro. Resultado incrível no crescimento capilar!",
    date: "08/01/2026",
    verified: true,
  },
];

const CheckoutReviews = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">O que nossos clientes dizem</h3>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-rating text-rating" />
          ))}
          <span className="text-xs text-muted-foreground ml-1">4.9/5</span>
        </div>
      </div>
      
      <div className="space-y-3">
        {reviews.map((review, index) => (
          <div key={index} className="bg-secondary/50 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground">{review.name}</span>
                {review.verified && (
                  <span className="flex items-center gap-1 text-xs text-primary">
                    <CheckCircle2 className="w-3 h-3" />
                    Compra verificada
                  </span>
                )}
              </div>
              <span className="text-xs text-muted-foreground">{review.date}</span>
            </div>
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${i < review.rating ? "fill-rating text-rating" : "text-border"}`}
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground">{review.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckoutReviews;
