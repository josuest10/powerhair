import Header from "@/components/Header";
import Footer from "@/components/Footer";

const HelpCenter = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container max-w-4xl mx-auto px-4 md:px-6 py-12">
        <h1 className="text-3xl font-bold text-foreground mb-8">Central de Ajuda</h1>
        
        <div className="prose prose-sm max-w-none text-muted-foreground space-y-6">
          <p className="text-sm text-muted-foreground">
            Encontre respostas para as dúvidas mais frequentes sobre a Power Hair.
          </p>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">Perguntas Frequentes</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-foreground">Como faço meu pedido?</h3>
                <p>
                  Basta acessar nosso site, escolher o produto desejado e clicar em "Comprar Agora". 
                  Preencha seus dados de entrega e finalize o pagamento via PIX.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-foreground">Quais formas de pagamento são aceitas?</h3>
                <p>
                  Atualmente aceitamos pagamento via PIX, que oferece 5% de desconto e confirmação 
                  instantânea do pedido.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-foreground">Quanto tempo demora para o pedido chegar?</h3>
                <p>
                  O prazo de entrega varia de 3 a 15 dias úteis, dependendo da sua região e da 
                  modalidade de frete escolhida. Após o envio, você receberá o código de rastreamento por e-mail.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-foreground">Posso rastrear meu pedido?</h3>
                <p>
                  Sim! Após a postagem, enviaremos um e-mail com o código de rastreamento dos Correios. 
                  Você pode acompanhar a entrega pelo site dos Correios ou pelo app.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-foreground">E se eu não estiver em casa na hora da entrega?</h3>
                <p>
                  Os Correios tentarão entregar até 3 vezes. Caso não consigam, o pedido ficará disponível 
                  na agência mais próxima por até 7 dias.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-foreground">Os produtos têm garantia?</h3>
                <p>
                  Sim, todos os produtos Power Hair possuem garantia contra defeitos de fabricação. 
                  Caso receba um produto com problema, entre em contato em até 30 dias.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-foreground">Como funciona a política de devolução?</h3>
                <p>
                  Você pode solicitar a devolução em até 7 dias após o recebimento, desde que o produto 
                  esteja lacrado e na embalagem original. Consulte nossa página de Trocas e Devoluções 
                  para mais detalhes.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">Ainda precisa de ajuda?</h2>
            <p>
              Nossa equipe de atendimento está pronta para ajudar você:
            </p>
            <ul className="list-none space-y-1">
              <li><strong>E-mail:</strong> contato@powerhair.com.br</li>
              <li><strong>Telefone:</strong> 0800 123 4567</li>
              <li><strong>Horário:</strong> Segunda a sexta, das 9h às 18h</li>
            </ul>
            <p>
              Tempo médio de resposta: até 24 horas úteis.
            </p>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HelpCenter;
