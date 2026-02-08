 import { useState } from "react";
import { ChevronDown, ChevronUp, Check, Leaf, Droplets, Sparkles, Zap, Heart, Shield } from "lucide-react";
 
const ProductDescription = () => {
  const [isExpanded, setIsExpanded] = useState(true);
 
   const benefits = [
    { icon: Zap, text: "Crescimento acelerado em 30 dias", highlight: true },
    { icon: Shield, text: "Combate queda e fortalece", highlight: false },
    { icon: Droplets, text: "Tratamento fitoterápico natural", highlight: false },
    { icon: Leaf, text: "Não testado em animais", highlight: false },
   ];
 
   const ingredients = [
    { name: "Biotina", desc: "Proteína essencial para cabelos fortes e espessos" },
    { name: "Pantenol", desc: "Hidratação e prevenção de pontas duplas" },
    { name: "Extrato de Bambu", desc: "Rico em vitaminas A, B e C" },
    { name: "Óleo de Rícino", desc: "Nutrição e estímulo ao crescimento" },
    { name: "Keratina", desc: "Reconstrução da fibra capilar" },
    { name: "Extrato de Bardana", desc: "Ação anti-inflamatória e cicatrizante" },
    { name: "Extrato de Café", desc: "Controle da alopecia e estimulo capilar" },
   ];
 
   return (
     <div className="border-t border-border py-8">
      <h2 className="text-2xl font-bold text-foreground mb-6">Sobre o Kit SOS Crescimento</h2>
       
       {/* Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
         {benefits.map((benefit, index) => (
           <div 
             key={index}
            className={`flex items-center gap-3 p-4 rounded-xl ${benefit.highlight ? 'bg-primary/10 border-2 border-primary' : 'bg-secondary'}`}
           >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${benefit.highlight ? 'bg-primary' : 'bg-primary/10'}`}>
              <benefit.icon className={`w-6 h-6 ${benefit.highlight ? 'text-primary-foreground' : 'text-primary'}`} />
             </div>
            <span className={`text-sm font-medium ${benefit.highlight ? 'text-primary' : 'text-foreground'}`}>{benefit.text}</span>
           </div>
         ))}
       </div>
 
       {/* Description text */}
        <div className={`space-y-6 text-muted-foreground ${!isExpanded ? "line-clamp-4" : ""}`}>
          {/* Intro destaque */}
          <div className="text-base leading-relaxed">
            <p>
              O <strong className="text-foreground">Kit SOS Crescimento</strong> é a solução completa para <span className="text-primary font-medium">acelerar o crescimento</span> e <span className="text-primary font-medium">combater a queda</span>. Tratamento 100% fitoterápico.
            </p>
          </div>

          {/* Cards dos produtos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-secondary/50 rounded-xl border border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <Droplets className="w-5 h-5 text-primary" />
                <h4 className="font-semibold text-foreground text-sm">Shampoo 300ml</h4>
              </div>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Limpeza profunda do couro</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Ação antioxidante</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Rejuvenescimento dos fios</span>
                </li>
              </ul>
            </div>

            <div className="p-4 bg-secondary/50 rounded-xl border border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-5 h-5 text-primary" />
                <h4 className="font-semibold text-foreground text-sm">Máscara 300g</h4>
              </div>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Força e resistência</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Nutrição profunda</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Recupera maciez e brilho</span>
                </li>
              </ul>
            </div>

            <div className="p-4 bg-primary/5 rounded-xl border-2 border-primary/30">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <h4 className="font-semibold text-foreground text-sm">Tônico 100ml ⭐</h4>
              </div>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Fortalece a raiz</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Estimula crescimento</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Reduz oleosidade</span>
                </li>
              </ul>
            </div>
          </div>
 
         {isExpanded && (
           <>
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mt-6">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm">✓</span>
                Modo de Uso Recomendado
              </h3>
              <ol className="space-y-4">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm font-bold flex items-center justify-center">1</span>
                  <div>
                    <strong className="text-foreground">Shampoo:</strong> Aplique sobre os cabelos molhados, massageando o couro cabeludo até formar uma espuma rica. Deslize a espuma para as pontas e enxágue.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm font-bold flex items-center justify-center">2</span>
                  <div>
                    <strong className="text-foreground">Máscara:</strong> Aplique com os cabelos úmidos em toda área do fio. Penteie até uniformizar. Deixe agir por 5-20 minutos dependendo do dano.
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary text-sm font-bold flex items-center justify-center">3</span>
                  <div>
                    <strong className="text-foreground">Tônico:</strong> Com cabelos limpos e úmidos, borrife por toda extensão e diretamente na raiz. Penteie e deixe secar naturalmente. <span className="text-primary font-medium">Use diariamente para melhores resultados!</span>
                  </div>
                </li>
              </ol>
              <p className="mt-4 text-sm text-muted-foreground bg-secondary p-3 rounded-lg">
                💡 <strong>Dica:</strong> Use o kit completo no mínimo 3x por semana e o tônico diariamente para resultados otimizados!
              </p>
            </div>
 
            <h3 className="text-lg font-bold text-foreground pt-6">Ativos Poderosos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
               {ingredients.map((ingredient, index) => (
                <div 
                   key={index}
                  className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50"
                 >
                  <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium text-foreground">{ingredient.name}:</span>{" "}
                    <span className="text-muted-foreground text-sm">{ingredient.desc}</span>
                  </div>
                </div>
               ))}
             </div>
 
            <div className="bg-success/10 border border-success/30 rounded-xl p-6 mt-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Perguntas Frequentes</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-medium text-foreground">Qual a principal função do kit SOS?</p>
                  <p className="text-muted-foreground text-sm mt-1">Fortalecer os fios fracos e quebradiços, diminuindo a queda e a quebra, além de promover crescimento acelerado com fios mais espessos e fortalecidos.</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Em quanto tempo consigo notar a diferença?</p>
                  <p className="text-muted-foreground text-sm mt-1">Na primeira aplicação já será notável o fortalecimento dos fios. Para notar o crescimento e nascimento de fios mais espessos é indicado tratamento de no mínimo 30 dias.</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Serve para homem?</p>
                  <p className="text-muted-foreground text-sm mt-1">Sim! O kit serve para todos os tipos de cabelos de homens e mulheres.</p>
                </div>
              </div>
            </div>
           </>
         )}
       </div>
 
       <button
         onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-primary font-semibold mt-6 hover:underline"
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