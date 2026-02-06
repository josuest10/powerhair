import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Sparkles, 
  Leaf, 
  Shield, 
  Clock, 
  Star, 
  ChevronRight,
  CheckCircle2,
  Zap,
  Heart,
  Award
} from "lucide-react";
import Footer from "@/components/Footer";

const Home = () => {
  const benefits = [
    {
      icon: Leaf,
      title: "100% Natural",
      description: "Fórmula fitoterápica com ingredientes naturais que respeitam seu couro cabeludo"
    },
    {
      icon: Zap,
      title: "Ação Rápida",
      description: "Resultados visíveis nas primeiras semanas de uso contínuo"
    },
    {
      icon: Shield,
      title: "Combate a Queda",
      description: "Fortalece os fios desde a raiz, reduzindo a queda capilar"
    },
    {
      icon: Sparkles,
      title: "Estimula Crescimento",
      description: "Ativa os folículos capilares para um crescimento saudável"
    }
  ];

  const results = [
    { number: "847+", label: "Avaliações 5 estrelas" },
    { number: "95%", label: "Clientes satisfeitos" },
    { number: "3x", label: "Mais crescimento" },
    { number: "15", label: "Dias para resultados" }
  ];

  const testimonials = [
    {
      name: "Maria S.",
      location: "São Paulo, SP",
      text: "Depois de 3 semanas usando o kit, meu cabelo parou de cair! Estou impressionada com os resultados.",
      rating: 5
    },
    {
      name: "Ana Paula R.",
      location: "Rio de Janeiro, RJ",
      text: "Já testei vários produtos e esse foi o único que realmente funcionou. Meu cabelo está mais forte e brilhante.",
      rating: 5
    },
    {
      name: "Juliana M.",
      location: "Belo Horizonte, MG",
      text: "O tônico é incrível! Sinto meu couro cabeludo mais saudável e os fios novos já estão aparecendo.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-primary/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.1),transparent_50%)]" />
        <div className="container max-w-6xl mx-auto px-4 py-16 md:py-24 relative">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                Tratamento Profissional
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Cabelos Fortes e{" "}
                <span className="text-primary">Saudáveis</span>{" "}
                Começam Aqui
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-lg">
                O Kit SOS Crescimento e Antiqueda combina tecnologia capilar avançada com ingredientes naturais para transformar seus cabelos.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button asChild size="lg" className="text-lg px-8 py-6 rounded-full shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all">
                  <Link to="/">
                    Quero Transformar Meu Cabelo
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </div>
              
              <div className="flex items-center gap-4 justify-center md:justify-start pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center">
                      <span className="text-xs font-medium text-primary">👤</span>
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <span className="text-muted-foreground">+847 clientes satisfeitos</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/10 rounded-3xl blur-3xl" />
              <img 
                src="https://cdn.awsli.com.br/2500x2500/2814/2814407/produto/347799082/whatsapp-image-2023-09-06-at-10-41-32-eaicsvr39k-ylddlj70fy.jpeg"
                alt="Kit SOS Crescimento e Antiqueda"
                className="relative rounded-2xl shadow-2xl w-full max-w-md mx-auto"
              />
              <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full font-bold shadow-lg">
                5% OFF no PIX
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-primary/5 border-y border-primary/10">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {results.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary">{stat.number}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Por que escolher o <span className="text-primary">SOS Crescimento</span>?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Um tratamento completo desenvolvido por especialistas para combater a queda e estimular o crescimento saudável dos fios.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-primary/10 hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/10 group">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <benefit.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Product Highlight */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 to-background">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Kit Completo para{" "}
                <span className="text-primary">Resultados Reais</span>
              </h2>
              
              <div className="space-y-4 mb-8">
                {[
                  "Shampoo SOS 300ml - Limpeza profunda e fortalecedora",
                  "Máscara SOS 300g - Nutrição intensiva dos fios",
                  "Tônico Fortalecedor 100ml - Estimula o crescimento",
                  "BRINDE: Pente Massageador para Couro Cabeludo"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl font-bold text-primary">R$ 79,90</span>
                <span className="text-lg text-muted-foreground line-through">R$ 209,70</span>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                  62% OFF
                </span>
              </div>
              
              <Button asChild size="lg" className="w-full md:w-auto text-lg px-8 py-6 rounded-full shadow-lg shadow-primary/30">
                <Link to="/">
                  Ver Oferta Completa
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
            
            <div className="order-1 md:order-2">
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="https://cdn.awsli.com.br/400x400/2814/2814407/produto/347799082/whatsapp-image-2023-09-06-at-10-41-32-eaicsvr39k-ylddlj70fy.jpeg"
                  alt="Shampoo SOS"
                  className="rounded-xl shadow-lg"
                />
                <img 
                  src="https://cdn.awsli.com.br/400x400/2814/2814407/produto/347799082/whatsapp-image-2023-09-06-at-10-35-03--1--nhlvvncapn-216zxetspe.jpeg"
                  alt="Máscara SOS"
                  className="rounded-xl shadow-lg"
                />
                <img 
                  src="https://cdn.awsli.com.br/400x400/2814/2814407/produto/347799082/whatsapp-image-2023-09-06-at-10-35-03--2--ikuz221p1v-ucdpgudncg.jpeg"
                  alt="Tônico SOS"
                  className="rounded-xl shadow-lg"
                />
                <div className="bg-primary/10 rounded-xl flex items-center justify-center p-6">
                  <div className="text-center">
                    <Award className="w-10 h-10 text-primary mx-auto mb-2" />
                    <span className="text-sm font-medium text-primary">Frete Grátis</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              O que nossas <span className="text-primary">clientes</span> dizem
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-primary/10">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Heart className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">{testimonial.name}</div>
                      <div className="text-xs text-muted-foreground">{testimonial.location}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-primary">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Pronta para ter cabelos mais fortes?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Não deixe a queda de cabelo afetar sua autoestima. Comece hoje mesmo o tratamento que já transformou milhares de cabelos.
          </p>
          <Button asChild size="lg" variant="secondary" className="text-lg px-10 py-6 rounded-full shadow-xl">
            <Link to="/">
              Comprar Agora com Desconto
              <ChevronRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
          <p className="text-primary-foreground/60 text-sm mt-4">
            ✓ Frete Grátis &nbsp; ✓ 5% OFF no PIX &nbsp; ✓ Entrega Rápida
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
