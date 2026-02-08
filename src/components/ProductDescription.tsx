import { useState } from "react";
import { ChevronDown, ChevronUp, Check, Leaf, Droplets, Sparkles, Zap, Heart, Shield, HelpCircle } from "lucide-react";

const ProductDescription = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const benefits = [
    { icon: Zap, text: "Crescimento acelerado em 30 dias", highlight: true },
    { icon: Shield, text: "Combate queda e fortalece", highlight: false },
    { icon: Droplets, text: "Tratamento fitoterápico natural", highlight: false },
    { icon: Leaf, text: "Não testado em animais", highlight: false },
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

  return (
    <div className="border-t border-border py-10">
      {/* Header clean */}
      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
        Sobre o Kit SOS Crescimento
      </h2>
      
      {/* Benefits - design minimalista */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
        {benefits.map((benefit, index) => (
          <div 
            key={index}
            className={`flex flex-col items-center text-center gap-3 p-4 rounded-xl border transition-all ${
              benefit.highlight 
                ? 'border-primary/50 bg-primary/5' 
                : 'border-border bg-card hover:border-muted-foreground/20'
            }`}
          >
            <div className={`w-11 h-11 rounded-full flex items-center justify-center ${
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
        {/* Intro simples */}
        <p className="text-base md:text-lg leading-relaxed text-muted-foreground">
          O <strong className="text-foreground">Kit SOS Crescimento</strong> é a solução completa para acelerar o crescimento e combater a queda. Tratamento 100% fitoterápico e natural.
        </p>

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

            {/* FAQ - clean */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-5">Perguntas Frequentes</h3>
              
              <div className="space-y-4">
                {[
                  { q: "Qual a principal função do kit SOS?", a: "Fortalecer fios fracos, diminuir queda e promover crescimento acelerado com fios mais espessos." },
                  { q: "Em quanto tempo vejo resultados?", a: "Fortalecimento já na 1ª aplicação. Para crescimento visível, use por no mínimo 30 dias." },
                  { q: "Serve para homem?", a: "Sim! O kit é unissex e serve para todos os tipos de cabelo." },
                ].map((item, i) => (
                  <div key={i} className="pb-4 border-b border-border last:border-0 last:pb-0">
                    <p className="font-medium text-foreground mb-1">{item.q}</p>
                    <p className="text-sm text-muted-foreground">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

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
