import { useState } from "react";
import { Sparkles, Check, ArrowRight } from "lucide-react";
import condicionadorImg from "@/assets/product-condicionador.png";

interface OrderBumpProps {
  isSelected: boolean;
  onToggle: (selected: boolean) => void;
}

const OrderBump = ({ isSelected, onToggle }: OrderBumpProps) => {
  return (
    <div
      onClick={() => onToggle(!isSelected)}
      className={`relative cursor-pointer rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
        isSelected
          ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
          : "border-dashed border-primary/40 bg-card hover:border-primary/60 hover:shadow-md"
      }`}
    >
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-primary to-primary/80 px-4 py-2 flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4 text-primary-foreground" />
        <span className="text-xs font-bold text-primary-foreground uppercase tracking-wide">
          Oferta Exclusiva — Apenas neste checkout
        </span>
      </div>

      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Checkbox */}
          <div
            className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
              isSelected
                ? "bg-primary border-primary"
                : "border-muted-foreground/40 hover:border-primary"
            }`}
          >
            {isSelected && <Check className="w-3.5 h-3.5 text-primary-foreground" />}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-3">
              {/* Product Image */}
              <div className="w-16 h-16 rounded-lg bg-secondary overflow-hidden flex-shrink-0">
                <img
                  src={condicionadorImg}
                  alt="Condicionador SOS Crescimento 300ml"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex-1">
                <h3 className="text-sm font-bold text-foreground leading-snug">
                  SIM! Quero o Condicionador SOS Crescimento 💚
                </h3>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  Seu kit fica completo com o condicionador! Ele <strong>sela as cutículas, reduz a quebra e deixa os fios 3x mais resistentes</strong> desde a primeira aplicação.
                </p>

                {/* Price */}
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-xs text-muted-foreground line-through">R$ 59,90</span>
                  <span className="text-lg font-bold text-primary">R$ 29,90</span>
                  <span className="text-[10px] font-semibold text-primary-foreground bg-primary px-1.5 py-0.5 rounded">
                    50% OFF
                  </span>
                </div>
              </div>
            </div>

            {isSelected && (
              <div className="mt-3 flex items-center gap-1.5 text-xs text-primary font-medium animate-fade-in">
                <Check className="w-3.5 h-3.5" />
                Adicionado ao seu pedido!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderBump;
