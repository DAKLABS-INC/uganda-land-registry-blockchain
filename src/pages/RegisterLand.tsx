import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, MapPin, FileText, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const RegisterLand = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    landId: "",
    ownerName: "",
    ownerNIN: "",
    location: "",
    district: "",
    subCounty: "",
    village: "",
    gpsCoordinates: "",
    landSize: "",
    landUse: "",
    surveyPlan: null as File | null,
    valuationReport: null as File | null,
    taxReceipt: null as File | null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate registration process
    toast({
      title: "Land Registration Initiated",
      description: "Your land registration request has been submitted for review.",
    });
    
    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
  };

  const handleFileUpload = (field: string, file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }));
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
            <h1 className="text-xl font-bold text-foreground">Register New Land</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-hero rounded-lg p-6 text-white mb-8 shadow-medium">
            <h2 className="text-2xl font-bold flex items-center">
              <MapPin className="w-6 h-6 mr-2" />
              Land Registration Form
            </h2>
            <p className="text-white/80 mt-2">
              Complete all required fields to register a new land parcel in the Uganda Land Registry.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="landId">Land ID</Label>
                    <Input
                      id="landId"
                      value={formData.landId}
                      onChange={(e) => setFormData(prev => ({ ...prev, landId: e.target.value }))}
                      placeholder="Enter unique land identifier"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="landSize">Land Size (Acres)</Label>
                    <Input
                      id="landSize"
                      type="number"
                      value={formData.landSize}
                      onChange={(e) => setFormData(prev => ({ ...prev, landSize: e.target.value }))}
                      placeholder="Enter land size"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="gpsCoordinates">GPS Coordinates</Label>
                  <Input
                    id="gpsCoordinates"
                    value={formData.gpsCoordinates}
                    onChange={(e) => setFormData(prev => ({ ...prev, gpsCoordinates: e.target.value }))}
                    placeholder="e.g., 0.3476° N, 32.5825° E"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="landUse">Land Use</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, landUse: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select land use type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="agricultural">Agricultural</SelectItem>
                      <SelectItem value="industrial">Industrial</SelectItem>
                      <SelectItem value="mixed">Mixed Use</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Owner Information */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle>Owner Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ownerName">Owner Full Name</Label>
                    <Input
                      id="ownerName"
                      value={formData.ownerName}
                      onChange={(e) => setFormData(prev => ({ ...prev, ownerName: e.target.value }))}
                      placeholder="Enter owner's full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ownerNIN">National ID Number (NIN)</Label>
                    <Input
                      id="ownerNIN"
                      value={formData.ownerNIN}
                      onChange={(e) => setFormData(prev => ({ ...prev, ownerNIN: e.target.value }))}
                      placeholder="Enter NIN"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location Details */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle>Location Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="district">District</Label>
                    <Input
                      id="district"
                      value={formData.district}
                      onChange={(e) => setFormData(prev => ({ ...prev, district: e.target.value }))}
                      placeholder="Enter district"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subCounty">Sub-County</Label>
                    <Input
                      id="subCounty"
                      value={formData.subCounty}
                      onChange={(e) => setFormData(prev => ({ ...prev, subCounty: e.target.value }))}
                      placeholder="Enter sub-county"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="village">Village</Label>
                    <Input
                      id="village"
                      value={formData.village}
                      onChange={(e) => setFormData(prev => ({ ...prev, village: e.target.value }))}
                      placeholder="Enter village"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Full Address/Description</Label>
                  <Textarea
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="Enter complete location description"
                    rows={3}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Required Documents */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Required Documents
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Survey Plan</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <input
                        type="file"
                        accept=".pdf,.jpg,.png"
                        onChange={(e) => handleFileUpload('surveyPlan', e.target.files?.[0] || null)}
                        className="hidden"
                        id="surveyPlan"
                      />
                      <Label htmlFor="surveyPlan" className="cursor-pointer">
                        {formData.surveyPlan ? formData.surveyPlan.name : "Upload Survey Plan"}
                      </Label>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Valuation Report</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <input
                        type="file"
                        accept=".pdf,.jpg,.png"
                        onChange={(e) => handleFileUpload('valuationReport', e.target.files?.[0] || null)}
                        className="hidden"
                        id="valuationReport"
                      />
                      <Label htmlFor="valuationReport" className="cursor-pointer">
                        {formData.valuationReport ? formData.valuationReport.name : "Upload Valuation"}
                      </Label>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Tax Payment Receipt</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <input
                        type="file"
                        accept=".pdf,.jpg,.png"
                        onChange={(e) => handleFileUpload('taxReceipt', e.target.files?.[0] || null)}
                        className="hidden"
                        id="taxReceipt"
                      />
                      <Label htmlFor="taxReceipt" className="cursor-pointer">
                        {formData.taxReceipt ? formData.taxReceipt.name : "Upload Tax Receipt"}
                      </Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={() => navigate("/dashboard")}>
                Cancel
              </Button>
              <Button type="submit" className="bg-gradient-hero text-white">
                Submit Registration
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterLand;