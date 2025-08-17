import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, User, Lock } from "lucide-react";

interface AuthFormProps {
  onLogin: (role: "administrator" | "surveyor" | "valuer" | "registrar") => void;
}

const AuthForm = ({ onLogin }: AuthFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !role) return;
    
    setIsLoading(true);
    // Simulate authentication
    setTimeout(() => {
      onLogin(role as "administrator" | "surveyor" | "valuer" | "registrar");
      setIsLoading(false);
    }, 1000);
  };

  const roles = [
    { value: "administrator", label: "Administrator", desc: "System administration and oversight" },
    { value: "surveyor", label: "Licensed Surveyor", desc: "Land survey and measurement verification" },
    { value: "valuer", label: "Chief Government Valuer", desc: "Property valuation and assessment" },
    { value: "registrar", label: "Registrar of Titles", desc: "Final title registration and approval" }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-strong">
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-center">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-foreground">
              Uganda Land Registry
            </CardTitle>
            <p className="text-muted-foreground mt-2">
              Secure access for Ministry of Lands officials
            </p>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Official Email</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your.name@lands.go.ug"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your secure password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role" className="text-foreground">Official Role</Label>
              <Select value={role} onValueChange={setRole} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select your official role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((roleItem) => (
                    <SelectItem key={roleItem.value} value={roleItem.value}>
                      <div className="flex flex-col">
                        <span className="font-medium">{roleItem.label}</span>
                        <span className="text-xs text-muted-foreground">{roleItem.desc}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading || !email || !password || !role}
            >
              {isLoading ? "Authenticating..." : "Sign In to Dashboard"}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-secondary/50 rounded-lg">
            <p className="text-sm text-foreground font-medium">Demo Credentials:</p>
            <p className="text-xs text-muted-foreground mt-1">
              Use any email, password, and select a role to access the demo dashboard.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthForm;