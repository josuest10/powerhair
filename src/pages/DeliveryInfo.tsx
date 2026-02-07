import Header from "@/components/Header";
import Footer from "@/components/Footer";

const DeliveryInfo = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container max-w-4xl mx-auto px-4 md:px-6 py-12">
        <h1 className="text-3xl font-bold text-foreground mb-8">Prazo de Entrega</h1>
        
        <div className="prose prose-sm max-w-none text-muted-foreground space-y-6">
          <p className="text-sm text-muted-foreground">
            Informações sobre prazos e modalidades de entrega da Power Hair.
          </p>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">Modalidades de Frete</h2>
            <p>
              Oferecemos duas opções de entrega para você escolher a que melhor atende suas necessidades:
            </p>
            
            <div className="space-y-4">
              <div className="border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground">Frete Grátis</h3>
                <p className="text-sm">Prazo: 5 a 9 dias úteis</p>
                <p className="text-sm">Valor: Grátis para todo o Brasil</p>
              </div>
              
              <div className="border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground">SEDEX</h3>
                <p className="text-sm">Prazo: 3 a 5 dias úteis</p>
                <p className="text-sm">Valor: R$ 12,49</p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">Prazo por Região</h2>
            <p>
              Os prazos podem variar de acordo com a sua região. Confira a estimativa:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Sudeste:</strong> 3 a 5 dias úteis</li>
              <li><strong>Sul:</strong> 4 a 6 dias úteis</li>
              <li><strong>Centro-Oeste:</strong> 5 a 8 dias úteis</li>
              <li><strong>Nordeste:</strong> 6 a 10 dias úteis</li>
              <li><strong>Norte:</strong> 8 a 12 dias úteis</li>
            </ul>
            <p className="text-sm">
              *Os prazos começam a contar após a confirmação do pagamento e são em dias úteis.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">Processamento do Pedido</h2>
            <p>
              Após a confirmação do pagamento via PIX, seu pedido passa pelas seguintes etapas:
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li><strong>Confirmação:</strong> Pagamento confirmado (instantâneo para PIX)</li>
              <li><strong>Separação:</strong> Pedido separado e embalado (1 a 2 dias úteis)</li>
              <li><strong>Postagem:</strong> Envio aos Correios (até 24h após separação)</li>
              <li><strong>Em trânsito:</strong> Pedido a caminho do seu endereço</li>
              <li><strong>Entregue:</strong> Produto em suas mãos!</li>
            </ol>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">Rastreamento</h2>
            <p>
              Assim que seu pedido for postado, você receberá um e-mail com o código de rastreamento. 
              Com ele, você pode acompanhar a entrega pelo site ou app dos Correios.
            </p>
            <p>
              <strong>Dica:</strong> O código pode levar até 24 horas para ser atualizado no sistema dos Correios.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">Tentativas de Entrega</h2>
            <p>
              Os Correios realizam até 3 tentativas de entrega no endereço informado. 
              Caso não haja ninguém para receber:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Será deixado um aviso de tentativa de entrega</li>
              <li>O pacote ficará disponível na agência por até 7 dias</li>
              <li>Após esse prazo, será devolvido ao remetente</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">Dúvidas sobre entrega?</h2>
            <p>
              Entre em contato conosco:
            </p>
            <ul className="list-none space-y-1">
              <li><strong>E-mail:</strong> contato@powerhair.com.br</li>
              <li><strong>Telefone:</strong> 0800 123 4567</li>
              <li><strong>Horário:</strong> Segunda a sexta, das 9h às 18h</li>
            </ul>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DeliveryInfo;
