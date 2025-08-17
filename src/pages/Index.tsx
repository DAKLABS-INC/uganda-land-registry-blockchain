import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, MapPin, Users, FileText, Lock, CheckCircle, Globe, Smartphone } from "lucide-react";
import AuthForm from "@/components/AuthForm";
import Dashboard from "./Dashboard";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [userRole, setUserRole] = useState<"administrator" | "surveyor" | "valuer" | "registrar">("administrator");

  const handleLogin = (role: "administrator" | "surveyor" | "valuer" | "registrar") => {
    setUserRole(role);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (isAuthenticated) {
    return <Dashboard userRole={userRole} onLogout={handleLogout} />;
  }

  if (showAuthForm) {
    return <AuthForm onLogin={handleLogin} />;
  }

  const features = [
    {
      icon: Shield,
      title: "Blockchain Security",
      description: "Immutable records powered by blockchain technology ensure data integrity and prevent fraud."
    },
    {
      icon: MapPin,
      title: "Land Registration",
      description: "Streamlined digital registration process with GPS coordinates and metadata stored on IPFS."
    },
    {
      icon: Users,
      title: "Role-Based Access",
      description: "Secure authentication for administrators, surveyors, valuers, and registrars."
    },
    {
      icon: FileText,
      title: "NFT Land Titles",
      description: "Digital land titles as NFTs with complete ownership history and transfer capabilities."
    },
    {
      icon: Lock,
      title: "Secure Transfers",
      description: "Multi-step verification process ensures legitimate ownership transfers with proper documentation."
    },
    {
      icon: CheckCircle,
      title: "Instant Verification",
      description: "Quick land title verification and ownership history lookup through blockchain queries."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-card border-b shadow-soft sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Uganda Land Registry</h1>
              <Badge variant="secondary" className="text-xs">Blockchain-Powered</Badge>
            </div>
          </div>
          <Button variant="uganda" onClick={() => setShowAuthForm(true)}>
            Ministry Access
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-hero py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 text-uganda-black">
              🇺🇬 Republic of Uganda • Ministry of Lands
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Digital Land Registry
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Revolutionizing land registration in Uganda through blockchain technology. 
              Secure, transparent, and immutable land title management for the digital age.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="registry" className="shadow-strong">
                <FileText className="w-5 h-5 mr-2" />
                Register Land Title
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20">
                <Globe className="w-5 h-5 mr-2" />
                Verify Ownership
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Modern Land Registry System
            </h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built for Uganda's future, powered by blockchain technology to ensure transparency, 
              security, and efficiency in land registration processes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-medium hover:shadow-strong transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Flow */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Land Registration Process
            </h3>
            <p className="text-xl text-muted-foreground">
              Streamlined workflow ensuring accuracy and legal compliance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Survey & Documentation", desc: "GPS survey and document verification" },
              { step: "02", title: "Valuation & Assessment", desc: "Professional property valuation" },
              { step: "03", title: "Blockchain Registration", desc: "Immutable NFT title creation" },
              { step: "04", title: "Digital Title Issuance", desc: "Secure digital title delivery" }
            ].map((item, index) => (
              <Card key={index} className="shadow-soft text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-uganda-black">{item.step}</span>
                  </div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">{item.title}</h4>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "2,847", label: "Registered Properties" },
              { number: "156", label: "Verified Officials" },
              { number: "99.8%", label: "Success Rate" },
              { number: "24/7", label: "System Availability" }
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Authentication Section */}
      <section id="auth" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Ministry of Lands Access
            </h3>
            <p className="text-xl text-muted-foreground mb-8">
              Secure portal for authorized government officials to manage land registration processes
            </p>
            <Button 
              size="lg" 
              variant="hero"
              onClick={() => setShowAuthForm(true)}
              className="shadow-medium"
            >
              <Shield className="w-5 h-5 mr-2" />
              Access Ministry Portal
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-uganda-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold">Uganda Land Registry</h4>
                  <p className="text-white/80 text-sm">Ministry of Lands, Housing and Urban Development</p>
                </div>
              </div>
              <p className="text-white/70 text-sm">
                Digitizing Uganda's land registration system through innovative blockchain technology, 
                ensuring transparency and security for all land transactions.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2 text-sm text-white/70">
                <li>Land Registration</li>
                <li>Title Verification</li>
                <li>Transfer Process</li>
                <li>System Status</li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Contact</h5>
              <ul className="space-y-2 text-sm text-white/70">
                <li>Ministry of Lands</li>
                <li>Plot 16, Mackinnon Road</li>
                <li>Nakasero, Kampala</li>
                <li>+256 414 341 834</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center">
            <p className="text-white/70 text-sm">
              © 2024 Republic of Uganda - Ministry of Lands. All rights reserved. | Powered by Blockchain Technology
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Index;