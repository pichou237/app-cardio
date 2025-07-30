
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HeartPulse, LogOut, Menu, X } from "lucide-react";
import { toast } from "sonner";

interface NavbarProps {
  isAuthenticated?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated: propIsAuthenticated = false }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(propIsAuthenticated);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check authentication status from localStorage
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    const role = localStorage.getItem("userRole");
    setIsAuthenticated(authStatus);
    setUserRole(role);
  }, []);

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    setIsAuthenticated(false);
    setUserRole(null);
    
    // Redirect to home
    toast.success("Déconnexion réussie");
    navigate("/");
  };

  // If user is authenticated and trying to access homepage, redirect to appropriate dashboard
  useEffect(() => {
    if (isAuthenticated && location.pathname === "/") {
      if (userRole === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    }
  }, [isAuthenticated, location.pathname, navigate, userRole]);

  const navigationItems = [
    { name: "Accueil", href: "/", show: !isAuthenticated },
    { name: "À propos", href: "/about", show: !isAuthenticated },
    { name: "Témoignages", href: "/testimonials", show: !isAuthenticated },
    { name: "Comment ça marche", href: "/how-it-works", show: !isAuthenticated },
    { name: "Contact", href: "/contact", show: !isAuthenticated },
    { name: "dashboard", href: "/dashboard", show: isAuthenticated && userRole !== "admin" },
    { name: "Prédiction", href: "/prediction", show: isAuthenticated && userRole !== "admin" },
    { name: "Profil", href: "/profile", show: isAuthenticated && userRole !== "admin" },
    { name: "Admin", href: "/admin", show: isAuthenticated && userRole === "admin" }
  ];

  return (
    <header className="border-b bg-background shadow-sm sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link 
              to={isAuthenticated ? (userRole === "admin" ? "/admin" : "/dashboard") : "/"} 
              className="flex items-center text-xl font-bold text-primary"
            >
              <HeartPulse className="h-6 w-6 mr-2 text-primary" />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                CardioPredict
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {navigationItems
              .filter(item => item.show)
              .map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))
            }
          </nav>

          
          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {isAuthenticated ? (
              <Button 
                variant="outline" 
                onClick={handleLogout} 
                className="border-primary text-primary hover:bg-primary/10"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </Button>
            ) : (
              <>
                <Button variant="outline" asChild className="border-primary text-primary hover:bg-primary/10">
                  <Link to="/login">Se connecter</Link>
                </Button>
                <Button asChild className="bg-primary hover:bg-primary/90">
                  <Link to="/register">S'inscrire</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t bg-background">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems
                .filter(item => item.show)
                .map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              
              {/* Mobile Auth Buttons */}
              <div className="pt-4 border-t space-y-2">
                {isAuthenticated ? (
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full border-primary text-primary hover:bg-primary/10"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Déconnexion
                  </Button>
                ) : (
                  <>
                    <Button 
                      variant="outline" 
                      asChild 
                      className="w-full border-primary text-primary hover:bg-primary/10"
                    >
                      <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                        Se connecter
                      </Link>
                    </Button>
                    <Button 
                      asChild 
                      className="w-full bg-primary hover:bg-primary/90"
                    >
                      <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                        S'inscrire
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
