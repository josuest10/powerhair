import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const PromoFAQ = () => {
  const faqItems = [
    {
      q: "O Lummina Gest elimina estrias?",
      a: "Não. Ele é um dermocosmético de cuidado diário que ajuda a melhorar a hidratação, o conforto e a textura da pele, o que pode suavizar a aparência das estrias com o uso contínuo.",
    },
    {
      q: "Quanto tempo para começar a perceber diferença?",
      a: "A sensação de maciez costuma ser percebida rapidamente, mas melhora de textura e uniformidade tende a aparecer com consistência de uso. Resultados variam conforme pele e rotina.",
    },
    {
      q: "Posso usar todos os dias?",
      a: "Sim, o uso diário é recomendado para manter hidratação prolongada. Para potencializar a rotina, aplique 1 a 2 vezes ao dia e massageie até absorver.",
    },
    {
      q: "Em quais áreas posso aplicar?",
      a: "Nas regiões mais comuns de estrias e ressecamento, como abdômen, quadris, coxas, glúteos e seios, respeitando as orientações do rótulo e evitando áreas sensibilizadas.",
    },
    {
      q: "Posso usar durante a gravidez?",
      a: "Como todo produto de uso tópico, recomendamos consultar seu médico antes de iniciar o uso durante gravidez ou amamentação, mesmo sendo um produto sem parabenos e corticoides.",
    },
    {
      q: "O produto contém substâncias nocivas?",
      a: "Não! O Lummina Gest é livre de parabenos, óleo mineral, corantes artificiais e corticoides. Formulado com Algisium C, óleo de rosa mosqueta, pantenol e vitamina E.",
    },
    {
      q: "Qual o prazo de entrega?",
      a: "O prazo varia de acordo com sua região. Após a confirmação do pagamento, o pedido é despachado em até 2 dias úteis. Você pode calcular o prazo exato inserindo seu CEP na página do produto.",
    },
    {
      q: "Tem garantia?",
      a: "Sim! Oferecemos garantia de satisfação. Se você não ficar satisfeita com os resultados, entre em contato conosco em até 7 dias após o recebimento para solicitar a devolução.",
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

export default PromoFAQ;
