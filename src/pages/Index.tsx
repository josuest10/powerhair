import { useEffect, useRef, useState } from "react";
import PromoBanner from "@/components/PromoBanner";
import Header from "@/components/Header";
import Breadcrumb from "@/components/Breadcrumb";
import ProductGallery from "@/components/ProductGallery";
import ProductInfo from "@/components/ProductInfo";
import ProductAttributes from "@/components/ProductAttributes";
import ProductDescription from "@/components/ProductDescription";
import ProductReviews from "@/components/ProductReviews";
import ProductFAQ from "@/components/ProductFAQ";
import Footer from "@/components/Footer";
import StickyProductCTA from "@/components/StickyProductCTA";
import { trackViewContent } from "@/lib/tiktok-pixel";
import { trackMetaViewContent } from "@/lib/meta-pixel";
import productGallery5 from "@/assets/product-gallery-5.png";

const PRODUCT_PRICE = 97.00;
const ORIGINAL_PRICE = 179.90;
 
const Index = () => {
  const hasTrackedViewContent = useRef(false);
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const productInfoRef = useRef<HTMLDivElement>(null);
  
  // Show sticky CTA when user scrolls past the product info section
  useEffect(() => {
    const handleScroll = () => {
      if (productInfoRef.current) {
        const rect = productInfoRef.current.getBoundingClientRect();
        // Show when product info is out of view (scrolled past)
        setShowStickyCTA(rect.bottom < 0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!hasTrackedViewContent.current) {
      hasTrackedViewContent.current = true;
      // TikTok ViewContent
      trackViewContent({
        value: PRODUCT_PRICE,
        currency: 'BRL',
        content_id: 'kit-sos-crescimento',
        content_name: 'Kit SOS Crescimento e Antiqueda',
      });
      // Meta ViewContent
      trackMetaViewContent({
        value: PRODUCT_PRICE,
        currency: 'BRL',
        content_ids: ['kit-sos-crescimento'],
        content_name: 'Kit SOS Crescimento e Antiqueda',
      });
    }
  }, []);

   const breadcrumbItems = [
     { label: "Home", href: "#" },
     { label: "Cabelos", href: "#" },
     { label: "Crescimento Capilar", href: "#" },
     { label: "Kit SOS Crescimento e Antiqueda | Lizzante Profissional" },
   ];
 
   const productImages = [
     "https://cdn.awsli.com.br/2500x2500/2814/2814407/produto/347799082/whatsapp-image-2023-09-06-at-10-41-32-eaicsvr39k-ylddlj70fy.jpeg",
     "https://cdn.awsli.com.br/2500x2500/2814/2814407/produto/347799082/whatsapp-image-2023-09-06-at-10-35-03--1--nhlvvncapn-216zxetspe.jpeg",
     "https://cdn.awsli.com.br/2500x2500/2814/2814407/produto/347799082/whatsapp-image-2023-09-06-at-10-35-03--2--ikuz221p1v-ucdpgudncg.jpeg",
     "https://cdn.awsli.com.br/2500x2500/2814/2814407/produto/347799082/whatsapp-image-2023-09-06-at-10-35-03--3--ih0818emza-mu3hsn7l0f.jpeg",
     productGallery5,
   ];
 
   const kitItems = [
     {
       image: "https://cdn.awsli.com.br/400x400/2814/2814407/produto/347799082/whatsapp-image-2023-09-06-at-10-41-32-eaicsvr39k-ylddlj70fy.jpeg",
       price: 97.00,
       installments: "Shampoo 300ml",
       name: "Shampoo SOS",
     },
     {
       image: "https://cdn.awsli.com.br/400x400/2814/2814407/produto/347799082/whatsapp-image-2023-09-06-at-10-35-03--1--nhlvvncapn-216zxetspe.jpeg",
       price: 97.00,
       installments: "Máscara 300g",
       name: "Máscara SOS",
     },
     {
       image: "https://cdn.awsli.com.br/400x400/2814/2814407/produto/347799082/whatsapp-image-2023-09-06-at-10-35-03--2--ikuz221p1v-ucdpgudncg.jpeg",
       price: 59.90,
       installments: "Tônico 100ml",
       name: "Tônico SOS",
     },
   ];
 
   const attributes = [
     { label: "Marca", value: "Lizzante Profissional" },
     { label: "Indicação", value: "Queda e Crescimento Capilar" },
     { label: "Público", value: "Homens e Mulheres" },
     { label: "Tratamento", value: "Alopecia e Fortalecimento" },
     { label: "Origem", value: "Fitoterápico Natural" },
     { label: "Propriedades", value: "Não Testado em Animais" },
   ];
 
  return (
     <div className="min-h-screen bg-background">
       <PromoBanner />
       <Header />
       <Breadcrumb items={breadcrumbItems} />
       
       <main className="container max-w-7xl mx-auto px-4 md:px-6 py-6">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
           {/* Left column - Gallery */}
           <div>
             <ProductGallery 
               images={productImages}
               productCode="2SXG7Z3DQ"
             />
           </div>
           
            {/* Right column - Product Info */}
            <div ref={productInfoRef}>
              <ProductInfo
                title="Kit SOS Crescimento e Antiqueda: Shampoo 300ml + Máscara 300g + Tônico Fortalecedor 100ml"
                brand="LIZZANTE"
                rating={5}
                reviewCount={847}
                kitItems={kitItems}
                totalPrice={PRODUCT_PRICE}
                installmentPrice={24.25}
                installmentCount={4}
              />
            </div>
          </div>
  
          {/* Product Attributes */}
          <ProductAttributes attributes={attributes} />
  
          {/* Product Description */}
          <ProductDescription />
  
          {/* Product Reviews */}
          <ProductReviews />

          {/* FAQ Section */}
          <ProductFAQ />
        </main>
        
        <Footer />
        
        {/* Sticky CTA for Mobile */}
        <StickyProductCTA 
          price={PRODUCT_PRICE} 
          originalPrice={ORIGINAL_PRICE} 
          isVisible={showStickyCTA} 
        />
      </div>
  );
};

export default Index;
