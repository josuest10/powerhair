import { useState } from "react";
import { Check, Sparkles, X } from "lucide-react";

import result1 from "@/assets/results/result-1.png";
import result2 from "@/assets/results/result-2.png";
import result3 from "@/assets/results/result-3.png";
import result4 from "@/assets/results/result-4.png";

const ProductDescription = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const resultImages = [
    { src: result1, name: "Ana Paula", time: "45 dias" },
    { src: result2, name: "Fernanda", time: "60 dias" },
    { src: result3, name: "Juliana", time: "5 meses" },
    { src: result4, name: "Mariana", time: "90 dias" },
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
          O ÚNICO KIT QUE COMBATE A QUEDA E ACELERA O CRESCIMENTO — TUDO EM 1 SÓ!
        </h2>
      </div>

      {/* Benefits List - ForPatas editorial style */}
      <div className="max-w-2xl mx-auto space-y-3">
        {[
          { emoji: "💪", text: "Fortalece os fios desde a raiz — reduz a queda em até 90%" },
          { emoji: "🌿", text: "Fórmula 100% fitoterápica com Biotina, Pantenol e Extrato de Bambu" },
          { emoji: "💧", text: "Hidrata profundamente — fios macios, sedosos e com brilho natural" },
          { emoji: "✨", text: "Crescimento visível em 30 dias de uso contínuo" },
          { emoji: "🧴", text: "Kit completo: Shampoo 300ml + Máscara 300g + Tônico 100ml" },
          { emoji: "💛", text: "Unissex — funciona para homens e mulheres, todos os tipos de cabelo" },
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
          Porque seu cabelo merece cuidado de verdade
        </h3>
        <p className="text-base text-muted-foreground leading-relaxed mb-4">
          Sabemos como a queda de cabelo pode afetar sua autoestima. O medo de passar a mão nos fios, a insegurança ao sair de casa, a frustração de ver cada vez menos volume...
        </p>
        <p className="text-base text-muted-foreground leading-relaxed">
          O <strong className="text-foreground">Kit SOS Crescimento</strong> foi criado para devolver não apenas seus cabelos, mas sua <strong className="text-foreground">confiança e autoestima</strong>. Com ingredientes naturais e fitoterápicos, nosso tratamento ataca a queda na raiz e estimula fios novos, mais fortes e saudáveis.
        </p>
        <p className="text-base text-primary font-medium mt-4">
          ✨ Mais de 10.000 pessoas já recuperaram a confiança com o Kit SOS.
        </p>
      </div>

      {/* Results Gallery */}
      <div className="space-y-6">
        <h3 className="text-xl md:text-2xl font-bold text-foreground text-center">
          💬 Resultados reais de quem já usou:
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {resultImages.map((result, index) => (
            <div 
              key={index}
              onClick={() => setSelectedImage(result.src)}
              className="group relative cursor-pointer overflow-hidden rounded-xl border-2 border-border hover:border-primary/50 transition-all duration-300"
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img 
                  src={result.src} 
                  alt={`Resultado de ${result.name}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                <p className="text-white font-medium text-sm">{result.name}</p>
                <p className="text-white/80 text-xs flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> {result.time} de uso
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <p className="text-center text-xs text-muted-foreground">
          * Resultados podem variar de pessoa para pessoa.
        </p>
      </div>

      {/* How to Use - Clean */}
      <div className="max-w-2xl mx-auto space-y-4">
        <h3 className="text-xl md:text-2xl font-bold text-foreground">
          📏 Como usar:
        </h3>
        <div className="space-y-3">
          {[
            { emoji: "🧴", text: "Shampoo: Aplique sobre os cabelos molhados, massageie e enxágue. Use 3x por semana." },
            { emoji: "💆", text: "Máscara: Aplique nos cabelos úmidos, deixe agir 5-20 minutos. Use 3x por semana." },
            { emoji: "💧", text: "Tônico: Borrife na raiz diariamente. Este é o segredo dos resultados!" },
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
            "Quem sofre com queda de cabelo ou afinamento",
            "Cabelos danificados por química (progressiva, coloração)",
            "Queda pós-parto ou pós-estresse",
            "Homens com calvície inicial ou afinamento",
            "Quem quer acelerar o crescimento capilar",
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
          <p>🧴 <strong className="text-foreground">Produto:</strong> Kit SOS Crescimento e Antiqueda</p>
          <p>📦 <strong className="text-foreground">Contém:</strong> Shampoo 300ml + Máscara 300g + Tônico 100ml</p>
          <p>🧪 <strong className="text-foreground">Ingredientes:</strong> Biotina, Pantenol, Extrato de Bambu, Óleo de Rícino, Keratina, Extrato de Bardana</p>
          <p>🐾 <strong className="text-foreground">Indicação:</strong> Todos os tipos de cabelo</p>
          <p>🌿 <strong className="text-foreground">Origem:</strong> Fitoterápico Natural — Não testado em animais</p>
        </div>
      </div>

      {/* Extras */}
      <div className="max-w-2xl mx-auto bg-muted/50 rounded-2xl p-6 space-y-3">
        <h3 className="text-lg font-bold text-foreground">🚚 Extras da Power Hair:</h3>
        <div className="space-y-2 text-base text-muted-foreground">
          <p>✔ Frete Grátis para todo o Brasil</p>
          <p>✔ Parcele em até 12x no cartão</p>
          <p>✔ Produto físico com envio imediato</p>
          <p>✔ Estoque Nacional</p>
          <p>✔ Garantia de satisfação de 7 dias</p>
        </div>
        <p className="text-base text-foreground font-medium pt-2">
          Chega de adiar o cuidado com seu cabelo. Compre agora e transforme seus fios! 🌿
        </p>
      </div>
    </div>
  );
};

export default ProductDescription;
