import { useState } from "react";
import { ChevronDown, ChevronUp, Check, Leaf, Droplets, Sparkles, Zap, Heart, Shield, Star, TrendingUp, X } from "lucide-react";

// Import result images
import result1 from "@/assets/results/result-1.png";
import result2 from "@/assets/results/result-2.png";
import result3 from "@/assets/results/result-3.png";
import result4 from "@/assets/results/result-4.png";

const ProductDescription = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const benefits = [
    { icon: Star, text: "Recupere sua autoconfiança", highlight: true },
    { icon: Zap, text: "Crescimento visível em 30 dias", highlight: false },
    { icon: Shield, text: "Fios mais fortes e resistentes", highlight: false },
    { icon: Leaf, text: "100% natural e vegano", highlight: false },
  ];

  const ingredients = [
    { name: "Biotina", desc: "Fortalece e engrossa os fios", icon: "💪" },
    { name: "Pantenol", desc: "Hidratação profunda e duradoura", icon: "💧" },
    { name: "Extrato de Bambu", desc: "Rico em vitaminas A, B e C", icon: "🌿" },
    { name: "Óleo de Rícino", desc: "Estimula o crescimento capilar", icon: "🌱" },
    { name: "Keratina", desc: "Reconstrução da fibra capilar", icon: "✨" },
    { name: "Extrato de Bardana", desc: "Ação anti-inflamatória", icon: "🍃" },
    { name: "Extrato de Café", desc: "Controle da alopecia", icon: "☕" },
  ];

  const resultImages = [
    { src: result1, name: "Ana Paula", time: "45 dias" },
    { src: result2, name: "Fernanda", time: "60 dias" },
    { src: result3, name: "Juliana", time: "5 meses" },
    { src: result4, name: "Mariana", time: "90 dias" },
  ];

  return (
    <div className="border-t border-border py-10">
      {/* Header clean */}
      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
        Sobre o Kit SOS Crescimento
      </h2>
      
      {/* Benefits - design minimalista com animações */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
        {benefits.map((benefit, index) => (
          <div 
            key={index}
            className={`flex flex-col items-center text-center gap-3 p-4 rounded-xl border transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-in ${
              benefit.highlight 
                ? 'border-primary/50 bg-primary/5 hover:border-primary hover:shadow-primary/20' 
                : 'border-border bg-card hover:border-muted-foreground/30 hover:shadow-muted/30'
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={`w-11 h-11 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
              benefit.highlight ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
            }`}>
              <benefit.icon className="w-5 h-5" />
            </div>
            <span className="text-xs md:text-sm font-medium text-foreground leading-tight">
              {benefit.text}
            </span>
          </div>
        ))}
      </div>

      {/* Description content */}
      <div className={`space-y-8 ${!isExpanded ? "line-clamp-4" : ""}`}>
        {/* Intro focado em autoestima */}
        <div className="space-y-4">
          <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Você merece se olhar no espelho e amar o que vê.</strong> Sabemos como a queda de cabelo pode afetar sua autoestima e confiança. O medo de passar a mão nos fios, a insegurança ao sair de casa, a frustração de ver cada vez menos volume...
          </p>
          <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
            O <strong className="text-foreground">Kit SOS Crescimento</strong> foi criado para devolver não apenas seus cabelos, mas sua <strong className="text-foreground">confiança e autoestima</strong>. Com ingredientes 100% naturais e fitoterápicos, nosso tratamento completo ataca a queda na raiz e estimula o crescimento de fios novos, mais fortes e saudáveis.
          </p>
          <p className="text-base md:text-lg leading-relaxed text-primary font-medium">
            ✨ Mais de 10.000 mulheres já recuperaram a confiança com o Kit SOS. Agora é a sua vez.
          </p>
        </div>

        {/* Cards dos produtos - clean design */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { 
              icon: Droplets, 
              title: "Shampoo", 
              size: "300ml",
              items: ["Limpeza profunda do couro", "Ação antioxidante", "Rejuvenescimento dos fios"],
              featured: false
            },
            { 
              icon: Heart, 
              title: "Máscara", 
              size: "300g",
              items: ["Força e resistência", "Nutrição profunda", "Recupera maciez e brilho"],
              featured: false
            },
            { 
              icon: Sparkles, 
              title: "Tônico", 
              size: "100ml",
              items: ["Fortalece a raiz", "Estimula crescimento", "Reduz oleosidade"],
              featured: true
            },
          ].map((product, index) => (
            <div 
              key={index} 
              className={`p-5 rounded-xl border ${
                product.featured 
                  ? 'border-primary/40 bg-primary/5' 
                  : 'border-border bg-card'
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                  product.featured ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                }`}>
                  <product.icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{product.title}</h4>
                  <span className="text-xs text-muted-foreground">{product.size}</span>
                </div>
                {product.featured && (
                  <span className="ml-auto text-xs font-medium text-primary">Destaque</span>
                )}
              </div>
              <ul className="space-y-2">
                {product.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {isExpanded && (
          <>
            {/* Modo de Uso - clean */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-5">Modo de Uso</h3>
              
              <div className="space-y-4">
                {[
                  { step: "1", title: "Shampoo", desc: "Aplique sobre os cabelos molhados, massageie o couro cabeludo e enxágue." },
                  { step: "2", title: "Máscara", desc: "Aplique nos cabelos úmidos, penteie e deixe agir 5-20 minutos." },
                  { step: "3", title: "Tônico", desc: "Borrife na raiz e extensão. Use diariamente para melhores resultados." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <span className="w-7 h-7 rounded-full bg-muted text-muted-foreground font-medium flex items-center justify-center flex-shrink-0 text-sm">
                      {item.step}
                    </span>
                    <div className="text-sm">
                      <strong className="text-foreground">{item.title}:</strong>{" "}
                      <span className="text-muted-foreground">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <p className="mt-5 pt-4 border-t border-border text-sm text-muted-foreground">
                💡 <strong className="text-foreground">Dica:</strong> Use o kit 3x por semana e o tônico diariamente.
              </p>
            </div>

            {/* Ativos - grid com descrições */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4">Ativos Poderosos</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {ingredients.map((ingredient, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 border border-border/50 hover:border-primary/30 transition-colors"
                  >
                    <span className="text-lg flex-shrink-0">{ingredient.icon}</span>
                    <div className="min-w-0">
                      <p className="font-medium text-foreground text-sm">{ingredient.name}</p>
                      <p className="text-xs text-muted-foreground leading-snug">{ingredient.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Results Gallery */}
            <div className="mt-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Pessoas reais, resultados reais!</h3>
                  <p className="text-sm text-muted-foreground">Veja a transformação de quem já usou</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {resultImages.map((result, index) => (
                  <div 
                    key={index}
                    onClick={() => setSelectedImage(result.src)}
                    className="group relative cursor-pointer overflow-hidden rounded-xl border-2 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
                  >
                    <div className="aspect-[3/4] overflow-hidden">
                      <img 
                        src={result.src} 
                        alt={`Resultado de ${result.name}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-white font-medium text-sm">{result.name}</p>
                      <p className="text-white/80 text-xs flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> {result.time} de uso
                      </p>
                    </div>
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Ver foto
                    </div>
                  </div>
                ))}
              </div>
              
              <p className="text-center text-xs text-muted-foreground mt-4">
                * Resultados podem variar de pessoa para pessoa. Clique nas imagens para ampliar.
              </p>
            </div>

            {/* Hair Types Section */}
            <div className="mt-10 relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/5 via-secondary/30 to-primary/10 border border-primary/20 p-6 md:p-8">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />
              
              <div className="relative">
                <div className="text-center mb-8">
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-3">
                    PARA TODOS
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground">
                    Funciona para todos os tipos de cabelo
                  </h3>
                  <p className="text-muted-foreground mt-2 text-sm">
                    Nossa fórmula foi desenvolvida para atender qualquer textura capilar
                  </p>
                </div>
                
                <div className="grid grid-cols-3 gap-4 md:gap-6">
                  {/* Liso */}
                  <div className="flex flex-col items-center text-center group">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-card border-2 border-primary/30 flex items-center justify-center mb-3 group-hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300">
                      <svg viewBox="0 0 48 48" className="w-8 h-8 md:w-10 md:h-10 text-primary">
                        <path d="M12 8 L12 40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                        <path d="M18 8 L18 40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                        <path d="M24 8 L24 40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                        <path d="M30 8 L30 40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                        <path d="M36 8 L36 40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-foreground text-sm md:text-base">Liso</h4>
                    <p className="text-xs text-muted-foreground mt-1 hidden md:block">Força e brilho intenso</p>
                  </div>
                  
                  {/* Ondulado */}
                  <div className="flex flex-col items-center text-center group">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-card border-2 border-primary/30 flex items-center justify-center mb-3 group-hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300">
                      <svg viewBox="0 0 48 48" className="w-8 h-8 md:w-10 md:h-10 text-primary">
                        <path d="M10 8 Q14 16, 10 24 Q6 32, 10 40" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                        <path d="M18 8 Q22 16, 18 24 Q14 32, 18 40" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                        <path d="M26 8 Q30 16, 26 24 Q22 32, 26 40" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                        <path d="M34 8 Q38 16, 34 24 Q30 32, 34 40" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-foreground text-sm md:text-base">Ondulado</h4>
                    <p className="text-xs text-muted-foreground mt-1 hidden md:block">Definição e volume</p>
                  </div>
                  
                  {/* Cacheado */}
                  <div className="flex flex-col items-center text-center group">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-card border-2 border-primary/30 flex items-center justify-center mb-3 group-hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300">
                      <svg viewBox="0 0 48 48" className="w-8 h-8 md:w-10 md:h-10 text-primary">
                        <path d="M10 10 Q16 10, 16 16 Q16 22, 10 22 Q4 22, 4 28 Q4 34, 10 34 Q16 34, 16 40" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                        <path d="M24 8 Q30 8, 30 14 Q30 20, 24 20 Q18 20, 18 26 Q18 32, 24 32 Q30 32, 30 38" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                        <path d="M38 10 Q44 10, 44 16 Q44 22, 38 22 Q32 22, 32 28 Q32 34, 38 34 Q44 34, 44 40" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-foreground text-sm md:text-base">Cacheado</h4>
                    <p className="text-xs text-muted-foreground mt-1 hidden md:block">Hidratação e cachos definidos</p>
                  </div>
                </div>
                
                <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-primary" />
                  <span>Testado e aprovado em todos os tipos de fio</span>
                </div>
              </div>
            </div>

          </>
        )}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-8 h-8" />
          </button>
          <img 
            src={selectedImage} 
            alt="Resultado ampliado"
            className="max-w-full max-h-[90vh] object-contain rounded-lg animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 mt-8 text-primary font-medium text-sm hover:underline"
      >
        {isExpanded ? (
          <>
            Ver menos <ChevronUp className="w-4 h-4" />
          </>
        ) : (
          <>
            Ver modo de uso e ingredientes <ChevronDown className="w-4 h-4" />
          </>
        )}
      </button>
    </div>
  );
};

export default ProductDescription;
