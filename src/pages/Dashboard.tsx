import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MapPin, FileText, Users, Search, Plus, Shield, Eye } from "lucide-react";

interface DashboardProps {
  userRole: "administrator" | "surveyor" | "valuer" | "registrar";
  onLogout: () => void;
}

const Dashboard = ({ userRole, onLogout }: DashboardProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const roleConfig = {
    administrator: {
      title: "Administrator Dashboard",
      color: "bg-gradient-primary",
      stats: [
        { label: "Total Properties", value: "2,847", icon: MapPin },
        { label: "Active Users", value: "156", icon: Users },
        { label: "Pending Registrations", value: "23", icon: FileText },
        { label: "System Health", value: "98%", icon: Shield }
      ]
    },
    surveyor: {
      title: "Surveyor Dashboard", 
      color: "bg-gradient-secondary",
      stats: [
        { label: "Surveys Completed", value: "134", icon: MapPin },
        { label: "Pending Reviews", value: "8", icon: FileText },
        { label: "Subdivisions", value: "45", icon: Plus },
        { label: "This Month", value: "12", icon: Eye }
      ]
    },
    valuer: {
      title: "Chief Government Valuer Dashboard",
      color: "bg-gradient-primary", 
      stats: [
        { label: "Valuations Done", value: "89", icon: FileText },
        { label: "Pending Approvals", value: "15", icon: Eye },
        { label: "Average Value", value: "$45K", icon: MapPin },
        { label: "This Quarter", value: "67", icon: Shield }
      ]
    },
    registrar: {
      title: "Registrar Dashboard",
      color: "bg-gradient-secondary",
      stats: [
        { label: "Titles Registered", value: "456", icon: Shield },
        { label: "Transfers Approved", value: "78", icon: Users },
        { label: "Pending Final Review", value: "12", icon: Eye },
        { label: "Success Rate", value: "99.2%", icon: FileText }
      ]
    }
  };

  const config = roleConfig[userRole];
  const recentActivities = [
    { id: "LT-2024-001", action: "Land Registration", status: "Completed", date: "2024-01-15" },
    { id: "LT-2024-002", action: "Ownership Transfer", status: "Pending", date: "2024-01-14" },
    { id: "LT-2024-003", action: "Land Subdivision", status: "In Review", date: "2024-01-13" },
    { id: "LT-2024-004", action: "Title Verification", status: "Completed", date: "2024-01-12" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-soft">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Uganda Land Registry</h1>
              <Badge variant="secondary" className="text-xs">
                {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
              </Badge>
            </div>
          </div>
          <Button variant="outline" onClick={onLogout}>
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Role Title */}
        <div className={`${config.color} rounded-lg p-6 text-white mb-8 shadow-medium`}>
          <h2 className="text-2xl font-bold">{config.title}</h2>
          <p className="text-white/80 mt-2">
            Welcome back! Here's an overview of your current activities and pending tasks.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {config.stats.map((stat, index) => (
            <Card key={index} className="shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="text-foreground">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Register New Land
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Search className="w-4 h-4 mr-2" />
                Search Land Records
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Process Transfer
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <MapPin className="w-4 h-4 mr-2" />
                Land Subdivision
              </Button>
            </CardContent>
          </Card>

          {/* Land Search */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="text-foreground">Land Title Search</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter Land ID or Owner Name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button>
                  <Search className="w-4 h-4" />
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">
                Search by Land ID, Owner Name, or GPS coordinates
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="text-foreground">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-2 rounded border">
                  <div className="flex-1">
                    <p className="font-medium text-sm text-foreground">{activity.id}</p>
                    <p className="text-xs text-muted-foreground">{activity.action}</p>
                  </div>
                  <Badge
                    variant={activity.status === "Completed" ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;