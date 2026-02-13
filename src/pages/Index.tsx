import { useEffect, useRef, useState } from "react";
import PromoBanner from "@/components/PromoBanner";
import Header from "@/components/Header";
import ProductGallery from "@/components/ProductGallery";
import ProductInfo, { KitOption } from "@/components/ProductInfo";
import ProductDescription from "@/components/ProductDescription";
import ProductReviews from "@/components/ProductReviews";
import ProductFAQ from "@/components/ProductFAQ";
import Footer from "@/components/Footer";
import StickyProductCTA from "@/components/StickyProductCTA";
import { trackMetaViewContent } from "@/lib/meta-pixel";
import { trackTikTokViewContent } from "@/lib/tiktok-pixel";
import productLummina1 from "@/assets/product-lummina-1.png";
import productLummina2 from "@/assets/product-lummina-2.png";
import productLummina3 from "@/assets/product-lummina-3.png";
import productLummina4 from "@/assets/product-lummina-4.png";
import productLummina5 from "@/assets/product-lummina-5.png";

const KITS: KitOption[] = [
  {
    id: "1-kit",
    label: "1 Unidade",
    subtitle: "Lummina Gest 200g",
    price: 197.97,
    originalPrice: 297.97,
    productName: "Lummina Gest - Creme para Estrias",
    productDescription: "Lummina Gest 200g",
  },
  {
    id: "2-kits",
    label: "2 Unidades",
    subtitle: "Leve 2 com 50% OFF",
    price: 297.36,
    originalPrice: 595.94,
    badge: "Mais Vendido",
    productName: "2x Lummina Gest - Creme para Estrias",
    productDescription: "2x Lummina Gest 200g",
  },
];

const Index = () => {
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
        content_name: "Lummina Gest - Creme para Estrias",
      });
      trackTikTokViewContent({
        value: KITS[0].price,
        currency: "BRL",
      });
    }
  }, []);

  const productImages = [
    productLummina1,
    productLummina2,
    productLummina3,
    productLummina4,
    productLummina5,
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
              title="Lummina Gest — Creme para Estrias com Algisium C, Rosa Mosqueta, Pantenol e Vitamina E | 200g"
              brand="LUMMI BRAZIL"
              rating={5}
              reviewCount={847}
              kits={KITS}
              selectedKit={selectedKit}
              onSelectKit={setSelectedKit}
              installmentCount={4}
            />
          </div>
        </div>

        {/* Description - editorial style */}
        <ProductDescription />

        {/* Reviews */}
        <ProductReviews />

        {/* FAQ */}
        <ProductFAQ />
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

export default Index;
