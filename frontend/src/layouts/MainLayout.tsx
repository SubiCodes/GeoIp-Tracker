import LoadingScreen from "@/components/LoadingScreen";
import LogoutDialog from "@/components/dialogs/LogoutDialog";
import useUserAuthStore from "@/store/user-authStore";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Home, Search, History, MapPin, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const validatingUser = useUserAuthStore((state) => state.validatingUser);
  const validateUser = useUserAuthStore((state) => state.validateUser);

  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  React.useEffect(() => {
    validateUser(navigate, true);
  }, [location.pathname, validateUser]);

  const navItems = [
    { path: "/home", icon: Home, label: "Home" },
    { path: "/search", icon: Search, label: "Search" },
    { path: "/history", icon: History, label: "History" },
  ];

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  if (validatingUser) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-7xl flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <div className="flex items-center gap-2">
              <MapPin className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold">GeoIP Tracker</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl flex bg-background">
        {/* Sidebar */}
        <aside
          className={`
            fixed md:sticky top-16 left-0 z-40 h-[calc(100vh-4rem)]
            w-64 border-r bg-background transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0
          `}
        >
          <nav className="flex flex-col gap-2 p-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);

              return (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setIsSidebarOpen(false);
                  }}
                  className={`
                    flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium
                    transition-colors
                    ${active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    }
                  `}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* User Info Section */}

          <div className="absolute bottom-4 left-4 right-4">
            <LogoutDialog />
            <div className="mt-2 mb-2 pt-4 border-t">
              <div className="flex items-center gap-3 rounded-lg bg-muted p-3 border-t pt-4 border">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                  U
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">User</p>
                  <p className="text-xs text-muted-foreground truncate">user@example.com</p>
                </div>
              </div>
            </div>
          </div>

        </aside>

        {/* Backdrop for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/50 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto h-[calc(100vh-4rem)] p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;