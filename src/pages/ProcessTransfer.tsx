import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Users, DollarSign, FileCheck, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TransferStep {
  id: string;
  title: string;
  description: string;
  amount: string;
  status: "pending" | "completed" | "current";
  icon: React.ElementType;
}

const ProcessTransfer = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [landId, setLandId] = useState("");
  const [currentOwner, setCurrentOwner] = useState("");
  const [newOwner, setNewOwner] = useState("");
  const [transferInitiated, setTransferInitiated] = useState(false);

  const transferSteps: TransferStep[] = [
    {
      id: "stamp_duty",
      title: "Stamp Duty Payment",
      description: "Payment of required stamp duty fees to Uganda Revenue Authority",
      amount: "UGX 150,000",
      status: transferInitiated ? "completed" : "pending",
      icon: DollarSign
    },
    {
      id: "surveyor",
      title: "Surveyor Verification",
      description: "Licensed surveyor verification of land boundaries and measurements",
      amount: "UGX 75,000",
      status: transferInitiated ? "current" : "pending",
      icon: FileCheck
    },
    {
      id: "valuer",
      title: "Chief Government Valuer",
      description: "Official land valuation and approval from Chief Government Valuer",
      amount: "UGX 100,000",
      status: "pending",
      icon: AlertCircle
    },
    {
      id: "registrar",
      title: "Registrar Final Approval",
      description: "Final verification and approval by the Land Registrar",
      amount: "UGX 50,000",
      status: "pending",
      icon: CheckCircle
    }
  ];

  const handleInitiateTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!landId || !currentOwner || !newOwner) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setTransferInitiated(true);
    toast({
      title: "Transfer Process Initiated",
      description: "Land transfer process has been started. Please complete all required steps.",
    });
  };

  const getStepIcon = (step: TransferStep) => {
    const Icon = step.icon;
    const baseClasses = "w-5 h-5";
    
    switch (step.status) {
      case "completed":
        return <CheckCircle className={`${baseClasses} text-green-600`} />;
      case "current":
        return <Clock className={`${baseClasses} text-yellow-600`} />;
      default:
        return <Icon className={`${baseClasses} text-gray-400`} />;
    }
  };

  const getStepColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-700 dark:text-green-300 border-green-200";
      case "current":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-300 border-yellow-200";
      default:
        return "bg-gray-500/10 text-gray-700 dark:text-gray-300 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-soft">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-xl font-bold text-foreground">Process Land Transfer</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-primary rounded-lg p-6 text-white mb-8 shadow-medium">
            <h2 className="text-2xl font-bold flex items-center">
              <Users className="w-6 h-6 mr-2" />
              Land Ownership Transfer
            </h2>
            <p className="text-white/80 mt-2">
              Secure blockchain-based land ownership transfer process with multi-stage verification.
            </p>
          </div>

          {!transferInitiated ? (
            /* Transfer Initiation Form */
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle>Transfer Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleInitiateTransfer} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="landId">Land ID</Label>
                      <Input
                        id="landId"
                        value={landId}
                        onChange={(e) => setLandId(e.target.value)}
                        placeholder="e.g., LT-2024-001"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currentOwner">Current Owner</Label>
                      <Input
                        id="currentOwner"
                        value={currentOwner}
                        onChange={(e) => setCurrentOwner(e.target.value)}
                        placeholder="Current owner's name"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="newOwner">New Owner</Label>
                    <Input
                      id="newOwner"
                      value={newOwner}
                      onChange={(e) => setNewOwner(e.target.value)}
                      placeholder="New owner's name"
                      required
                    />
                  </div>

                  <Separator />

                  <div className="bg-yellow-500/10 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertCircle className="w-5 h-5 text-yellow-600" />
                      <h4 className="font-semibold text-yellow-700 dark:text-yellow-300">
                        Transfer Process Requirements
                      </h4>
                    </div>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">
                      Once initiated, this transfer will require completion of all payment and verification steps 
                      before the NFT can be transferred to the new owner.
                    </p>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <Button type="button" variant="outline" onClick={() => navigate("/dashboard")}>
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-gradient-hero text-white">
                      Initiate Transfer Process
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          ) : (
            /* Transfer Process Steps */
            <div className="space-y-6">
              {/* Transfer Summary */}
              <Card className="shadow-medium">
                <CardHeader>
                  <CardTitle>Transfer Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm text-muted-foreground">Land ID</Label>
                      <p className="font-semibold text-foreground">{landId}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Current Owner</Label>
                      <p className="font-semibold text-foreground">{currentOwner}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">New Owner</Label>
                      <p className="font-semibold text-foreground">{newOwner}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Process Steps */}
              <Card className="shadow-medium">
                <CardHeader>
                  <CardTitle>Transfer Process Steps</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transferSteps.map((step, index) => (
                      <div key={step.id} className="relative">
                        {index < transferSteps.length - 1 && (
                          <div className="absolute left-6 top-12 w-0.5 h-16 bg-border" />
                        )}
                        
                        <div className={`flex items-center space-x-4 p-4 rounded-lg border ${getStepColor(step.status)}`}>
                          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-background border-2 flex items-center justify-center">
                            {getStepIcon(step)}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-semibold">{step.title}</h3>
                              <div className="flex items-center space-x-2">
                                <Badge variant={step.status === "completed" ? "default" : "secondary"}>
                                  {step.status === "completed" ? "Completed" : 
                                   step.status === "current" ? "In Progress" : "Pending"}
                                </Badge>
                                <span className="font-semibold text-sm">{step.amount}</span>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">{step.description}</p>
                            
                            {step.status === "current" && (
                              <div className="mt-3">
                                <Button size="sm" variant="outline">
                                  Complete Payment
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-6" />

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-foreground">Total Transfer Cost</h4>
                      <p className="text-sm text-muted-foreground">All fees and verification costs</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-foreground">UGX 375,000</p>
                      <p className="text-sm text-muted-foreground">
                        <span className="text-green-600">UGX 150,000 paid</span> • UGX 225,000 remaining
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setTransferInitiated(false)}>
                  Modify Transfer Details
                </Button>
                <div className="space-x-2">
                  <Button variant="outline">
                    View Transfer History
                  </Button>
                  <Button className="bg-gradient-secondary text-white">
                    Continue Next Step
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProcessTransfer;