 import Header from "@/components/Header";
 import Footer from "@/components/Footer";
 
 const PrivacyPolicy = () => {
   return (
     <div className="min-h-screen bg-background">
       <Header />
       
       <main className="container max-w-4xl mx-auto px-4 md:px-6 py-12">
         <h1 className="text-3xl font-bold text-foreground mb-8">Política de Privacidade</h1>
         
         <div className="prose prose-sm max-w-none text-muted-foreground space-y-6">
           <p className="text-sm text-muted-foreground">
             Última atualização: 05 de fevereiro de 2026
           </p>
 
           <section className="space-y-3">
             <h2 className="text-xl font-semibold text-foreground">1. Introdução</h2>
             <p>
               A Power Hair está comprometida em proteger sua privacidade. Esta Política de Privacidade 
               explica como coletamos, usamos, divulgamos e protegemos suas informações pessoais quando 
               você utiliza nosso site e serviços.
             </p>
           </section>
 
           <section className="space-y-3">
             <h2 className="text-xl font-semibold text-foreground">2. Informações que Coletamos</h2>
             <p>Podemos coletar os seguintes tipos de informações:</p>
             <ul className="list-disc pl-6 space-y-1">
               <li><strong>Dados pessoais:</strong> nome, e-mail, telefone, CPF, endereço de entrega</li>
               <li><strong>Dados de pagamento:</strong> informações de cartão de crédito (processadas de forma segura)</li>
               <li><strong>Dados de navegação:</strong> endereço IP, tipo de navegador, páginas visitadas</li>
               <li><strong>Dados de compra:</strong> histórico de pedidos, preferências de produtos</li>
             </ul>
           </section>
 
           <section className="space-y-3">
             <h2 className="text-xl font-semibold text-foreground">3. Como Usamos suas Informações</h2>
             <p>Utilizamos suas informações para:</p>
             <ul className="list-disc pl-6 space-y-1">
               <li>Processar e entregar seus pedidos</li>
               <li>Enviar confirmações de pedido e atualizações de entrega</li>
               <li>Responder a suas perguntas e solicitações</li>
               <li>Enviar comunicações de marketing (com seu consentimento)</li>
               <li>Melhorar nosso site e serviços</li>
               <li>Prevenir fraudes e garantir a segurança</li>
             </ul>
           </section>
 
           <section className="space-y-3">
             <h2 className="text-xl font-semibold text-foreground">4. Compartilhamento de Dados</h2>
             <p>
               Não vendemos suas informações pessoais. Podemos compartilhar seus dados com:
             </p>
             <ul className="list-disc pl-6 space-y-1">
               <li>Processadores de pagamento para concluir transações</li>
               <li>Transportadoras para entrega de produtos</li>
               <li>Prestadores de serviços que nos auxiliam nas operações</li>
               <li>Autoridades legais quando exigido por lei</li>
             </ul>
           </section>
 
           <section className="space-y-3">
             <h2 className="text-xl font-semibold text-foreground">5. Cookies</h2>
             <p>
               Utilizamos cookies e tecnologias similares para melhorar sua experiência no site, 
               lembrar suas preferências e analisar o tráfego. Você pode configurar seu navegador 
               para recusar cookies, mas isso pode afetar algumas funcionalidades do site.
             </p>
           </section>
 
           <section className="space-y-3">
             <h2 className="text-xl font-semibold text-foreground">6. Segurança dos Dados</h2>
             <p>
               Implementamos medidas de segurança técnicas e organizacionais para proteger suas 
               informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição. 
               Utilizamos criptografia SSL para proteger dados transmitidos.
             </p>
           </section>
 
           <section className="space-y-3">
             <h2 className="text-xl font-semibold text-foreground">7. Seus Direitos (LGPD)</h2>
             <p>De acordo com a Lei Geral de Proteção de Dados, você tem direito a:</p>
             <ul className="list-disc pl-6 space-y-1">
               <li>Confirmar a existência de tratamento de seus dados</li>
               <li>Acessar seus dados pessoais</li>
               <li>Corrigir dados incompletos, inexatos ou desatualizados</li>
               <li>Solicitar a exclusão de seus dados</li>
               <li>Revogar o consentimento para uso de dados</li>
               <li>Solicitar a portabilidade dos dados</li>
             </ul>
           </section>
 
           <section className="space-y-3">
             <h2 className="text-xl font-semibold text-foreground">8. Retenção de Dados</h2>
             <p>
               Mantemos suas informações pessoais pelo tempo necessário para cumprir as finalidades 
               descritas nesta política, a menos que um período de retenção mais longo seja exigido 
               ou permitido por lei.
             </p>
           </section>
 
           <section className="space-y-3">
             <h2 className="text-xl font-semibold text-foreground">9. Alterações nesta Política</h2>
             <p>
               Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos sobre 
               alterações significativas por e-mail ou através de um aviso em nosso site.
             </p>
           </section>
 
           <section className="space-y-3">
             <h2 className="text-xl font-semibold text-foreground">10. Contato</h2>
             <p>
               Para exercer seus direitos ou tirar dúvidas sobre esta política:
             </p>
             <ul className="list-none space-y-1">
               <li>E-mail: privacidade@powerhair.com.br</li>
               <li>Telefone: 0800 123 4567</li>
             </ul>
           </section>
         </div>
       </main>
       
       <Footer />
     </div>
   );
 };
 
 export default PrivacyPolicy;