 import Header from "@/components/Header";
 import Footer from "@/components/Footer";
 
 const ReturnsPolicy = () => {
   return (
     <div className="min-h-screen bg-background">
       <Header />
       
       <main className="container max-w-4xl mx-auto px-4 md:px-6 py-12">
         <h1 className="text-3xl font-bold text-foreground mb-8">Trocas e Devoluções</h1>
         
         <div className="prose prose-sm max-w-none text-muted-foreground space-y-6">
           <p className="text-sm text-muted-foreground">
             Última atualização: 05 de fevereiro de 2026
           </p>
 
           <section className="space-y-3">
             <h2 className="text-xl font-semibold text-foreground">1. Direito de Arrependimento</h2>
             <p>
               Conforme o Código de Defesa do Consumidor (Art. 49), você pode desistir da compra em até 
               7 (sete) dias corridos após o recebimento do produto, sem necessidade de justificativa.
             </p>
           </section>
 
           <section className="space-y-3">
             <h2 className="text-xl font-semibold text-foreground">2. Condições para Troca ou Devolução</h2>
             <p>Para que sua solicitação seja aceita, o produto deve:</p>
             <ul className="list-disc pl-6 space-y-1">
               <li>Estar lacrado e em sua embalagem original</li>
               <li>Não ter sido utilizado ou aberto</li>
               <li>Estar acompanhado da nota fiscal</li>
               <li>Estar em perfeitas condições, sem avarias ou sinais de mau uso</li>
             </ul>
           </section>
 
           <section className="space-y-3">
             <h2 className="text-xl font-semibold text-foreground">3. Produtos com Defeito</h2>
             <p>
               Se você receber um produto com defeito de fabricação, entre em contato conosco em até 
               30 dias após o recebimento. Após análise, ofereceremos:
             </p>
             <ul className="list-disc pl-6 space-y-1">
               <li>Substituição por outro produto igual</li>
               <li>Reembolso integral do valor pago</li>
               <li>Desconto proporcional no preço</li>
             </ul>
           </section>
 
           <section className="space-y-3">
             <h2 className="text-xl font-semibold text-foreground">4. Como Solicitar</h2>
             <p>Para solicitar troca ou devolução:</p>
             <ol className="list-decimal pl-6 space-y-2">
               <li>Entre em contato pelo e-mail: trocas@powerhair.com.br ou telefone 0800 123 4567</li>
               <li>Informe o número do pedido e o motivo da solicitação</li>
               <li>Aguarde o código de postagem (enviaremos por e-mail)</li>
               <li>Embale o produto adequadamente e envie pelos Correios</li>
               <li>Após recebimento e análise, processaremos sua solicitação em até 5 dias úteis</li>
             </ol>
           </section>
 
           <section className="space-y-3">
             <h2 className="text-xl font-semibold text-foreground">5. Custos de Envio</h2>
             <p>
               <strong>Arrependimento:</strong> O custo do frete de devolução é de responsabilidade do cliente.
             </p>
             <p>
               <strong>Defeito ou erro nosso:</strong> Nós arcamos com todos os custos de envio.
             </p>
           </section>
 
           <section className="space-y-3">
             <h2 className="text-xl font-semibold text-foreground">6. Reembolso</h2>
             <p>O reembolso será realizado da seguinte forma:</p>
             <ul className="list-disc pl-6 space-y-1">
               <li><strong>Cartão de crédito:</strong> Estorno em até 2 faturas, dependendo da operadora</li>
               <li><strong>PIX ou boleto:</strong> Depósito em conta bancária em até 10 dias úteis</li>
             </ul>
           </section>
 
           <section className="space-y-3">
             <h2 className="text-xl font-semibold text-foreground">7. Produtos Não Elegíveis</h2>
             <p>Não aceitamos devolução de produtos:</p>
             <ul className="list-disc pl-6 space-y-1">
               <li>Que tenham sido abertos ou utilizados</li>
               <li>Sem embalagem original</li>
               <li>Com lacre violado</li>
               <li>Fora do prazo de 7 dias</li>
             </ul>
           </section>
 
           <section className="space-y-3">
             <h2 className="text-xl font-semibold text-foreground">8. Contato</h2>
             <p>
               Dúvidas sobre trocas e devoluções? Fale conosco:
             </p>
             <ul className="list-none space-y-1">
               <li>E-mail: trocas@powerhair.com.br</li>
               <li>Telefone: 0800 123 4567</li>
               <li>Horário: Segunda a sexta, das 9h às 18h</li>
             </ul>
           </section>
         </div>
       </main>
       
       <Footer />
     </div>
   );
 };
 
 export default ReturnsPolicy;