import { useState } from "react";
import { Check, Sparkles, X } from "lucide-react";

import resultAntes from "@/assets/results/result-antes.png";
import resultDepois from "@/assets/results/result-depois.png";

const ProductDescription = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const resultImages = [
    { src: resultAntes, label: "Antes" },
    { src: resultDepois, label: "Depois" },
  ];

  return (
    <div className="border-t border-border py-10 space-y-12">
      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-white/80 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <img 
            src={selectedImage} 
            alt="Resultado ampliado"
            className="max-w-full max-h-[90vh] rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Hero Section */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          HIDRATAÇÃO INTENSA QUE SUAVIZA ESTRIAS E TRANSFORMA SUA PELE
        </h2>
      </div>

      {/* Benefits List */}
      <div className="max-w-2xl mx-auto space-y-3">
        {[
          { emoji: "✨", text: "Hidratação intensa e duradoura — pele macia o dia todo" },
          { emoji: "🌿", text: "Fórmula com Algisium C, Óleo de Rosa Mosqueta, Pantenol e Vitamina E" },
          { emoji: "💧", text: "Toque sedoso e confortável — sem pegajosidade" },
          { emoji: "🌟", text: "Melhora a textura e uniformidade da pele com uso contínuo" },
          { emoji: "🧴", text: "Embalagem de 200g — rendimento para protocolo completo" },
          { emoji: "💛", text: "100% natural — sem parabenos, corantes artificiais ou corticoides" },
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-3 text-base md:text-lg text-muted-foreground">
            <span className="text-xl flex-shrink-0">{item.emoji}</span>
            <span>{item.text}</span>
          </div>
        ))}
      </div>

      {/* Emotional Section */}
      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 md:p-8 max-w-2xl mx-auto">
        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">
          Porque sua pele merece cuidado de verdade
        </h3>
        <p className="text-base text-muted-foreground leading-relaxed mb-4">
          Sabemos como as estrias podem afetar sua autoestima. A insegurança ao olhar no espelho, evitar certas roupas, a frustração de tentar produtos que não funcionam...
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          O <strong className="text-foreground">Lummina Gest</strong> foi desenvolvido para devolver não apenas a saúde da sua pele, mas sua <strong className="text-foreground">confiança e autoestima</strong>. Com Algisium C aliado a óleos e vitaminas, nosso dermocosmético entrega hidratação prolongada e nutrição profunda, ajudando a suavizar a aparência das estrias.
        </p>
        <p className="text-base text-primary font-medium mt-4">
          ✨ Mais de 10.000 mulheres já recuperaram a confiança com o Lummina Gest.
        </p>
      </div>

      {/* Results Gallery - Before/After */}
      <div className="space-y-6">
        <h3 className="text-xl md:text-2xl font-bold text-foreground text-center">
          💬 Resultados reais de quem já usou:
        </h3>
        
        <div className="grid grid-cols-2 gap-3 max-w-2xl mx-auto">
          {resultImages.map((result, index) => (
            <div 
              key={index}
              onClick={() => setSelectedImage(result.src)}
              className="group relative cursor-pointer overflow-hidden rounded-xl border-2 border-border hover:border-primary/50 transition-all duration-300"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img 
                  src={result.src} 
                  alt={result.label}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                <p className="text-white font-bold text-sm flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> {result.label}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <p className="text-center text-xs text-muted-foreground">
          * Resultados podem variar de pessoa para pessoa.
        </p>
      </div>

      {/* The truth about traditional creams */}
      <div className="max-w-2xl mx-auto space-y-4">
        <h3 className="text-xl md:text-2xl font-bold text-foreground">
          A verdade sobre cremes tradicionais para estrias…
        </h3>
        <p className="text-base text-muted-foreground leading-relaxed">
          Muitos produtos até "dão brilho" na primeira aplicação, mas falham no que mais importa: manter hidratação por tempo suficiente e nutrir a pele de verdade.
        </p>
        <div className="space-y-2">
          {[
            "Hidratação curta que some em poucas horas",
            "Fórmulas que só \"maquiam\" o ressecamento",
            "Sensação pegajosa que incomoda e desanima o uso diário",
            "Pouca nutrição: falta de óleos e vitaminas que sustentem o cuidado",
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-base text-destructive/80">
              <X className="w-4 h-4 flex-shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* How to Use */}
      <div className="max-w-2xl mx-auto space-y-4">
        <h3 className="text-xl md:text-2xl font-bold text-foreground">
          📏 Como usar:
        </h3>
        <div className="space-y-3">
          {[
            { emoji: "🧴", text: "Prepare a pele: Com a pele seca, espalhe uma quantidade suficiente nas áreas com estrias (barriga, quadris, coxas, glúteos e seios)." },
            { emoji: "💆", text: "Massageie: Faça movimentos circulares até a absorção. A massagem melhora a sensação de maciez." },
            { emoji: "✨", text: "Use diariamente: De preferência 2x ao dia. Com o uso contínuo, a pele fica mais hidratada, uniforme e confortável." },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 text-base text-muted-foreground">
              <span className="text-xl flex-shrink-0">{item.emoji}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Perfect For Section */}
      <div className="max-w-2xl mx-auto space-y-4">
        <h3 className="text-xl md:text-2xl font-bold text-foreground">
          Perfeito para:
        </h3>
        <div className="space-y-2">
          {[
            "Quem busca hidratação prolongada e nutrição profunda",
            "Pele com estrias na barriga, coxas, glúteos ou seios",
            "Gestantes e pós-parto que desejam cuidar da pele",
            "Quem quer melhorar a textura e uniformidade da pele",
            "Quem busca um toque macio e confortável no dia a dia",
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-base text-muted-foreground">
              <Check className="w-4 h-4 text-primary flex-shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Specs */}
      <div className="max-w-2xl mx-auto space-y-4">
        <h3 className="text-xl md:text-2xl font-bold text-foreground">
          📦 Especificações:
        </h3>
        <div className="space-y-2 text-base text-muted-foreground">
          <p>🧴 <strong className="text-foreground">Produto:</strong> Lummina Gest — Creme para Estrias</p>
          <p>📦 <strong className="text-foreground">Conteúdo:</strong> 200g</p>
          <p>🧪 <strong className="text-foreground">Ingredientes:</strong> Algisium C, Óleo de Rosa Mosqueta, Pantenol, Vitamina E e agentes hidratantes</p>
          <p>🐾 <strong className="text-foreground">Indicação:</strong> Todos os tipos de pele</p>
          <p>🌿 <strong className="text-foreground">Livre de:</strong> Parabenos, Óleo Mineral, Corantes Artificiais, Corticoides</p>
        </div>
      </div>

      {/* Extras */}
      <div className="max-w-2xl mx-auto bg-muted/50 rounded-2xl p-6 space-y-3">
        <h3 className="text-lg font-bold text-foreground">🚚 Extras:</h3>
        <div className="space-y-2 text-base text-muted-foreground">
          <p>✔ Frete Grátis para todo o Brasil</p>
          <p>✔ Parcele em até 3x sem juros</p>
          <p>✔ Produto físico com envio imediato</p>
          <p>✔ Estoque Nacional</p>
          <p>✔ Garantia de satisfação de 7 dias</p>
        </div>
        <p className="text-base text-foreground font-medium pt-2">
          Chega de adiar o cuidado com sua pele. Compre agora e transforme sua autoestima! 🌿
        </p>
      </div>
    </div>
  );
};

export default ProductDescription;
