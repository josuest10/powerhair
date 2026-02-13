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
import productGallery5 from "@/assets/product-gallery-5.png";

const KITS: KitOption[] = [
  {
    id: "1-kit",
    label: "1 Kit",
    subtitle: "Shampoo + Máscara + Tônico",
    price: 69.90,
    originalPrice: 179.90,
    productName: "Kit SOS Crescimento e Antiqueda",
    productDescription: "Shampoo + Máscara + Tônico",
  },
  {
    id: "2-kits",
    label: "2 Kits",
    subtitle: "Leve 2 com desconto exclusivo",
    price: 119.90,
    originalPrice: 359.80,
    badge: "Mais Vendido",
    productName: "2x Kit SOS Crescimento e Antiqueda",
    productDescription: "2x (Shampoo + Máscara + Tônico)",
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
        content_ids: ["kit-sos-crescimento"],
        content_name: "Kit SOS Crescimento e Antiqueda",
      });
      trackTikTokViewContent({
        value: KITS[0].price,
        currency: "BRL",
      });
    }
  }, []);

  const productImages = [
    "https://cdn.awsli.com.br/2500x2500/2814/2814407/produto/347799082/whatsapp-image-2023-09-06-at-10-41-32-eaicsvr39k-ylddlj70fy.jpeg",
    "https://cdn.awsli.com.br/2500x2500/2814/2814407/produto/347799082/whatsapp-image-2023-09-06-at-10-35-03--1--nhlvvncapn-216zxetspe.jpeg",
    "https://cdn.awsli.com.br/2500x2500/2814/2814407/produto/347799082/whatsapp-image-2023-09-06-at-10-35-03--2--ikuz221p1v-ucdpgudncg.jpeg",
    "https://cdn.awsli.com.br/2500x2500/2814/2814407/produto/347799082/whatsapp-image-2023-09-06-at-10-35-03--3--ih0818emza-mu3hsn7l0f.jpeg",
    productGallery5,
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
              title="Kit SOS Crescimento e Antiqueda: Shampoo 300ml + Máscara 300g + Tônico Fortalecedor 100ml"
              brand="LIZZANTE"
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
