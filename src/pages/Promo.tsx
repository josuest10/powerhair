import { useEffect, useRef, useState } from "react";
import PromoBanner from "@/components/PromoBanner";
import Header from "@/components/Header";
import ProductGallery from "@/components/ProductGallery";
import ProductInfo, { KitOption } from "@/components/ProductInfo";
import PromoDescription from "@/components/promo/PromoDescription";
import PromoReviews from "@/components/promo/PromoReviews";
import PromoFAQ from "@/components/promo/PromoFAQ";
import Footer from "@/components/Footer";
import StickyProductCTA from "@/components/StickyProductCTA";
import { trackMetaViewContent } from "@/lib/meta-pixel";
import { trackTikTokViewContent } from "@/lib/tiktok-pixel";

const KITS: KitOption[] = [
  {
    id: "1-kit",
    label: "1 Mês de Protocolo",
    subtitle: "Lummina Gest 200g",
    price: 59.90,
    originalPrice: 197.97,
    productName: "Lummina Gest — Creme para Estrias 200g",
    productDescription: "Lummina Gest 200g",
  },
  {
    id: "2-kits",
    label: "2 Meses de Protocolo",
    subtitle: "2x Lummina Gest 200g + Brindes",
    price: 99.90,
    originalPrice: 395.94,
    badge: "Mais Vendido",
    productName: "2x Lummina Gest — Creme para Estrias 200g",
    productDescription: "2x Lummina Gest 200g + Brindes",
  },
];

const Promo = () => {
  const hasTrackedViewContent = useRef(false);
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [selectedKit, setSelectedKit] = useState("1-kit");
  const productInfoRef = useRef<HTMLDivElement>(null);

  const activeKit = KITS.find((k) => k.id === selectedKit) || KITS[0];

  useEffect(() => {
    const handleScroll = () => {
      if (productInfoRef.current) {
        const rect = productInfoRef.current.getBoundingClientRect();
        setShowStickyCTA(rect.bottom < 0);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!hasTrackedViewContent.current) {
      hasTrackedViewContent.current = true;
      trackMetaViewContent({
        value: KITS[0].price,
        currency: "BRL",
        content_ids: ["lummina-gest"],
        content_name: "Lummina Gest — Creme para Estrias",
      });
      trackTikTokViewContent({
        value: KITS[0].price,
        currency: "BRL",
      });
    }
  }, []);

  const productImages = [
    "https://lummibrazil.com.br/cdn/shop/files/qwdefwdvfs.png?v=1770227420&width=1946",
    "https://lummibrazil.com.br/cdn/shop/files/modelo-lummina_ad86381d-27f9-417f-8136-fa883d730304.png?v=1770227420&width=1946",
    "https://lummibrazil.com.br/cdn/shop/files/lummina-ativos_a0c5670b-8072-47c3-9cb7-937a0946291e.png?v=1770227420&width=1946",
    "https://lummibrazil.com.br/cdn/shop/files/ativos-2_69d6f564-b683-48f0-8380-86b636398ae8.png?v=1770227420&width=1946",
    "https://lummibrazil.com.br/cdn/shop/files/textura.png?v=1770227420&width=1946",
  ];

  return (
    <div className="min-h-screen bg-background">
      <PromoBanner />
      <Header />

      <main className="container max-w-7xl mx-auto px-4 md:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div>
            <ProductGallery images={productImages} />
          </div>

          <div ref={productInfoRef}>
            <ProductInfo
              title="Lummina Gest — Creme para Estrias 200g: Hidratante Dermocosmético com Algisium C"
              brand="LUMMI BRAZIL"
              rating={5}
              reviewCount={20}
              kits={KITS}
              selectedKit={selectedKit}
              onSelectKit={setSelectedKit}
              installmentCount={3}
            />
          </div>
        </div>

        <PromoDescription />
        <PromoReviews />
        <PromoFAQ />
      </main>

      <Footer />

      <StickyProductCTA
        price={activeKit.price}
        originalPrice={activeKit.originalPrice}
        isVisible={showStickyCTA}
        kitId={activeKit.id}
        kitProductName={activeKit.productName}
        kitProductDescription={activeKit.productDescription}
      />
    </div>
  );
};

export default Promo;
