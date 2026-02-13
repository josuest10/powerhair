import { useState } from "react";
import { Check, Sparkles, X } from "lucide-react";

const PromoDescription = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const beforeAfterImages = [
    {
      before: "https://lummibrazil.com.br/cdn/shop/files/eqrtwgrethyjk.l.png?v=1766061781&width=2000",
      after: "https://lummibrazil.com.br/cdn/shop/files/23rt45yu6yo.png?v=1766061781&width=2000",
    },
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
            alt="Imagem ampliada"
            className="max-w-full max-h-[90vh] rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Hero Section */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          HIDRATAÇÃO INTENSA QUE SUAVIZA ESTRIAS — PELE MACIA E BEM CUIDADA!
        </h2>
      </div>

      {/* Benefits List */}
      <div className="max-w-2xl mx-auto space-y-3">
        {[
          { emoji: "💧", text: "Hidratação intensa e duradoura com Algisium C" },
          { emoji: "🌹", text: "Óleo de Rosa Mosqueta + Pantenol + Vitamina E — nutrição profunda" },
          { emoji: "✨", text: "Melhora a textura e uniformidade da pele com uso contínuo" },
          { emoji: "🧴", text: "Toque macio e sedoso, sem pegajosidade" },
          { emoji: "🚫", text: "Sem parabenos, sem óleo mineral, sem corantes artificiais e sem corticoides" },
          { emoji: "💛", text: "Ideal para barriga, quadris, coxas, glúteos e seios" },
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
          Se as estrias te incomodam no espelho, você não precisa "aceitar e pronto". O Lummina Gest foi desenvolvido para entregar hidratação prolongada e nutrição profunda, ajudando a melhorar a textura e a uniformidade da pele no dia a dia.
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          Com <strong className="text-foreground">Algisium C, óleo de rosa mosqueta, pantenol e vitamina E</strong>, ele deixa a pele mais macia, confortável e com viço — exatamente o tipo de cuidado que faz diferença na aparência das estrias com o uso contínuo.
        </p>
        <p className="text-base text-primary font-medium mt-4">
          ✨ +10 mil unidades vendidas — resultados reais comprovados.
        </p>
      </div>

      {/* Before/After */}
      <div className="space-y-6">
        <h3 className="text-xl md:text-2xl font-bold text-foreground text-center">
          💬 Resultados reais de quem já usou:
        </h3>

        <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
          <div
            onClick={() => setSelectedImage(beforeAfterImages[0].before)}
            className="cursor-pointer group relative overflow-hidden rounded-xl border-2 border-border hover:border-primary/50 transition-all"
          >
            <img
              src={beforeAfterImages[0].before}
              alt="Antes"
              className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
              <p className="text-white font-medium text-sm">Antes</p>
            </div>
          </div>
          <div
            onClick={() => setSelectedImage(beforeAfterImages[0].after)}
            className="cursor-pointer group relative overflow-hidden rounded-xl border-2 border-border hover:border-primary/50 transition-all"
          >
            <img
              src={beforeAfterImages[0].after}
              alt="Depois"
              className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
              <p className="text-white font-medium text-sm flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Depois
              </p>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          * Resultados podem variar de pessoa para pessoa.
        </p>
      </div>

      {/* Stats */}
      <div className="max-w-2xl mx-auto grid grid-cols-2 gap-4">
        <div className="bg-muted/50 rounded-xl p-5 text-center">
          <p className="text-3xl font-bold text-primary">83%</p>
          <p className="text-sm text-muted-foreground mt-1">das estrias mais clarificadas</p>
        </div>
        <div className="bg-muted/50 rounded-xl p-5 text-center">
          <p className="text-3xl font-bold text-primary">4x</p>
          <p className="text-sm text-muted-foreground mt-1">mais ativos benéficos para a pele</p>
        </div>
      </div>

      {/* How to Use */}
      <div className="max-w-2xl mx-auto space-y-4">
        <h3 className="text-xl md:text-2xl font-bold text-foreground">
          📏 Como usar:
        </h3>
        <div className="space-y-3">
          {[
            { emoji: "🧴", text: "Prepare a pele: Com a pele seca, espalhe uma quantidade suficiente nas áreas com estrias." },
            { emoji: "💆", text: "Massageie: Faça movimentos circulares até a absorção completa." },
            { emoji: "✨", text: "Use diariamente, de preferência 2x ao dia para potencializar os resultados." },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3 text-base text-muted-foreground">
              <span className="text-xl flex-shrink-0">{item.emoji}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Perfect For */}
      <div className="max-w-2xl mx-auto space-y-4">
        <h3 className="text-xl md:text-2xl font-bold text-foreground">
          Perfeito para:
        </h3>
        <div className="space-y-2">
          {[
            "Quem busca hidratação prolongada e nutrição profunda",
            "Gestantes e pós-parto que querem cuidar da pele",
            "Pele com estrias em barriga, coxas, quadris e glúteos",
            "Quem quer melhorar a textura e uniformidade da pele",
            "Quem busca um creme sem parabenos e sem pegajosidade",
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
          <p>🧴 <strong className="text-foreground">Produto:</strong> Lummina Gest — Creme para Estrias 200g</p>
          <p>📦 <strong className="text-foreground">Contém:</strong> 1 unidade de 200g</p>
          <p>🧪 <strong className="text-foreground">Ingredientes:</strong> Algisium C, Óleo de Rosa Mosqueta, Pantenol, Vitamina E</p>
          <p>🌿 <strong className="text-foreground">Livre de:</strong> Parabenos, Óleo Mineral, Corantes Artificiais, Corticoides</p>
          <p>💛 <strong className="text-foreground">Indicação:</strong> Todos os tipos de pele</p>
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

export default PromoDescription;
