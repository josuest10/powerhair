 import { ChevronRight } from "lucide-react";
 
 interface BreadcrumbProps {
   items: { label: string; href?: string }[];
 }
 
 const Breadcrumb = ({ items }: BreadcrumbProps) => {
   return (
     <nav className="flex items-center gap-2 text-sm text-muted-foreground py-4 px-4 md:px-6 overflow-x-auto">
       {items.map((item, index) => (
         <div key={index} className="flex items-center gap-2 whitespace-nowrap">
           {index > 0 && <ChevronRight className="w-4 h-4 flex-shrink-0" />}
           {item.href ? (
             <a href={item.href} className="hover:text-foreground transition-colors">
               {item.label}
             </a>
           ) : (
             <span className="text-foreground">{item.label}</span>
           )}
         </div>
       ))}
     </nav>
   );
 };
 
 export default Breadcrumb;