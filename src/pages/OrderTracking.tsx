import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Search, Package, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const OrderTracking = () => {
  const [trackingCode, setTrackingCode] = useState("");

  const handleTrack = () => {
    if (!trackingCode.trim()) return;
    window.open(
      `https://jadvialogistica.com/rastreio?codigo=${encodeURIComponent(trackingCode.trim())}`,
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container max-w-lg mx-auto px-4 md:px-6 py-16">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Rastreie seu Pedido</h1>
          <p className="text-muted-foreground">Insira o código de rastreio enviado por e-mail</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Código de rastreio</label>
              <Input
                placeholder="Ex: JL00PREV01BR"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value.toUpperCase())}
                onKeyDown={(e) => e.key === "Enter" && handleTrack()}
                className="text-center text-lg tracking-wider font-mono"
              />
            </div>
            <Button
              onClick={handleTrack}
              disabled={!trackingCode.trim()}
              className="w-full gap-2"
              size="lg"
            >
              <Search className="w-4 h-4" />
              Rastrear Pedido
            </Button>
          </div>
        </div>

        <div className="mt-8 bg-card border border-border rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2 text-sm">
            <Truck className="w-4 h-4 text-primary" />
            Informações úteis
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• O código de rastreio é enviado por e-mail após o envio do pedido</li>
            <li>• Pode levar até 24h para o código ser atualizado</li>
            <li>• Prazo estimado de entrega: 5 a 12 dias úteis</li>
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderTracking;
