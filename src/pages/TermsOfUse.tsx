 import Header from "@/components/Header";
 import Footer from "@/components/Footer";
 
 const TermsOfUse = () => {
   return (
     <div className="min-h-screen bg-background">
       <Header />
       
       <main className="container max-w-4xl mx-auto px-4 md:px-6 py-12">
         <h1 className="text-3xl font-bold text-foreground mb-8">Termos de Uso</h1>
         
         <div className="prose prose-sm max-w-none text-muted-foreground space-y-6">
           <p className="text-sm text-muted-foreground">
             Última atualização: 05 de fevereiro de 2026
           </p>
 
           <section className="space-y-3">
             <h2 className="text-xl font-semibold text-foreground">1. Aceitação dos Termos</h2>
             <p>
               Ao acessar e utilizar o site Power Hair, você concorda em cumprir e estar sujeito a estes Termos de Uso. 
               Se você não concordar com qualquer parte destes termos, não deverá utilizar nosso site ou serviços.
             </p>
           </section>
 
           <section className="space-y-3">
             <h2 className="text-xl font-semibold text-foreground">2. Uso do Site</h2>
             <p>
               Você concorda em usar o site apenas para fins legais e de maneira que não infrinja os direitos de terceiros 
               ou restrinja ou iniba o uso e aproveitamento do site por qualquer outra pessoa.
             </p>
             <p>É proibido:</p>
             <ul className="list-disc pl-6 space-y-1">
               <li>Usar o site de forma fraudulenta ou em conexão com atividades criminosas</li>
               <li>Enviar ou transmitir qualquer material que seja difamatório, ofensivo ou obsceno</li>
               <li>Causar incômodo, inconveniência ou ansiedade desnecessária</li>
               <li>Tentar obter acesso não autorizado ao site ou sistemas relacionados</li>
             </ul>
           </section>
 
           <section className="space-y-3">
             <h2 className="text-xl font-semibold text-foreground">3. Produtos e Preços</h2>
             <p>
               Todos os preços exibidos no site estão em Reais (BRL) e incluem impostos aplicáveis. 
               Reservamo-nos o direito de alterar preços a qualquer momento sem aviso prévio.
             </p>
             <p>
               As imagens dos produtos são meramente ilustrativas. Pequenas variações de cor podem ocorrer 
               devido às configurações de monitor.
             </p>
           </section>
 
           <section className="space-y-3">
             <h2 className="text-xl font-semibold text-foreground">4. Pedidos e Pagamento</h2>
             <p>
               Ao realizar um pedido, você está fazendo uma oferta para comprar um produto. Todos os pedidos 
               estão sujeitos à disponibilidade e confirmação do preço do pedido.
             </p>
             <p>
               Aceitamos as seguintes formas de pagamento: cartões de crédito (Visa, Mastercard, Elo, American Express), 
               PIX e boleto bancário.
             </p>
           </section>
 
           <section className="space-y-3">
             <h2 className="text-xl font-semibold text-foreground">5. Entrega</h2>
             <p>
               Os prazos de entrega são estimados e podem variar de acordo com a região. Não nos responsabilizamos 
               por atrasos causados por terceiros (transportadoras, correios) ou eventos de força maior.
             </p>
           </section>
 
           <section className="space-y-3">
             <h2 className="text-xl font-semibold text-foreground">6. Trocas e Devoluções</h2>
             <p>
               Você tem até 7 dias corridos após o recebimento do produto para solicitar a troca ou devolução, 
               conforme previsto no Código de Defesa do Consumidor. O produto deve estar lacrado e em sua 
               embalagem original.
             </p>
           </section>
 
           <section className="space-y-3">
             <h2 className="text-xl font-semibold text-foreground">7. Propriedade Intelectual</h2>
             <p>
               Todo o conteúdo do site, incluindo textos, gráficos, logos, imagens e software, é propriedade 
               da Power Hair ou de seus licenciadores e está protegido por leis de direitos autorais.
             </p>
           </section>
 
           <section className="space-y-3">
             <h2 className="text-xl font-semibold text-foreground">8. Limitação de Responsabilidade</h2>
             <p>
               A Power Hair não será responsável por quaisquer danos indiretos, incidentais, especiais ou 
               consequentes resultantes do uso ou incapacidade de uso do site ou produtos.
             </p>
           </section>
 
           <section className="space-y-3">
             <h2 className="text-xl font-semibold text-foreground">9. Alterações nos Termos</h2>
             <p>
               Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entrarão 
               em vigor imediatamente após sua publicação no site.
             </p>
           </section>
 
           <section className="space-y-3">
             <h2 className="text-xl font-semibold text-foreground">10. Contato</h2>
             <p>
               Para dúvidas sobre estes Termos de Uso, entre em contato conosco:
             </p>
             <ul className="list-none space-y-1">
               <li>E-mail: contato@powerhair.com.br</li>
               <li>Telefone: 0800 123 4567</li>
             </ul>
           </section>
         </div>
       </main>
       
       <Footer />
     </div>
   );
 };
 
 export default TermsOfUse;