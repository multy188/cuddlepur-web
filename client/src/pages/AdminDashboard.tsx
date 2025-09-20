import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Shield, 
  DollarSign, 
  AlertTriangle, 
  TrendingUp, 
  UserCheck, 
  UserX, 
  Flag,
  Clock,
  Activity
} from "lucide-react";

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
}

export default function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  // TODO: Replace with real data from API
  const dashboardStats = {
    totalUsers: 2847,
    totalProfessionals: 342,
    pendingVerifications: 23,
    activeBookings: 156,
    totalRevenue: 45780,
    monthlyGrowth: 12.5,
    flaggedReports: 8,
    suspendedAccounts: 12
  };

  const recentActivity = [
    { id: 1, type: "verification", message: "New professional verification request from Sarah M.", time: "5 minutes ago", severity: "info" },
    { id: 2, type: "report", message: "Safety report filed against booking #BK-2834", time: "12 minutes ago", severity: "warning" },
    { id: 3, type: "payment", message: "Payment dispute escalated for booking #BK-2801", time: "1 hour ago", severity: "error" },
    { id: 4, type: "user", message: "New user registration spike detected (+45 users)", time: "2 hours ago", severity: "success" },
    { id: 5, type: "content", message: "Inappropriate content flagged in user profile", time: "3 hours ago", severity: "warning" }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "error": return "bg-red-100 text-red-800 border-red-200";
      case "warning": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "success": return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "verification": return <UserCheck className="w-4 h-4" />;
      case "report": return <Flag className="w-4 h-4" />;
      case "payment": return <DollarSign className="w-4 h-4" />;
      case "user": return <Users className="w-4 h-4" />;
      case "content": return <AlertTriangle className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Platform overview and management</p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => onNavigate("dashboard")}
            data-testid="button-back-to-app"
          >
            Back to App
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="stat-total-users">{dashboardStats.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +{dashboardStats.monthlyGrowth}% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Professionals</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="stat-professionals">{dashboardStats.totalProfessionals}</div>
              <p className="text-xs text-muted-foreground">
                Verified and active
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="stat-revenue">${dashboardStats.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline w-3 h-3 mr-1" />
                +15% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Bookings</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="stat-bookings">{dashboardStats.activeBookings}</div>
              <p className="text-xs text-muted-foreground">
                Currently in progress
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover-elevate cursor-pointer" onClick={() => onNavigate("admin-verification-queue")}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Verifications</CardTitle>
              <Clock className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600" data-testid="stat-pending-verifications">
                {dashboardStats.pendingVerifications}
              </div>
              <p className="text-xs text-muted-foreground">
                Require manual review
              </p>
            </CardContent>
          </Card>

          <Card className="hover-elevate cursor-pointer" onClick={() => onNavigate("admin-safety-reports")}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Safety Reports</CardTitle>
              <Flag className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600" data-testid="stat-safety-reports">
                {dashboardStats.flaggedReports}
              </div>
              <p className="text-xs text-muted-foreground">
                Require investigation
              </p>
            </CardContent>
          </Card>

          <Card className="hover-elevate cursor-pointer" onClick={() => onNavigate("admin-content-moderation")}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Content Review</CardTitle>
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600" data-testid="stat-content-flags">12</div>
              <p className="text-xs text-muted-foreground">
                Flagged content items
              </p>
            </CardContent>
          </Card>

          <Card className="hover-elevate cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Suspended Accounts</CardTitle>
              <UserX className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-600" data-testid="stat-suspended-accounts">
                {dashboardStats.suspendedAccounts}
              </div>
              <p className="text-xs text-muted-foreground">
                Currently suspended
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity Feed */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                  <div className={`p-2 rounded-full ${getSeverityColor(activity.severity)}`}>
                    {getTypeIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium" data-testid={`activity-${activity.id}`}>
                      {activity.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {activity.time}
                    </p>
                  </div>
                  <Badge variant="outline" className={getSeverityColor(activity.severity)}>
                    {activity.severity}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                variant="outline" 
                className="h-auto p-4 flex flex-col items-center gap-2"
                onClick={() => onNavigate("admin-verification-queue")}
                data-testid="button-review-verifications"
              >
                <UserCheck className="w-6 h-6" />
                <span>Review Verifications</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto p-4 flex flex-col items-center gap-2"
                onClick={() => onNavigate("admin-safety-reports")}
                data-testid="button-investigate-reports"
              >
                <Flag className="w-6 h-6" />
                <span>Investigate Reports</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-auto p-4 flex flex-col items-center gap-2"
                onClick={() => onNavigate("admin-content-moderation")}
                data-testid="button-moderate-content"
              >
                <AlertTriangle className="w-6 h-6" />
                <span>Moderate Content</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}