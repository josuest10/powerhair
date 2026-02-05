 import { useState } from "react";
 import { ChevronLeft, ChevronRight } from "lucide-react";
 import { Button } from "@/components/ui/button";
 
 interface ProductGalleryProps {
   images: string[];
   productCode?: string;
 }
 
 const ProductGallery = ({ images, productCode }: ProductGalleryProps) => {
   const [selectedIndex, setSelectedIndex] = useState(0);
 
   const handlePrev = () => {
     setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
   };
 
   const handleNext = () => {
     setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
   };
 
   return (
     <div className="flex flex-col md:flex-row gap-4">
       {/* Thumbnails - Desktop */}
       <div className="hidden md:flex flex-col gap-2">
         {images.map((img, index) => (
           <button
             key={index}
             onClick={() => setSelectedIndex(index)}
             className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
               selectedIndex === index ? "border-primary" : "border-transparent hover:border-border"
             }`}
           >
             <img src={img} alt="" className="w-full h-full object-cover" />
           </button>
         ))}
         {productCode && (
           <div className="text-xs text-muted-foreground mt-2 text-center">
             <div>Cod:</div>
             <div>{productCode}</div>
           </div>
         )}
       </div>
 
       {/* Main image */}
       <div className="relative flex-1">
         <div className="aspect-square md:aspect-[4/3] rounded-lg overflow-hidden bg-secondary">
           <img 
             src={images[selectedIndex]} 
             alt="Produto"
             className="w-full h-full object-contain"
           />
         </div>
 
         {/* Navigation arrows */}
         <Button
           variant="ghost"
           size="icon"
           className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background shadow-md"
           onClick={handlePrev}
         >
           <ChevronLeft className="w-5 h-5" />
         </Button>
         <Button
           variant="ghost"
           size="icon"
           className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background shadow-md"
           onClick={handleNext}
         >
           <ChevronRight className="w-5 h-5" />
         </Button>
 
         {/* Dots indicator */}
         <div className="flex justify-center gap-2 mt-4">
           {images.map((_, index) => (
             <button
               key={index}
               onClick={() => setSelectedIndex(index)}
               className={`w-2.5 h-2.5 rounded-full transition-colors ${
                 selectedIndex === index ? "bg-primary" : "bg-border"
               }`}
             />
           ))}
         </div>
       </div>
 
       {/* Thumbnails - Mobile */}
       <div className="flex md:hidden gap-2 overflow-x-auto pb-2">
         {images.map((img, index) => (
           <button
             key={index}
             onClick={() => setSelectedIndex(index)}
             className={`w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-colors ${
               selectedIndex === index ? "border-primary" : "border-transparent"
             }`}
           >
             <img src={img} alt="" className="w-full h-full object-cover" />
           </button>
         ))}
       </div>
     </div>
   );
 };
 
 export default ProductGallery;