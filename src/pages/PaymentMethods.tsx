import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PaymentMethods = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container max-w-4xl mx-auto px-4 md:px-6 py-12">
        <h1 className="text-3xl font-bold text-foreground mb-8">Formas de Pagamento</h1>
        
        <div className="prose prose-sm max-w-none text-muted-foreground space-y-6">
          <p className="text-sm text-muted-foreground">
            Conheça as formas de pagamento disponíveis na Power Hair.
          </p>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">PIX</h2>
            <p>
              O PIX é nossa forma de pagamento principal e oferece as seguintes vantagens:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>5% de desconto</strong> no valor total do pedido</li>
              <li>Confirmação instantânea do pagamento</li>
              <li>Seu pedido é processado imediatamente</li>
              <li>Disponível 24 horas por dia, 7 dias por semana</li>
              <li>Seguro e prático — sem necessidade de cadastrar cartão</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">Como pagar com PIX</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Finalize seu pedido e escolha a opção PIX</li>
              <li>Um QR Code será gerado na tela</li>
              <li>Abra o aplicativo do seu banco e acesse a função PIX</li>
              <li>Escaneie o QR Code ou copie e cole o código</li>
              <li>Confirme o pagamento no seu banco</li>
              <li>Pronto! Seu pedido será processado automaticamente</li>
            </ol>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">Prazo para pagamento</h2>
            <p>
              Após gerar o PIX, você tem <strong>30 minutos</strong> para efetuar o pagamento. 
              Se o prazo expirar, será necessário iniciar um novo pedido.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">Segurança</h2>
            <p>
              Todas as transações são processadas com criptografia de ponta a ponta. 
              O PIX é regulamentado pelo Banco Central do Brasil e utiliza os mais altos 
              padrões de segurança do mercado financeiro.
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Ambiente 100% seguro com certificado SSL</li>
              <li>Não armazenamos dados bancários</li>
              <li>Pagamento direto pelo seu banco de confiança</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">Outras formas de pagamento</h2>
            <p>
              No momento, trabalhamos exclusivamente com PIX para garantir os melhores 
              descontos e a confirmação mais rápida possível do seu pedido.
            </p>
            <p>
              Em breve, disponibilizaremos pagamento via cartão de crédito e boleto bancário.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">Dúvidas?</h2>
            <p>
              Se tiver qualquer problema com o pagamento, entre em contato:
            </p>
            <ul className="list-none space-y-1">
              <li><strong>E-mail:</strong> contato@powerhair.com.br</li>
              <li><strong>Telefone:</strong> 0800 123 4567</li>
            </ul>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PaymentMethods;
