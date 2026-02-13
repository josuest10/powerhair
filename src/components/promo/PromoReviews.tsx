import { Star, ThumbsUp, CheckCircle, X, ZoomIn } from "lucide-react";
import { useState } from "react";
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
  image?: string;
}

const reviews: Review[] = [
  {
    id: 1,
    author: "Eduarda Pereira",
    rating: 5,
    date: "22/01/2026",
    title: "Resultado ótimo com Lummina Gest",
    content: "Fiquei impressionada com a qualidade. Não irritou minha pele e deixou um acabamento muito bom. A sensação é de cuidado e conforto, bem suave. Minhas estrias ficaram visivelmente mais claras após 30 dias de uso.",
    helpful: 89,
    verified: true,
    image: "https://lummibrazil.com.br/cdn/shop/files/Generated_Image_October_28_2025_-_10_02AM.png?v=1764790053&width=1024",
  },
  {
    id: 2,
    author: "Mariana Ribeiro",
    rating: 5,
    date: "22/01/2026",
    title: "Surpreendente: Lummina Gest",
    content: "Já está na minha rotina. Resultado consistente e sensação muito confortável na pele. Compraria novamente. A hidratação dura o dia inteiro e não fica pegajoso, o que faz toda diferença pra quem usa diariamente.",
    helpful: 76,
    verified: true,
    image: "https://lummibrazil.com.br/cdn/shop/files/Generated_Image_October_28_2025_-_10_04AM.png?v=1764790053&width=1024",
  },
  {
    id: 3,
    author: "Matheus Santos",
    rating: 5,
    date: "20/01/2026",
    title: "Lummina Gest virou meu favorito",
    content: "Simplesmente perfeito. A sensação depois de usar é de pele mais macia e bem tratada. Recomendo demais. Uso na barriga e nas coxas e a textura da pele melhorou muito.",
    helpful: 64,
    verified: true,
  },
  {
    id: 4,
    author: "Caio Oliveira",
    rating: 5,
    date: "20/01/2026",
    title: "Recomendo muito o Lummina Gest",
    content: "Já virei fã. A embalagem é prática, o produto é excelente e o efeito é consistente. A pele fica nutrida e com viço natural. Minha esposa também começou a usar e adorou!",
    helpful: 52,
    verified: true,
  },
  {
    id: 5,
    author: "Juliana M.",
    rating: 5,
    date: "18/01/2026",
    title: "Eu amei muito!",
    content: "Minha pele estava muito ressecada e isso realçava as estrias. Com o Lummina Gest, senti a hidratação durar bem mais e o toque ficou bem mais lisinho. A textura melhorou bastante nas coxas e na barriga.",
    helpful: 98,
    verified: true,
    image: "https://lummibrazil.com.br/cdn/shop/files/Generated_Image_October_28_2025_-_10_01AM_1.png?v=1764790053&width=1024",
  },
  {
    id: 6,
    author: "Rafaela T.",
    rating: 5,
    date: "15/01/2026",
    title: "Nota 10!",
    content: "O que me ganhou foi não ficar grudando. Uso todo dia depois do banho e a pele fica confortável, com um viço bonito. Ajuda muito na aparência geral das estrias.",
    helpful: 67,
    verified: true,
    image: "https://lummibrazil.com.br/cdn/shop/files/Generated_Image_October_28_2025_-_10_01AM.png?v=1764790053&width=1024",
  },
  {
    id: 7,
    author: "Camila A.",
    rating: 5,
    date: "12/01/2026",
    title: "Qualidade absurda",
    content: "Eu queria algo focado em estrias, mas que fosse hidratante de verdade. A textura da pele melhorou e ficou mais uniforme, principalmente nas coxas. Não troco por nenhum outro creme!",
    helpful: 81,
    verified: true,
  },
  {
    id: 8,
    author: "Bianca R.",
    rating: 5,
    date: "10/01/2026",
    title: "Hidratação inteligente",
    content: "Já testei vários cremes que somem rápido. Esse segura a hidratação e deixa a pele bem macia. No dia a dia, dá outra confiança pra usar short e biquíni. Recomendo muito!",
    helpful: 73,
    verified: true,
  },
  {
    id: 9,
    author: "João Dias",
    rating: 5,
    date: "08/01/2026",
    title: "Lummina Gest entrega demais",
    content: "Simplesmente perfeito. A sensação depois de usar é de pele mais macia e bem tratada. Recomendo demais. Uso todos os dias e a diferença é visível.",
    helpful: 45,
    verified: true,
  },
  {
    id: 10,
    author: "Fernanda Costa",
    rating: 5,
    date: "05/01/2026",
    title: "Melhor creme que já usei",
    content: "Estou no segundo pote e a diferença na minha pele é absurda. As estrias estão mais claras, a pele está super hidratada e macia. A fórmula é muito boa, sem cheiro forte e absorve rápido.",
    helpful: 112,
    verified: true,
  },
  {
    id: 11,
    author: "Patrícia Lima",
    rating: 4,
    date: "02/01/2026",
    title: "Bom, mas precisa de constância",
    content: "O produto é excelente, mas é preciso usar todos os dias para ver resultado. Depois de 45 dias de uso contínuo, as estrias ficaram menos visíveis e a pele mais macia. Vale o investimento!",
    helpful: 38,
    verified: true,
  },
  {
    id: 12,
    author: "Amanda Rodrigues",
    rating: 5,
    date: "28/12/2025",
    title: "Pele renovada!",
    content: "Minha pele nunca esteve tão bem cuidada. O Lummina Gest hidrata profundamente sem deixar aquela sensação oleosa. Uso na barriga pós-parto e os resultados são incríveis.",
    helpful: 95,
    verified: true,
  },
  {
    id: 13,
    author: "Carolina Mendes",
    rating: 5,
    date: "25/12/2025",
    title: "Super indico!",
    content: "Comprei com receio mas me surpreendi. A textura do creme é perfeita, absorve rápido e hidrata por horas. As estrias nas coxas melhoraram muito em 1 mês de uso.",
    helpful: 67,
    verified: true,
  },
  {
    id: 14,
    author: "Lucas Ferreira",
    rating: 5,
    date: "20/12/2025",
    title: "Minha esposa amou!",
    content: "Comprei de presente pra minha esposa que estava incomodada com as estrias da gravidez. Ela usa há 2 meses e está muito feliz com os resultados. Pele macia e estrias mais claras!",
    helpful: 134,
    verified: true,
  },
  {
    id: 15,
    author: "Isabela Martins",
    rating: 5,
    date: "15/12/2025",
    title: "Minha autoestima voltou!",
    content: "As estrias me incomodavam muito e eu evitava usar roupas curtas. Com o Lummina Gest, a pele melhorou tanto que voltei a me sentir confiante. Uso diariamente e os resultados são reais!",
    helpful: 156,
    verified: true,
  },
];

const ratingDistribution = [
  { stars: 5, percentage: 95, count: 19 },
  { stars: 4, percentage: 5, count: 1 },
  { stars: 3, percentage: 0, count: 0 },
  { stars: 2, percentage: 0, count: 0 },
  { stars: 1, percentage: 0, count: 0 },
];

const PromoReviews = () => {
  const averageRating = 5.0;
  const totalReviews = 20;
  const [visibleReviews, setVisibleReviews] = useState(4);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  const showMoreReviews = () => {
    setVisibleReviews((prev) => Math.min(prev + 4, reviews.length));
  };

  const showLessReviews = () => {
    setVisibleReviews(4);
  };

  return (
    <div className="border-t border-border py-8">
      {/* Image Modal */}
      {expandedImage && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setExpandedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-white/80 transition-colors"
            onClick={() => setExpandedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={expandedImage}
            alt="Resultado ampliado"
            className="max-w-full max-h-[90vh] rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <h2 className="text-xl font-semibold text-foreground mb-6">Avaliações dos clientes</h2>

      {/* Rating Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 p-5 bg-secondary rounded-lg">
        <div className="text-center md:border-r border-border">
          <div className="text-4xl font-bold text-foreground">{averageRating}</div>
          <div className="flex justify-center gap-0.5 my-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < Math.round(averageRating) ? "fill-rating text-rating" : "text-border"}`}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground">{totalReviews} avaliações</p>
        </div>

        <div className="space-y-1.5">
          {ratingDistribution.map((item) => (
            <div key={item.stars} className="flex items-center gap-2 text-xs">
              <span className="text-muted-foreground w-6 text-right">{item.stars}★</span>
              <Progress value={item.percentage} className="flex-1 h-2" />
              <span className="text-muted-foreground w-8">{item.count}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-center gap-3">
          <p className="text-xs text-muted-foreground text-center">Comprou este produto?</p>
          <Button variant="outline" size="sm">
            Escrever avaliação
          </Button>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.slice(0, visibleReviews).map((review) => (
          <div key={review.id} className="border-b border-border pb-5 last:border-b-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${i < review.rating ? "fill-rating text-rating" : "text-border"}`}
                      />
                    ))}
                  </div>
                  {review.verified && (
                    <span className="flex items-center gap-1 text-xs text-primary">
                      <CheckCircle className="w-3 h-3" />
                      Compra Verificada
                    </span>
                  )}
                </div>
                <h4 className="font-medium text-foreground text-sm">{review.title}</h4>
              </div>
              <span className="text-xs text-muted-foreground">{review.date}</span>
            </div>

            <p className="text-sm text-muted-foreground mb-3">{review.content}</p>

            {review.image && (
              <div className="mb-3">
                <button onClick={() => setExpandedImage(review.image!)} className="relative group">
                  <img
                    src={review.image}
                    alt={`Resultado de ${review.author}`}
                    className="w-20 h-20 object-cover rounded-lg border border-border transition-opacity group-hover:opacity-80"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-5 h-5 text-white drop-shadow-lg" />
                  </div>
                </button>
              </div>
            )}

            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{review.author}</span>
              <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
                <ThumbsUp className="w-3 h-3" />
                Útil ({review.helpful})
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Show More/Less */}
      <div className="flex justify-center gap-3 mt-6">
        {visibleReviews < reviews.length && (
          <Button variant="outline" onClick={showMoreReviews}>
            Ver mais avaliações ({reviews.length - visibleReviews} restantes)
          </Button>
        )}
        {visibleReviews > 4 && (
          <Button variant="ghost" onClick={showLessReviews}>
            Mostrar menos
          </Button>
        )}
      </div>
    </div>
  );
};

export default PromoReviews;
