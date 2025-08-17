import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Plus, Trash2, MapPin, AlertTriangle, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SubdivisionParcel {
  id: string;
  name: string;
  size: string;
  coordinates: string;
  landUse: string;
}

const LandSubdivision = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [originalLandId, setOriginalLandId] = useState("");
  const [originalSize, setOriginalSize] = useState("");
  const [subdivisionReason, setSubdivisionReason] = useState("");
  const [parcels, setParcels] = useState<SubdivisionParcel[]>([
    { id: "1", name: "Parcel A", size: "", coordinates: "", landUse: "Residential" },
    { id: "2", name: "Parcel B", size: "", coordinates: "", landUse: "Residential" }
  ]);

  const addParcel = () => {
    const newParcel: SubdivisionParcel = {
      id: Date.now().toString(),
      name: `Parcel ${String.fromCharCode(65 + parcels.length)}`,
      size: "",
      coordinates: "",
      landUse: "Residential"
    };
    setParcels([...parcels, newParcel]);
  };

  const removeParcel = (id: string) => {
    if (parcels.length <= 2) {
      toast({
        title: "Minimum Parcels Required",
        description: "At least 2 parcels are required for subdivision.",
        variant: "destructive"
      });
      return;
    }
    setParcels(parcels.filter(parcel => parcel.id !== id));
  };

  const updateParcel = (id: string, field: keyof SubdivisionParcel, value: string) => {
    setParcels(parcels.map(parcel => 
      parcel.id === id ? { ...parcel, [field]: value } : parcel
    ));
  };

  const getTotalSubdivisionSize = () => {
    return parcels.reduce((total, parcel) => {
      const size = parseFloat(parcel.size) || 0;
      return total + size;
    }, 0);
  };

  const getResidueSize = () => {
    const originalSizeNum = parseFloat(originalSize) || 0;
    const subdivisionTotal = getTotalSubdivisionSize();
    return Math.max(0, originalSizeNum - subdivisionTotal);
  };

  const handleSubmitSubdivision = (e: React.FormEvent) => {
    e.preventDefault();
    
    const totalSubdivision = getTotalSubdivisionSize();
    const originalSizeNum = parseFloat(originalSize) || 0;
    
    if (totalSubdivision > originalSizeNum) {
      toast({
        title: "Invalid Subdivision",
        description: "Total subdivision size cannot exceed original land size.",
        variant: "destructive"
      });
      return;
    }

    // Check if all parcels have required data
    const incompleteParcels = parcels.filter(parcel => 
      !parcel.size || !parcel.coordinates || !parcel.name
    );
    
    if (incompleteParcels.length > 0) {
      toast({
        title: "Incomplete Parcel Data",
        description: "Please complete all parcel information before submitting.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Subdivision Process Initiated",
      description: `Original NFT will be burned and ${parcels.length + (getResidueSize() > 0 ? 1 : 0)} new NFTs will be created.`,
    });

    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
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
            <h1 className="text-xl font-bold text-foreground">Land Subdivision</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-secondary rounded-lg p-6 text-white mb-8 shadow-medium">
            <h2 className="text-2xl font-bold flex items-center">
              <MapPin className="w-6 h-6 mr-2" />
              Land Subdivision Process
            </h2>
            <p className="text-white/80 mt-2">
              Subdivide registered land into multiple parcels. The original NFT will be burned and new NFTs created.
            </p>
          </div>

          <form onSubmit={handleSubmitSubdivision} className="space-y-8">
            {/* Original Land Information */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle>Original Land Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="originalLandId">Original Land ID</Label>
                    <Input
                      id="originalLandId"
                      value={originalLandId}
                      onChange={(e) => setOriginalLandId(e.target.value)}
                      placeholder="e.g., LT-2024-001"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="originalSize">Original Land Size (Acres)</Label>
                    <Input
                      id="originalSize"
                      type="number"
                      step="0.01"
                      value={originalSize}
                      onChange={(e) => setOriginalSize(e.target.value)}
                      placeholder="Enter original land size"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subdivisionReason">Reason for Subdivision</Label>
                  <Input
                    id="subdivisionReason"
                    value={subdivisionReason}
                    onChange={(e) => setSubdivisionReason(e.target.value)}
                    placeholder="e.g., Sale to multiple parties, inheritance distribution"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Subdivision Parcels */}
            <Card className="shadow-medium">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Subdivision Parcels</CardTitle>
                  <Button type="button" onClick={addParcel} variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Parcel
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {parcels.map((parcel, index) => (
                  <div key={parcel.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold flex items-center">
                        <FileText className="w-4 h-4 mr-2" />
                        {parcel.name}
                      </h3>
                      {parcels.length > 2 && (
                        <Button
                          type="button"
                          onClick={() => removeParcel(parcel.id)}
                          variant="outline"
                          size="sm"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Parcel Name</Label>
                        <Input
                          value={parcel.name}
                          onChange={(e) => updateParcel(parcel.id, "name", e.target.value)}
                          placeholder="Parcel name"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Size (Acres)</Label>
                        <Input
                          type="number"
                          step="0.01"
                          value={parcel.size}
                          onChange={(e) => updateParcel(parcel.id, "size", e.target.value)}
                          placeholder="0.00"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Land Use</Label>
                        <Input
                          value={parcel.landUse}
                          onChange={(e) => updateParcel(parcel.id, "landUse", e.target.value)}
                          placeholder="e.g., Residential, Commercial"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="mt-4 space-y-2">
                      <Label>GPS Coordinates</Label>
                      <Input
                        value={parcel.coordinates}
                        onChange={(e) => updateParcel(parcel.id, "coordinates", e.target.value)}
                        placeholder="e.g., 0.3476° N, 32.5825° E"
                        required
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Subdivision Summary */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle>Subdivision Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Original Size</p>
                      <p className="text-2xl font-bold text-foreground">{originalSize || "0"} acres</p>
                    </div>
                    
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Total Subdivisions</p>
                      <p className="text-2xl font-bold text-foreground">{getTotalSubdivisionSize().toFixed(2)} acres</p>
                    </div>
                    
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">Residue Plot</p>
                      <p className="text-2xl font-bold text-foreground">{getResidueSize().toFixed(2)} acres</p>
                    </div>
                    
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">New NFTs</p>
                      <p className="text-2xl font-bold text-foreground">
                        {parcels.length + (getResidueSize() > 0 ? 1 : 0)}
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="bg-yellow-500/10 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-600" />
                      <h4 className="font-semibold text-yellow-700 dark:text-yellow-300">
                        Subdivision Process Warning
                      </h4>
                    </div>
                    <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                      <li>• The original NFT ({originalLandId}) will be permanently burned</li>
                      <li>• {parcels.length} new NFTs will be created for the subdivided parcels</li>
                      {getResidueSize() > 0 && (
                        <li>• 1 additional NFT will be created for the residue plot ({getResidueSize().toFixed(2)} acres)</li>
                      )}
                      <li>• This action cannot be undone once confirmed</li>
                    </ul>
                  </div>

                  {getTotalSubdivisionSize() > parseFloat(originalSize || "0") && (
                    <div className="bg-red-500/10 border border-red-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                        <span className="font-semibold text-red-700 dark:text-red-300">
                          Error: Total subdivision size exceeds original land size
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={() => navigate("/dashboard")}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-gradient-hero text-white"
                disabled={getTotalSubdivisionSize() > parseFloat(originalSize || "0")}
              >
                Submit Subdivision Request
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LandSubdivision;