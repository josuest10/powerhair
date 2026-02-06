import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Sparkles, 
  Leaf, 
  Shield, 
  ChevronRight,
  Zap,
  Heart,
  Droplets,
  Wind
} from "lucide-react";
import PromoBanner from "@/components/PromoBanner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Home = () => {
  const problems = [
    "Cabelo caindo mais do que o normal?",
    "Fios fracos e quebradiços?",
    "Couro cabeludo sensibilizado?",
    "Crescimento lento demais?"
  ];

  const principles = [
    {
      icon: Leaf,
      title: "Natureza que Cura",
      description: "Ingredientes fitoterápicos selecionados que trabalham em harmonia com seu corpo"
    },
    {
      icon: Droplets,
      title: "Nutrição Profunda",
      description: "Hidratação e fortalecimento desde a raiz até as pontas dos fios"
    },
    {
      icon: Shield,
      title: "Proteção Contínua",
      description: "Blindagem contra danos externos e prevenção de quebra"
    },
    {
      icon: Zap,
      title: "Estímulo Ativo",
      description: "Ativação dos folículos capilares para um crescimento saudável"
    }
  ];

  const stories = [
    {
      quote: "Eu já tinha desistido de ter cabelos bonitos...",
      author: "Maria, 34 anos",
      highlight: "Até descobrir que existia uma solução."
    },
    {
      quote: "Tentei de tudo: vitaminas, óleos, tratamentos caros...",
      author: "Juliana, 28 anos", 
      highlight: "Nada funcionava até eu mudar minha abordagem."
    },
    {
      quote: "Achava que queda de cabelo era genético e pronto...",
      author: "Ana Paula, 41 anos",
      highlight: "Descobri que estava errada."
    }
  ];

  const productImages = [
    "https://cdn.awsli.com.br/2500x2500/2814/2814407/produto/347799082/whatsapp-image-2023-09-06-at-10-41-32-eaicsvr39k-ylddlj70fy.jpeg",
    "https://cdn.awsli.com.br/2500x2500/2814/2814407/produto/347799082/whatsapp-image-2023-09-06-at-10-35-03--1--nhlvvncapn-216zxetspe.jpeg",
    "https://cdn.awsli.com.br/2500x2500/2814/2814407/produto/347799082/whatsapp-image-2023-09-06-at-10-35-03--2--ikuz221p1v-ucdpgudncg.jpeg",
  ];

  return (
    <div className="min-h-screen bg-background">
      <PromoBanner />
      <Header />

      {/* Hero Section - Emotional */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        
        <div className="container max-w-6xl mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-5 py-2.5 rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                Kit SOS Crescimento e Antiqueda
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
                Seu cabelo merece{" "}
                <span className="text-primary">uma segunda chance</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-lg mb-8 leading-relaxed">
                Milhares de mulheres já recuperaram a autoestima e a confiança. 
                E se você pudesse ser a próxima?
              </p>
              
              <Button asChild size="lg" className="text-lg px-8 py-6 rounded-full shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 transition-all">
                <Link to="/">
                  Quero Conhecer a Solução
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/10 rounded-3xl blur-3xl" />
              <img 
                src={productImages[0]}
                alt="Kit SOS Crescimento e Antiqueda"
                className="relative rounded-2xl shadow-2xl w-full max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <Wind className="w-12 h-12 text-primary/40 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10">
            Você se identifica?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4 mb-10">
            {problems.map((problem, index) => (
              <div 
                key={index}
                className="bg-background border border-border rounded-2xl p-5 text-left flex items-center gap-4 hover:border-primary/30 transition-colors"
              >
                <div className="w-3 h-3 rounded-full bg-primary/60 flex-shrink-0" />
                <span className="text-muted-foreground">{problem}</span>
              </div>
            ))}
          </div>
          
          <p className="text-lg text-foreground font-medium">
            Se você disse "sim" para qualquer uma dessas perguntas,{" "}
            <span className="text-primary">você não está sozinha.</span>
          </p>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-16 md:py-24">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="grid grid-cols-3 gap-4">
              {productImages.map((img, index) => (
                <div key={index} className="relative group">
                  <div className="absolute -inset-2 bg-primary/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <img 
                    src={img}
                    alt={`Produto ${index + 1}`}
                    className="relative rounded-xl shadow-lg w-full aspect-square object-cover"
                  />
                </div>
              ))}
            </div>
            
            <div className="text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Um tratamento <span className="text-primary">completo</span> para seus fios
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Shampoo, máscara e tônico trabalhando juntos em sinergia. 
                Cada produto foi desenvolvido para potencializar o efeito do outro, 
                criando um ciclo de fortalecimento e crescimento.
              </p>
              <p className="text-muted-foreground mb-8">
                Descubra por que mais de 800 mulheres avaliaram esse kit com 5 estrelas.
              </p>
              <Button asChild variant="outline" size="lg" className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-6">
                <Link to="/">
                  Ver Detalhes do Kit
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              A ciência por trás da <span className="text-primary">transformação</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Não acreditamos em milagres. Acreditamos em tratamentos que respeitam 
              a biologia do seu cabelo e trabalham com ela, não contra ela.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((principle, index) => (
              <Card key={index} className="border-0 bg-background hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <principle.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{principle.title}</h3>
                  <p className="text-sm text-muted-foreground">{principle.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stories Section */}
      <section className="py-16 md:py-24">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <Heart className="w-10 h-10 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Histórias reais de mulheres reais
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {stories.map((story, index) => (
              <div key={index} className="text-center bg-muted/30 rounded-2xl p-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 mx-auto mb-5 flex items-center justify-center">
                  <span className="text-2xl">💬</span>
                </div>
                <blockquote className="text-muted-foreground italic mb-4">
                  "{story.quote}"
                </blockquote>
                <p className="text-primary font-medium mb-1">{story.highlight}</p>
                <p className="text-sm text-muted-foreground">— {story.author}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-lg text-foreground mb-6">
              Quer descobrir o que elas descobriram?
            </p>
            <Button asChild variant="outline" size="lg" className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-6">
              <Link to="/">
                Ver Como Funciona
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary-foreground)/0.1),transparent_70%)]" />
        
        <div className="container max-w-3xl mx-auto px-4 text-center relative">
          <Sparkles className="w-10 h-10 text-primary-foreground/60 mx-auto mb-5" />
          
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-5 leading-tight">
            A mudança que você procura pode estar a um clique de distância
          </h2>
          
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Não prometemos milagres. Prometemos ciência, cuidado e resultados 
            comprovados por milhares de mulheres.
          </p>
          
          <Button asChild size="lg" variant="secondary" className="text-lg px-10 py-6 rounded-full shadow-2xl">
            <Link to="/">
              Descobrir a Solução
              <ChevronRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
