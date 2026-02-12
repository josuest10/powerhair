import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ChevronRight,
  Leaf,
  Shield,
  Droplets,
  Zap,
  Truck,
  RotateCcw,
  Headphones,
  Star
} from "lucide-react";
import PromoBanner from "@/components/PromoBanner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Home = () => {
  const problems = [
    { emoji: "😰", text: "Cabelo caindo mais do que o normal?" },
    { emoji: "💔", text: "Fios fracos e quebradiços?" },
    { emoji: "🔴", text: "Couro cabeludo sensibilizado?" },
    { emoji: "🐌", text: "Crescimento lento demais?" },
  ];

  const principles = [
    {
      icon: Leaf,
      title: "Natureza que Cura",
      description: "Ingredientes fitoterápicos selecionados que trabalham em harmonia com seu corpo",
    },
    {
      icon: Droplets,
      title: "Nutrição Profunda",
      description: "Hidratação e fortalecimento desde a raiz até as pontas dos fios",
    },
    {
      icon: Shield,
      title: "Proteção Contínua",
      description: "Blindagem contra danos externos e prevenção de quebra",
    },
    {
      icon: Zap,
      title: "Estímulo Ativo",
      description: "Ativação dos folículos capilares para um crescimento saudável",
    },
  ];

  const stories = [
    {
      quote: "Eu já tinha desistido de ter cabelos bonitos...",
      author: "Maria, 34 anos",
      highlight: "Até descobrir que existia uma solução.",
    },
    {
      quote: "Tentei de tudo: vitaminas, óleos, tratamentos caros...",
      author: "Juliana, 28 anos",
      highlight: "Nada funcionava até eu mudar minha abordagem.",
    },
    {
      quote: "Achava que queda de cabelo era genético e pronto...",
      author: "Ana Paula, 41 anos",
      highlight: "Descobri que estava errada.",
    },
  ];

  const heroImage =
    "https://cdn.awsli.com.br/2500x2500/2814/2814407/produto/347799082/whatsapp-image-2023-09-06-at-10-41-32-eaicsvr39k-ylddlj70fy.jpeg";

  return (
    <div className="min-h-screen bg-background">
      <PromoBanner />
      <Header />

      {/* Hero - Clean, ForPatas style */}
      <section className="py-10 md:py-16">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-3">
                Kit SOS Crescimento e Antiqueda
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-4">
                Seu cabelo merece{" "}
                <span className="text-primary">uma segunda chance</span>
              </h1>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Milhares de mulheres já recuperaram a autoestima e a confiança.
                E se você pudesse ser a próxima?
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className="rounded-full px-8">
                  <Link to="/">
                    Quero Conhecer a Solução
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </div>
              <div className="flex items-center gap-4 mt-5 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-primary" /> Frete Grátis
                </span>
                <span className="flex items-center gap-1">
                  <RotateCcw className="w-3.5 h-3.5 text-primary" /> Troca Grátis
                </span>
                <span className="flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-primary" /> Compra Segura
                </span>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <img
                src={heroImage}
                alt="Kit SOS Crescimento e Antiqueda"
                className="rounded-2xl w-full max-w-sm mx-auto shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-y border-border bg-muted/40">
        <div className="container max-w-5xl mx-auto px-4 py-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="flex flex-col items-center gap-1">
              <Truck className="w-5 h-5 text-primary" />
              <span className="text-xs font-medium text-foreground">Frete Grátis</span>
              <span className="text-[10px] text-muted-foreground">Todo Brasil</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <RotateCcw className="w-5 h-5 text-primary" />
              <span className="text-xs font-medium text-foreground">Troca Grátis</span>
              <span className="text-[10px] text-muted-foreground">Até 7 dias</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Headphones className="w-5 h-5 text-primary" />
              <span className="text-xs font-medium text-foreground">Suporte</span>
              <span className="text-[10px] text-muted-foreground">Via WhatsApp</span>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-12 md:py-16">
        <div className="container max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-2">
            Você se identifica?
          </h2>
          <p className="text-center text-muted-foreground text-sm mb-8">
            Se disse "sim" para qualquer uma, <span className="text-primary font-medium">você não está sozinha.</span>
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {problems.map((problem, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-card border border-border rounded-xl p-4 hover:border-primary/40 transition-colors"
              >
                <span className="text-xl">{problem.emoji}</span>
                <span className="text-sm text-foreground">{problem.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy / Science Section */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-2">
            A ciência por trás da <span className="text-primary">transformação</span>
          </h2>
          <p className="text-center text-muted-foreground text-sm mb-10 max-w-xl mx-auto">
            Tratamentos que respeitam a biologia do seu cabelo e trabalham com ela, não contra ela.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {principles.map((principle, index) => (
              <div key={index} className="bg-card border border-border rounded-xl p-5 text-center hover:shadow-md transition-shadow">
                <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <principle.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground text-sm mb-1">{principle.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stories / Testimonials */}
      <section className="py-12 md:py-16">
        <div className="container max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-8">
            Histórias reais de mulheres reais
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {stories.map((story, index) => (
              <div key={index} className="bg-card border border-border rounded-xl p-5 text-center">
                <div className="flex justify-center gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-rating text-rating" />
                  ))}
                </div>
                <blockquote className="text-sm text-muted-foreground italic mb-3">
                  "{story.quote}"
                </blockquote>
                <p className="text-primary text-sm font-medium mb-1">{story.highlight}</p>
                <p className="text-xs text-muted-foreground">— {story.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 md:py-16 bg-primary">
        <div className="container max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-3">
            A mudança que você procura pode estar a um clique de distância
          </h2>
          <p className="text-primary-foreground/80 text-sm mb-6 max-w-md mx-auto">
            Ciência, cuidado e resultados comprovados por milhares de mulheres.
          </p>
          <Button asChild size="lg" variant="secondary" className="rounded-full px-8">
            <Link to="/">
              Descobrir a Solução
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
