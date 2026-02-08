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
    { name: "Biotina", desc: "Cabelos fortes e espessos" },
    { name: "Pantenol", desc: "Hidratação profunda" },
    { name: "Extrato de Bambu", desc: "Vitaminas A, B e C" },
    { name: "Óleo de Rícino", desc: "Estimula crescimento" },
    { name: "Keratina", desc: "Reconstrução capilar" },
    { name: "Extrato de Bardana", desc: "Ação anti-inflamatória" },
    { name: "Extrato de Café", desc: "Controle da alopecia" },
  ];

  return (
    <div className="border-t border-border py-10">
      {/* Header com gradiente */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1.5 h-8 bg-gradient-to-b from-primary to-primary/50 rounded-full" />
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          Sobre o Kit SOS Crescimento
        </h2>
      </div>
      
      {/* Benefits com hover effects */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-10">
        {benefits.map((benefit, index) => (
          <div 
            key={index}
            className={`group relative flex flex-col items-center text-center gap-3 p-4 md:p-5 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${
              benefit.highlight 
                ? 'bg-gradient-to-br from-primary/15 via-primary/10 to-primary/5 border-2 border-primary shadow-md shadow-primary/10' 
                : 'bg-secondary/80 border border-border/50 hover:border-primary/30'
            }`}
          >
            <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${
              benefit.highlight 
                ? 'bg-primary shadow-lg shadow-primary/30' 
                : 'bg-primary/10'
            }`}>
              <benefit.icon className={`w-6 h-6 md:w-7 md:h-7 ${benefit.highlight ? 'text-primary-foreground' : 'text-primary'}`} />
            </div>
            <span className={`text-xs md:text-sm font-medium leading-tight ${benefit.highlight ? 'text-primary' : 'text-foreground'}`}>
              {benefit.text}
            </span>
            {benefit.highlight && (
              <div className="absolute -top-2 -right-2 px-2 py-0.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full shadow-lg">
                #1
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Description content */}
      <div className={`space-y-8 ${!isExpanded ? "line-clamp-4" : ""}`}>
        {/* Intro com destaque visual */}
        <div className="relative overflow-hidden p-6 bg-gradient-to-r from-secondary via-secondary/80 to-secondary rounded-2xl border border-border/50">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
          <p className="relative text-base md:text-lg leading-relaxed text-muted-foreground">
            O <strong className="text-foreground">Kit SOS Crescimento</strong> é a solução completa para{" "}
            <span className="text-primary font-semibold">acelerar o crescimento</span> e{" "}
            <span className="text-primary font-semibold">combater a queda</span>.{" "}
            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/10 rounded-full text-sm text-primary font-medium">
              <Leaf className="w-3.5 h-3.5" />
              100% fitoterápico
            </span>
          </p>
        </div>

        {/* Cards dos produtos com design premium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="group p-5 bg-gradient-to-br from-background to-secondary/50 rounded-2xl border border-border/50 shadow-sm hover:shadow-md transition-all hover:border-primary/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Droplets className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <h4 className="font-bold text-foreground">Shampoo</h4>
                <span className="text-xs text-muted-foreground">300ml</span>
              </div>
            </div>
            <ul className="space-y-2">
              {["Limpeza profunda do couro", "Ação antioxidante", "Rejuvenescimento dos fios"].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="group p-5 bg-gradient-to-br from-background to-secondary/50 rounded-2xl border border-border/50 shadow-sm hover:shadow-md transition-all hover:border-primary/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center">
                <Heart className="w-5 h-5 text-pink-500" />
              </div>
              <div>
                <h4 className="font-bold text-foreground">Máscara</h4>
                <span className="text-xs text-muted-foreground">300g</span>
              </div>
            </div>
            <ul className="space-y-2">
              {["Força e resistência", "Nutrição profunda", "Recupera maciez e brilho"].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="group relative p-5 bg-gradient-to-br from-primary/10 via-primary/5 to-background rounded-2xl border-2 border-primary/40 shadow-lg shadow-primary/10 hover:shadow-xl transition-all">
            <div className="absolute -top-2.5 left-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full shadow-md">
              ⭐ Destaque
            </div>
            <div className="flex items-center gap-3 mb-4 mt-1">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-foreground">Tônico</h4>
                <span className="text-xs text-muted-foreground">100ml</span>
              </div>
            </div>
            <ul className="space-y-2">
              {["Fortalece a raiz", "Estimula crescimento", "Reduz oleosidade"].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {isExpanded && (
          <>
            {/* Modo de Uso com design moderno */}
            <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-background border border-primary/20 rounded-2xl p-6 md:p-8">
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
                    <Check className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Modo de Uso</h3>
                </div>
                
                <div className="space-y-4">
                  {[
                    { step: "1", title: "Shampoo", desc: "Aplique sobre os cabelos molhados, massageie o couro cabeludo e enxágue." },
                    { step: "2", title: "Máscara", desc: "Aplique nos cabelos úmidos, penteie e deixe agir 5-20 minutos." },
                    { step: "3", title: "Tônico", desc: "Borrife na raiz e extensão. Use diariamente!", highlight: true },
                  ].map((item, i) => (
                    <div key={i} className={`flex gap-4 p-4 rounded-xl transition-all ${item.highlight ? 'bg-primary/10 border border-primary/30' : 'bg-background/50'}`}>
                      <div className="w-8 h-8 rounded-lg bg-primary/20 text-primary font-bold flex items-center justify-center flex-shrink-0">
                        {item.step}
                      </div>
                      <div>
                        <strong className="text-foreground">{item.title}:</strong>{" "}
                        <span className="text-muted-foreground">{item.desc}</span>
                        {item.highlight && (
                          <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                            Recomendado
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-secondary rounded-xl border border-border/50">
                  <p className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-lg">💡</span>
                    <span><strong className="text-foreground">Dica pro:</strong> Use o kit 3x por semana e o tônico diariamente para resultados otimizados!</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Ativos com design de tags */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1 h-6 bg-primary rounded-full" />
                <h3 className="text-lg font-bold text-foreground">Ativos Poderosos</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {ingredients.map((ingredient, index) => (
                  <div 
                    key={index}
                    className="group flex items-center gap-2 px-4 py-2.5 rounded-full bg-secondary/80 border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all cursor-default"
                  >
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <div className="text-sm">
                      <span className="font-medium text-foreground">{ingredient.name}</span>
                      <span className="text-muted-foreground hidden sm:inline"> · {ingredient.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ com accordion style */}
            <div className="bg-gradient-to-br from-success/10 via-success/5 to-background border border-success/20 rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-success/20 flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-success" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Perguntas Frequentes</h3>
              </div>
              
              <div className="space-y-4">
                {[
                  { q: "Qual a principal função do kit SOS?", a: "Fortalecer fios fracos, diminuir queda e promover crescimento acelerado com fios mais espessos." },
                  { q: "Em quanto tempo vejo resultados?", a: "Fortalecimento já na 1ª aplicação. Para crescimento visível, use por no mínimo 30 dias." },
                  { q: "Serve para homem?", a: "Sim! O kit é unissex e serve para todos os tipos de cabelo." },
                ].map((item, i) => (
                  <div key={i} className="p-4 bg-background/50 rounded-xl border border-border/30">
                    <p className="font-semibold text-foreground mb-1">{item.q}</p>
                    <p className="text-sm text-muted-foreground">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Toggle button com design melhorado */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="group flex items-center gap-2 mt-8 px-5 py-2.5 rounded-full bg-primary/10 text-primary font-semibold text-sm hover:bg-primary hover:text-primary-foreground transition-all"
      >
        {isExpanded ? (
          <>
            Ver menos <ChevronUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
          </>
        ) : (
          <>
            Ver modo de uso e ingredientes <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
          </>
        )}
      </button>
    </div>
  );
};

export default ProductDescription;
