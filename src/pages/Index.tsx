 import PromoBanner from "@/components/PromoBanner";
 import Header from "@/components/Header";
 import Breadcrumb from "@/components/Breadcrumb";
 import ProductGallery from "@/components/ProductGallery";
 import ProductInfo from "@/components/ProductInfo";
 import ProductAttributes from "@/components/ProductAttributes";
 import ProductDescription from "@/components/ProductDescription";
 import ProductReviews from "@/components/ProductReviews";
 import Footer from "@/components/Footer";
 
const Index = () => {
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
   ];
 
   const kitItems = [
     {
       image: "https://cdn.awsli.com.br/400x400/2814/2814407/produto/347799082/whatsapp-image-2023-09-06-at-10-41-32-eaicsvr39k-ylddlj70fy.jpeg",
       price: 69.90,
       installments: "Shampoo 300ml",
       name: "Shampoo SOS",
     },
     {
       image: "https://cdn.awsli.com.br/400x400/2814/2814407/produto/347799082/whatsapp-image-2023-09-06-at-10-35-03--1--nhlvvncapn-216zxetspe.jpeg",
       price: 79.90,
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
           <div>
             <ProductInfo
               title="Kit SOS Crescimento e Antiqueda: Shampoo 300ml + Máscara 300g + Tônico Fortalecedor 100ml"
               brand="LIZZANTE"
               rating={5}
               reviewCount={847}
               kitItems={kitItems}
               totalPrice={97.00}
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
       </main>
       
       <Footer />
     </div>
  );
};

export default Index;
