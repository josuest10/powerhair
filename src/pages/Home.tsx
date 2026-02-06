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

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Emotional */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-primary/10" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        
        <div className="container max-w-5xl mx-auto px-4 py-20 relative text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-5 py-2.5 rounded-full text-sm font-medium mb-8">
            <Sparkles className="w-4 h-4" />
            Lizzante Profissional
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6">
            Seu cabelo merece{" "}
            <span className="text-primary block mt-2">uma segunda chance</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Milhares de mulheres já recuperaram a autoestima e a confiança. 
            E se você pudesse ser a próxima?
          </p>
          
          <Button asChild size="lg" className="text-lg px-10 py-7 rounded-full shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 transition-all">
            <Link to="/">
              Quero Conhecer a Solução
              <ChevronRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <Wind className="w-12 h-12 text-primary/40 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">
            Você se identifica?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4 mb-12">
            {problems.map((problem, index) => (
              <div 
                key={index}
                className="bg-background border border-border rounded-2xl p-6 text-left flex items-center gap-4 hover:border-primary/30 transition-colors"
              >
                <div className="w-3 h-3 rounded-full bg-primary/60 flex-shrink-0" />
                <span className="text-lg text-muted-foreground">{problem}</span>
              </div>
            ))}
          </div>
          
          <p className="text-xl text-foreground font-medium">
            Se você disse "sim" para qualquer uma dessas perguntas,{" "}
            <span className="text-primary">você não está sozinha.</span>
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 md:py-28">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              A ciência por trás da <span className="text-primary">transformação</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Não acreditamos em milagres. Acreditamos em tratamentos que respeitam 
              a biologia do seu cabelo e trabalham com ela, não contra ela.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((principle, index) => (
              <Card key={index} className="border-0 bg-muted/30 hover:bg-muted/50 transition-colors">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                    <principle.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground text-lg mb-3">{principle.title}</h3>
                  <p className="text-muted-foreground">{principle.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stories Section */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-background to-primary/5">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <Heart className="w-10 h-10 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Histórias reais de mulheres reais
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {stories.map((story, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">💬</span>
                </div>
                <blockquote className="text-lg text-muted-foreground italic mb-4">
                  "{story.quote}"
                </blockquote>
                <p className="text-primary font-medium mb-2">{story.highlight}</p>
                <p className="text-sm text-muted-foreground">— {story.author}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <p className="text-xl text-foreground mb-8">
              Quer descobrir o que elas descobriram?
            </p>
            <Button asChild size="lg" variant="outline" className="text-lg px-10 py-6 rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <Link to="/">
                Ver Como Funciona
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 md:py-32 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary-foreground)/0.1),transparent_70%)]" />
        
        <div className="container max-w-3xl mx-auto px-4 text-center relative">
          <Sparkles className="w-12 h-12 text-primary-foreground/60 mx-auto mb-6" />
          
          <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-6 leading-tight">
            A mudança que você procura pode estar a um clique de distância
          </h2>
          
          <p className="text-primary-foreground/80 text-lg mb-10 max-w-xl mx-auto">
            Não prometemos milagres. Prometemos ciência, cuidado e resultados 
            comprovados por milhares de mulheres.
          </p>
          
          <Button asChild size="lg" variant="secondary" className="text-lg px-12 py-7 rounded-full shadow-2xl">
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
