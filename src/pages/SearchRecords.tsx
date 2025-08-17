import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Search, MapPin, User, FileText, Calendar, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LandRecord {
  id: string;
  landId: string;
  ownerName: string;
  location: string;
  district: string;
  size: string;
  status: string;
  registrationDate: string;
  lastTransfer?: string;
  gpsCoordinates: string;
  landUse: string;
}

const SearchRecords = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchType, setSearchType] = useState("landId");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<LandRecord[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Mock data for demonstration
  const mockRecords: LandRecord[] = [
    {
      id: "1",
      landId: "LT-2024-001",
      ownerName: "John Mukasa",
      location: "Kampala, Central Division",
      district: "Kampala",
      size: "2.5",
      status: "Active",
      registrationDate: "2024-01-15",
      gpsCoordinates: "0.3476° N, 32.5825° E",
      landUse: "Residential"
    },
    {
      id: "2",
      landId: "LT-2024-002",
      ownerName: "Sarah Nakato",
      location: "Entebbe, Victoria Gardens",
      district: "Wakiso",
      size: "1.8",
      status: "Active",
      registrationDate: "2024-01-20",
      lastTransfer: "2024-01-18",
      gpsCoordinates: "0.0640° N, 32.4434° E",
      landUse: "Commercial"
    },
    {
      id: "3",
      landId: "LT-2024-003",
      ownerName: "David Okello",
      location: "Jinja, Industrial Area",
      district: "Jinja",
      size: "5.0",
      status: "Pending Transfer",
      registrationDate: "2024-01-10",
      gpsCoordinates: "0.4244° N, 33.2044° E",
      landUse: "Industrial"
    }
  ];

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      toast({
        title: "Search Query Required",
        description: "Please enter a search term.",
        variant: "destructive"
      });
      return;
    }

    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      const filteredResults = mockRecords.filter(record => {
        switch (searchType) {
          case "landId":
            return record.landId.toLowerCase().includes(searchQuery.toLowerCase());
          case "ownerName":
            return record.ownerName.toLowerCase().includes(searchQuery.toLowerCase());
          case "location":
            return record.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                   record.district.toLowerCase().includes(searchQuery.toLowerCase());
          case "gps":
            return record.gpsCoordinates.toLowerCase().includes(searchQuery.toLowerCase());
          default:
            return false;
        }
      });
      
      setSearchResults(filteredResults);
      setIsSearching(false);
      
      toast({
        title: "Search Complete",
        description: `Found ${filteredResults.length} record(s).`,
      });
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-500/10 text-green-700 dark:text-green-300";
      case "Pending Transfer":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-300";
      case "Disputed":
        return "bg-red-500/10 text-red-700 dark:text-red-300";
      default:
        return "bg-gray-500/10 text-gray-700 dark:text-gray-300";
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
            <h1 className="text-xl font-bold text-foreground">Search Land Records</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-secondary rounded-lg p-6 text-white mb-8 shadow-medium">
            <h2 className="text-2xl font-bold flex items-center">
              <Search className="w-6 h-6 mr-2" />
              Land Title Search System
            </h2>
            <p className="text-white/80 mt-2">
              Search for land records by Land ID, Owner Name, Location, or GPS coordinates.
            </p>
          </div>

          {/* Search Form */}
          <Card className="shadow-medium mb-8">
            <CardHeader>
              <CardTitle>Search Parameters</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="searchType">Search By</Label>
                    <Select value={searchType} onValueChange={setSearchType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select search type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="landId">Land ID</SelectItem>
                        <SelectItem value="ownerName">Owner Name</SelectItem>
                        <SelectItem value="location">Location</SelectItem>
                        <SelectItem value="gps">GPS Coordinates</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="searchQuery">Search Query</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="searchQuery"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={`Enter ${searchType === 'landId' ? 'Land ID (e.g., LT-2024-001)' : 
                          searchType === 'ownerName' ? 'Owner Name' : 
                          searchType === 'location' ? 'Location or District' : 
                          'GPS Coordinates'}`}
                        required
                      />
                      <Button type="submit" disabled={isSearching}>
                        {isSearching ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Search className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle>Search Results ({searchResults.length})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {searchResults.map((record) => (
                    <div
                      key={record.id}
                      className="border rounded-lg p-4 hover:shadow-medium transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-bold text-foreground">{record.landId}</h3>
                            <p className="text-sm text-muted-foreground">{record.ownerName}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(record.status)}>
                            {record.status}
                          </Badge>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            View Details
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-primary" />
                            <span className="text-muted-foreground">Location:</span>
                          </div>
                          <p className="text-foreground ml-6">{record.location}</p>
                          <p className="text-foreground ml-6">{record.district} District</p>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <User className="w-4 h-4 text-primary" />
                            <span className="text-muted-foreground">Details:</span>
                          </div>
                          <p className="text-foreground ml-6">Size: {record.size} acres</p>
                          <p className="text-foreground ml-6">Use: {record.landUse}</p>
                          <p className="text-foreground ml-6">{record.gpsCoordinates}</p>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-primary" />
                            <span className="text-muted-foreground">Dates:</span>
                          </div>
                          <p className="text-foreground ml-6">Registered: {new Date(record.registrationDate).toLocaleDateString()}</p>
                          {record.lastTransfer && (
                            <p className="text-foreground ml-6">Last Transfer: {new Date(record.lastTransfer).toLocaleDateString()}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* No Results */}
          {searchResults.length === 0 && searchQuery && !isSearching && (
            <Card className="shadow-medium">
              <CardContent className="text-center py-8">
                <Search className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No Records Found</h3>
                <p className="text-muted-foreground">
                  No land records match your search criteria. Please try different search terms.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Initial State */}
          {searchResults.length === 0 && !searchQuery && (
            <Card className="shadow-medium">
              <CardContent className="text-center py-8">
                <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Search Land Records</h3>
                <p className="text-muted-foreground">
                  Enter search criteria above to find land records in the Uganda Land Registry database.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchRecords;