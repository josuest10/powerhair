 interface Attribute {
   label: string;
   value: string;
 }
 
 interface ProductAttributesProps {
   attributes: Attribute[];
 }
 
 const ProductAttributes = ({ attributes }: ProductAttributesProps) => {
   return (
     <div className="grid grid-cols-2 gap-x-8 gap-y-4 py-6 border-t border-border">
       {attributes.map((attr, index) => (
         <div key={index}>
           <p className="text-sm font-medium text-foreground">{attr.label}</p>
           <p className="text-sm text-muted-foreground">{attr.value}</p>
         </div>
       ))}
     </div>
   );
 };
 
 export default ProductAttributes;