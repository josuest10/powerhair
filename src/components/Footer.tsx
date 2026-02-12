import { Package, CreditCard, HeadphonesIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-background">
      {/* Trust Bar - ForPatas style */}
      <div className="border-t border-border">
        <div className="container max-w-5xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground text-sm">Rastreio em tempo real</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Acompanhe cada etapa da entrega do seu pedido — do envio até a chegada!
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <CreditCard className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground text-sm">Parcelamento facilitado</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Divida em até 12x no cartão e garanta seu tratamento sem pesar no bolso!
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <HeadphonesIcon className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground text-sm">Suporte com carinho</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Nossa equipe está pronta pra te atender com empatia e agilidade.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Simple Footer */}
      <div className="border-t border-border bg-muted/30">
        <div className="container max-w-5xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
              <Link to="/politica-de-privacidade" className="hover:text-foreground transition-colors">
                Política de Privacidade
              </Link>
              <span>•</span>
              <Link to="/termos-de-uso" className="hover:text-foreground transition-colors">
                Termos de Uso
              </Link>
              <span>•</span>
              <Link to="/trocas-e-devolucoes" className="hover:text-foreground transition-colors">
                Trocas e Devoluções
              </Link>
              <span>•</span>
              <Link to="/central-de-ajuda" className="hover:text-foreground transition-colors">
                Central de Ajuda
              </Link>
            </div>
            <p className="text-xs text-muted-foreground">
              © 2026 Power Hair | CNPJ: 15.190.451/0001-06
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
