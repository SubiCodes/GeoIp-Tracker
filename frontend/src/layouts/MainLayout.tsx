import LoadingScreen from "@/components/LoadingScreen";
import LogoutDialog from "@/components/dialogs/LogoutDialog";
import useUserAuthStore from "@/store/user-authStore";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const validatingUser = useUserAuthStore((state) => state.validatingUser);
  const validateUser = useUserAuthStore((state) => state.validateUser);
  const user = useUserAuthStore((state) => state.user);

  React.useEffect(() => {
    validateUser(navigate, true);
  }, [location.pathname, validateUser]);

  if (validatingUser) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-7xl flex h-16 items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-2">
            <MapPin className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">GeoIP Tracker</h1>
          </div>

          {/* User Profile and Logout */}
          <div className="flex items-center gap-3">
            <LogoutDialog />
            <div className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 border">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-sm">
                {user?.userName ? user.userName.charAt(0).toUpperCase() : "U"}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium">{user?.userName ?? "User"}</p>
                <p className="text-xs text-muted-foreground">{user?.email ?? ""}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl overflow-y-auto min-h-[calc(100vh-4rem)] p-4 md:p-8">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;