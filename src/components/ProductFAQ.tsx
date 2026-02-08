import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const ProductFAQ = () => {
  const faqItems = [
    { 
      q: "Qual a principal função do kit SOS?", 
      a: "O Kit SOS foi desenvolvido para fortalecer fios fracos, diminuir a queda excessiva e promover um crescimento acelerado com fios mais espessos e saudáveis. É ideal para quem quer recuperar a autoconfiança através de cabelos mais bonitos e volumosos." 
    },
    { 
      q: "Em quanto tempo vejo resultados?", 
      a: "O fortalecimento dos fios é perceptível já na primeira aplicação. Para crescimento visível e redução significativa da queda, recomendamos uso contínuo por no mínimo 30 dias. Muitas clientes relatam diferença notável em 2-3 semanas de uso regular." 
    },
    { 
      q: "Serve para homem?", 
      a: "Sim! O kit é 100% unissex e foi formulado para atender todos os tipos de cabelo, independente do gênero. Homens que sofrem com calvície ou afinamento capilar têm excelentes resultados." 
    },
    { 
      q: "Posso usar em cabelos com química?", 
      a: "Sim, o Kit SOS é seguro para cabelos com coloração, alisamento, permanente ou qualquer outro procedimento químico. Os ativos naturais ajudam inclusive na recuperação de fios danificados por química." 
    },
    { 
      q: "Com que frequência devo usar?", 
      a: "Recomendamos usar o shampoo e a máscara de 2 a 3 vezes por semana. O tônico pode (e deve!) ser usado diariamente para melhores resultados. A constância é o segredo para resultados duradouros." 
    },
    { 
      q: "O produto causa algum efeito colateral?", 
      a: "Não! O Kit SOS é 100% fitoterápico, com ingredientes naturais e sem substâncias agressivas. Não causa irritação, ardência ou qualquer desconforto. É dermatologicamente testado e não testado em animais." 
    },
    { 
      q: "Funciona para calvície avançada?", 
      a: "O kit é mais eficaz em casos de queda recente, afinamento e enfraquecimento capilar. Para calvície avançada de longa data, os resultados podem ser mais limitados, mas ainda assim ajuda a fortalecer os fios existentes e melhorar a saúde do couro cabeludo." 
    },
    { 
      q: "Posso usar durante a gravidez ou amamentação?", 
      a: "Como todo produto de uso tópico, recomendamos consultar seu médico antes de iniciar o uso durante gravidez ou amamentação, mesmo sendo um produto natural." 
    },
    { 
      q: "Qual o prazo de entrega?", 
      a: "O prazo varia de acordo com sua região. Após a confirmação do pagamento, o pedido é despachado em até 2 dias úteis. Você pode calcular o prazo exato inserindo seu CEP na página do produto." 
    },
    { 
      q: "Tem garantia?", 
      a: "Sim! Oferecemos garantia de satisfação. Se você não ficar satisfeita com os resultados, entre em contato conosco em até 7 dias após o recebimento para solicitar a devolução." 
    },
  ];

  return (
    <div className="border-t border-border py-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <HelpCircle className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          Perguntas Frequentes
        </h2>
      </div>
      
      <Accordion type="single" collapsible className="w-full">
        {faqItems.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border-border">
            <AccordionTrigger className="text-left text-foreground hover:text-primary hover:no-underline py-4">
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-4">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default ProductFAQ;
