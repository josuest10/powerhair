import { Star, ThumbsUp, CheckCircle, X, ZoomIn } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import review1 from "@/assets/reviews/review-1.png";
import review2 from "@/assets/reviews/review-2.png";
import review3 from "@/assets/reviews/review-3.png";
import review4 from "@/assets/reviews/review-4.png";
import review5 from "@/assets/reviews/review-5.png";
import review6 from "@/assets/reviews/review-6.png";
import review7 from "@/assets/reviews/review-7.png";
import review8 from "@/assets/reviews/review-8.png";
import review9 from "@/assets/reviews/review-9.png";
import review10 from "@/assets/reviews/review-10.png";
import review11 from "@/assets/reviews/review-11.png";

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
    author: "Camila R.",
    rating: 5,
    date: "02/02/2026",
    title: "Resultado incrível em 30 dias!",
    content: "Estava com muita queda de cabelo e decidi testar esse kit. Em 30 dias de uso correto (shampoo, máscara e tônico diariamente), meus cabelos pararam de cair e já vejo fios novos nascendo! O tônico é essencial, uso todo dia na raiz. Super recomendo!",
    helpful: 156,
    verified: true,
    image: review1,
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
    image: review2,
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
    image: review3,
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
    image: review4,
  },
  {
    id: 5,
    author: "Juliana Costa",
    rating: 5,
    date: "05/01/2026",
    title: "Meu cabelo nunca esteve tão hidratado!",
    content: "A hidratação que a máscara proporciona é incrível! Meus fios estavam muito ressecados e quebradiços. Depois de 3 semanas usando o kit, a diferença é visível. Os fios estão macios, brilhantes e com muito menos frizz.",
    helpful: 52,
    verified: true,
    image: review5,
  },
  {
    id: 6,
    author: "Marcos Oliveira",
    rating: 5,
    date: "02/01/2026",
    title: "Recuperação dos fios danificados",
    content: "Tinha feito progressiva e meu cabelo estava destruído. Esse kit literalmente recuperou meus fios! A combinação dos três produtos é perfeita. O shampoo limpa sem agredir, a máscara nutre profundamente e o tônico fortalece da raiz.",
    helpful: 78,
    verified: true,
    image: review6,
  },
  {
    id: 7,
    author: "Patricia Lima",
    rating: 5,
    date: "28/12/2025",
    title: "Antiqueda que realmente funciona!",
    content: "Já tentei vários produtos antiqueda e nenhum funcionou como esse. Em 6 semanas minha escova parou de ficar cheia de cabelo. O tônico faz toda diferença! Uso religiosamente todos os dias e os resultados são impressionantes.",
    helpful: 91,
    verified: true,
    image: review7,
  },
  {
    id: 8,
    author: "Carla Mendes",
    rating: 4,
    date: "22/12/2025",
    title: "Muito bom, só demora um pouco",
    content: "O produto é excelente, mas precisa de paciência. Vi resultados reais só depois de 45 dias de uso contínuo. Agora meu cabelo está muito mais forte e volumoso. A hidratação é nota 10! Recomendo para quem tem persistência.",
    helpful: 34,
    verified: true,
    image: review8,
  },
  {
    id: 9,
    author: "Lucas Ferreira",
    rating: 5,
    date: "18/12/2025",
    title: "Salvou meu cabelo da calvície!",
    content: "Estava perdendo cabelo nas entradas e já estava me conformando. Minha esposa comprou esse kit e insistiu para eu usar. Depois de 3 meses, os fios estão nascendo novamente! Não acreditava em produtos assim, mas esse funciona de verdade.",
    helpful: 145,
    verified: true,
    image: review9,
  },
  {
    id: 10,
    author: "Beatriz Santos",
    rating: 5,
    date: "15/12/2025",
    title: "Hidratação profunda que dura dias!",
    content: "A máscara é um sonho! Meu cabelo fica hidratado por dias. Uso o kit 3x por semana como recomendado e o tônico diariamente. Meus fios nunca estiveram tão saudáveis. O investimento vale muito a pena!",
    helpful: 67,
    verified: true,
    image: review10,
  },
  {
    id: 11,
    author: "Renata Alves",
    rating: 5,
    date: "10/12/2025",
    title: "Resultado surpreendente!",
    content: "Comprei sem muita expectativa porque já tinha tentado vários produtos. Em 1 mês meu cabelo já mostrou sinais de recuperação. Agora com 2 meses de uso, a queda diminuiu 90% e os fios estão muito mais grossos. Impressionada!",
    helpful: 89,
    verified: true,
    image: review11,
  },
  {
    id: 12,
    author: "Amanda Rodrigues",
    rating: 5,
    date: "05/12/2025",
    title: "Perfeito para cabelos finos!",
    content: "Tenho cabelo muito fino e com tendência a queda. Esse kit deu volume e força aos meus fios. O tônico não pesa e não deixa oleoso. A combinação dos três produtos é ideal. Já estou no terceiro kit e não largo mais!",
    helpful: 56,
    verified: true,
  },
  {
    id: 13,
    author: "Gabriel Nunes",
    rating: 5,
    date: "01/12/2025",
    title: "Produto profissional de verdade!",
    content: "Trabalho como cabeleireiro e indico esse kit para todos os meus clientes com queda. Os resultados são consistentes em todos que usam corretamente. A formulação é de qualidade profissional. Melhor custo-benefício do mercado!",
    helpful: 201,
    verified: true,
  },
  {
    id: 14,
    author: "Isabela Martins",
    rating: 5,
    date: "28/11/2025",
    title: "Minha autoestima voltou!",
    content: "Estava muito triste com a queda de cabelo pós-covid. Esse kit me devolveu a autoestima! Em 2 meses de uso, meu cabelo está renascendo. Os fios novos são fortes e saudáveis. Muito grata por ter encontrado esse produto!",
    helpful: 112,
    verified: true,
  },
  {
    id: 15,
    author: "Thiago Souza",
    rating: 4,
    date: "25/11/2025",
    title: "Bom produto, entrega rápida!",
    content: "Produto chegou antes do prazo e bem embalado. Estou usando há 3 semanas e já noto diferença na queda. O cheiro é agradável e o tônico não irrita o couro cabeludo. Só dou 4 estrelas porque ainda estou no início do tratamento.",
    helpful: 28,
    verified: true,
  },
  {
    id: 16,
    author: "Marina Lopes",
    rating: 5,
    date: "20/11/2025",
    title: "Hidratação + crescimento = perfeição!",
    content: "Queria um produto que hidratasse E ajudasse no crescimento. Esse kit faz os dois! Meu cabelo está crescendo mais rápido e super hidratado. A máscara é muito potente, deixa os fios sedosos. Recomendo demais!",
    helpful: 73,
    verified: true,
  },
  {
    id: 17,
    author: "Rafael Costa",
    rating: 5,
    date: "15/11/2025",
    title: "Finalmente um produto que funciona!",
    content: "Homem aqui! Depois de gastar fortunas em tratamentos caros, encontrei esse kit e foi a melhor decisão. Minha queda era severa e agora está controlada. Os fios estão mais grossos e resistentes. Não troco por nada!",
    helpful: 134,
    verified: true,
  },
  {
    id: 18,
    author: "Letícia Pereira",
    rating: 5,
    date: "10/11/2025",
    title: "Cabelo de comercial!",
    content: "Parece exagero, mas meu cabelo está parecendo de comercial! A combinação do shampoo suave com a máscara potente e o tônico fortalecedor é perfeita. Estou recebendo muitos elogios. Vale cada centavo investido!",
    helpful: 95,
    verified: true,
  },
  {
    id: 19,
    author: "Eduardo Almeida",
    rating: 5,
    date: "05/11/2025",
    title: "Recomendo para toda família!",
    content: "Comprei pra mim e minha esposa também quis usar. Agora a família toda usa! Cada um com seu problema: eu queda, ela ressecamento. Os dois problemas resolvidos com o mesmo kit. Custo-benefício excelente!",
    helpful: 88,
    verified: true,
  },
  {
    id: 20,
    author: "Vanessa Ribeiro",
    rating: 5,
    date: "01/11/2025",
    title: "Transformação completa!",
    content: "Meu cabelo passou por uma transformação completa. Era fraco, fino e caía muito. Hoje está forte, volumoso e a queda é mínima. O segredo é usar o kit certinho: shampoo e máscara 3x por semana e tônico todos os dias. Funciona!",
    helpful: 167,
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
  const [visibleReviews, setVisibleReviews] = useState(4);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  const showMoreReviews = () => {
    setVisibleReviews(prev => Math.min(prev + 4, reviews.length));
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
        {/* Overall Rating */}
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

        {/* Rating Distribution */}
        <div className="space-y-1.5">
          {ratingDistribution.map((item) => (
            <div key={item.stars} className="flex items-center gap-2 text-xs">
              <span className="text-muted-foreground w-6 text-right">
                {item.stars}★
              </span>
              <Progress value={item.percentage} className="flex-1 h-2" />
              <span className="text-muted-foreground w-8">{item.count}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center justify-center gap-3">
          <p className="text-xs text-muted-foreground text-center">Comprou este produto?</p>
          <Button variant="outline" size="sm">Escrever avaliação</Button>
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

            {/* Review image thumbnail */}
            {review.image && (
              <div className="mb-3">
                <button 
                  onClick={() => setExpandedImage(review.image!)}
                  className="relative group"
                >
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

      {/* Show More/Less Buttons */}
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

export default ProductReviews;
