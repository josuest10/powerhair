import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const OrderTracking = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.rastrocode.site/widget/0dbca2f9-0696-11f1-9532-0050565c05b3.js";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container max-w-4xl mx-auto px-4 md:px-6 py-12">
        <h1 className="text-3xl font-bold text-foreground mb-8">Rastreie seu Pedido</h1>
        <div id="rastro-widget"></div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderTracking;
