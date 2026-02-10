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
          Oferta Exclusiva — Complete seu Kit
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

          {/* Product Image */}
          <div className="w-14 h-14 rounded-lg bg-secondary overflow-hidden flex-shrink-0">
            <img
              src={condicionadorImg}
              alt="Condicionador SOS Crescimento 300ml"
              className="w-full h-full object-contain"
            />
          </div>

          {/* Text + Price */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-foreground leading-snug">
              SIM! Quero o Condicionador SOS 💚
            </h3>
            <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed line-clamp-2">
              Sela as cutículas, reduz a quebra e deixa os fios <strong>3x mais resistentes</strong>.
            </p>
          </div>
        </div>

        {/* Price Row - separate for better mobile layout */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground line-through">R$ 59,90</span>
            <span className="text-[10px] font-semibold text-primary-foreground bg-primary px-1.5 py-0.5 rounded">
              50% OFF
            </span>
          </div>
          <span className="text-xl font-bold text-primary">R$ 29,90</span>
        </div>

        {isSelected && (
          <div className="mt-2 flex items-center gap-1.5 text-xs text-primary font-medium animate-fade-in">
            <Check className="w-3.5 h-3.5" />
            Adicionado ao seu pedido!
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderBump;
