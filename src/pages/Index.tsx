 import PromoBanner from "@/components/PromoBanner";
 import Header from "@/components/Header";
 import Breadcrumb from "@/components/Breadcrumb";
 import ProductGallery from "@/components/ProductGallery";
 import ProductInfo from "@/components/ProductInfo";
 import ProductAttributes from "@/components/ProductAttributes";
 import ProductDescription from "@/components/ProductDescription";
 import ProductReviews from "@/components/ProductReviews";
 
const Index = () => {
   const breadcrumbItems = [
     { label: "Home", href: "#" },
     { label: "Cabelos", href: "#" },
     { label: "Kits de Tratamento", href: "#" },
     { label: "Combo Siàge Acelera o Crescimento: Shampoo 250ml + Máscara Capilar 250g + Condicionador 200ml" },
   ];
 
   const productImages = [
     "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=600&h=600&fit=crop",
     "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=600&fit=crop",
     "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=600&fit=crop",
     "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=600&h=600&fit=crop",
   ];
 
   const kitItems = [
     {
       image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=100&h=100&fit=crop",
       price: 49.99,
       installments: "3x de R$ 16,66",
     },
     {
       image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=100&h=100&fit=crop",
       price: 52.99,
       installments: "3x de R$ 17,66",
     },
     {
       image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=100&h=100&fit=crop",
       price: 73.99,
       installments: "4x de R$ 18,50",
     },
   ];
 
   const attributes = [
     { label: "Categorias", value: "Cabelos > Kits de Tratamento" },
     { label: "Tipos de Cabelo", value: "Com Queda ou Ralos" },
     { label: "Condição dos Fios", value: "Prevenção à Queda" },
     { label: "Desejo de Beleza", value: "Anti-Queda" },
     { label: "Tamanho", value: "Padrão" },
     { label: "Propriedades", value: "Cruelty Free" },
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
               productCode="E2023040603"
             />
           </div>
           
           {/* Right column - Product Info */}
           <div>
             <ProductInfo
               title="Combo Siàge Acelera o Crescimento: Shampoo 250ml + Máscara Capilar 250g + Condicionador 200ml"
               brand="SIÀGE"
               rating={5}
               reviewCount={224}
               kitItems={kitItems}
               totalPrice={167.97}
               installmentPrice={16.80}
               installmentCount={10}
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
     </div>
  );
};

export default Index;
