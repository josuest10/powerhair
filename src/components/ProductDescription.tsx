 import { useState } from "react";
 import { ChevronDown, ChevronUp, Check, Leaf, Droplets, Sparkles } from "lucide-react";
 
 const ProductDescription = () => {
   const [isExpanded, setIsExpanded] = useState(false);
 
   const benefits = [
     { icon: Sparkles, text: "Fios mais longos em 2 meses" },
     { icon: Droplets, text: "Hidratação profunda" },
     { icon: Leaf, text: "Fórmula vegana e cruelty free" },
   ];
 
   const ingredients = [
     "Biotina",
     "Ácido Hialurônico",
     "Vitamina E",
     "Óleo de Argan",
     "Queratina Vegetal",
     "Pantenol",
   ];
 
   return (
     <div className="border-t border-border py-8">
       <h2 className="text-xl font-semibold text-foreground mb-6">Descrição do Produto</h2>
       
       {/* Benefits */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
         {benefits.map((benefit, index) => (
           <div 
             key={index}
             className="flex items-center gap-3 p-4 rounded-xl bg-secondary"
           >
             <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
               <benefit.icon className="w-5 h-5 text-accent" />
             </div>
             <span className="text-sm font-medium text-foreground">{benefit.text}</span>
           </div>
         ))}
       </div>
 
       {/* Description text */}
       <div className={`space-y-4 text-muted-foreground ${!isExpanded ? "line-clamp-4" : ""}`}>
         <p>
           O <strong className="text-foreground">Combo Siàge Acelera o Crescimento</strong> é a solução completa para quem deseja fios mais longos, fortes e saudáveis. Com tecnologia exclusiva Revive 4D, este kit combina três produtos poderosos que trabalham em sinergia para potencializar o crescimento capilar.
         </p>
         <p>
           O <strong className="text-foreground">Shampoo 250ml</strong> realiza uma limpeza profunda e eficaz, removendo resíduos e preparando os fios para receber os ativos de tratamento. Sua fórmula suave não agride o couro cabeludo e ajuda a manter o equilíbrio natural da oleosidade.
         </p>
         <p>
           A <strong className="text-foreground">Máscara Capilar 250g</strong> oferece nutrição intensiva com alta concentração de biotina e ácido hialurônico, penetrando profundamente na fibra capilar para reparar danos e fortalecer os fios da raiz às pontas.
         </p>
         <p>
           O <strong className="text-foreground">Condicionador 200ml</strong> sela as cutículas, proporcionando um acabamento sedoso e brilhante. Seus ativos ajudam a desembaraçar os fios, facilitando a escovação e reduzindo a quebra.
         </p>
 
         {isExpanded && (
           <>
             <h3 className="text-lg font-semibold text-foreground pt-4">Modo de Uso</h3>
             <ol className="list-decimal list-inside space-y-2">
               <li>Aplique o shampoo nos cabelos molhados, massageie suavemente e enxágue.</li>
               <li>Aplique a máscara nos fios, deixe agir por 3 a 5 minutos e enxágue bem.</li>
               <li>Finalize com o condicionador, deixe agir por 2 minutos e enxágue completamente.</li>
             </ol>
 
             <h3 className="text-lg font-semibold text-foreground pt-4">Principais Ingredientes</h3>
             <div className="flex flex-wrap gap-2">
               {ingredients.map((ingredient, index) => (
                 <span 
                   key={index}
                   className="px-3 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium"
                 >
                   {ingredient}
                 </span>
               ))}
             </div>
 
             <h3 className="text-lg font-semibold text-foreground pt-4">Resultados Comprovados</h3>
             <ul className="space-y-2">
               {[
                 "92% notaram cabelos mais fortes após 4 semanas",
                 "87% perceberam aumento no crescimento capilar",
                 "95% sentiram os fios mais macios e hidratados",
                 "89% reduziram a queda de cabelo",
               ].map((result, index) => (
                 <li key={index} className="flex items-center gap-2">
                   <Check className="w-4 h-4 text-accent flex-shrink-0" />
                   <span>{result}</span>
                 </li>
               ))}
             </ul>
           </>
         )}
       </div>
 
       <button
         onClick={() => setIsExpanded(!isExpanded)}
         className="flex items-center gap-2 text-accent font-medium mt-4 hover:underline"
       >
         {isExpanded ? (
           <>
             Ver menos <ChevronUp className="w-4 h-4" />
           </>
         ) : (
           <>
             Ver mais <ChevronDown className="w-4 h-4" />
           </>
         )}
       </button>
     </div>
   );
 };
 
 export default ProductDescription;