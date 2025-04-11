
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Building2, LayoutDashboard, Menu, Shield, UserCog, X } from "lucide-react";
import Logo from "./Logo";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const NavBar = () => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { text: "Hostels", icon: Building2, href: "/hostels" },
    { text: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { text: "Warden", icon: UserCog, href: "/warden" },
    { text: "Admin", icon: Shield, href: "/admin" },
  ];

  const authLinks = [
    { text: "Sign In", href: "/signin", variant: "ghost" as const },
    { text: "Register", href: "/register", variant: "default" as const },
  ];

  return (
    <nav className="w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center">
          <Logo />
        </Link>
        
        {isMobile ? (
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu size={24} />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col p-0">
              <div className="flex h-16 items-center border-b px-4">
                <Link to="/" onClick={() => setIsOpen(false)}>
                  <Logo />
                </Link>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="ml-auto"
                  onClick={() => setIsOpen(false)}
                >
                  <X size={18} />
                </Button>
              </div>
              <div className="flex flex-col p-4 space-y-4">
                {navLinks.map((link) => (
                  <Link 
                    key={link.href} 
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                  >
                    <Button variant="ghost" className="w-full justify-start gap-2">
                      <link.icon size={18} />
                      {link.text}
                    </Button>
                  </Link>
                ))}
                <div className="h-px bg-border my-2"></div>
                <div className="flex flex-col gap-2">
                  {authLinks.map((link) => (
                    <Link 
                      key={link.href} 
                      to={link.href}
                      onClick={() => setIsOpen(false)}
                    >
                      <Button variant={link.variant} className="w-full">
                        {link.text}
                      </Button>
                    </Link>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        ) : (
          <div className="hidden md:flex items-center gap-4">
            {navLinks.map((link) => (
              <Link key={link.href} to={link.href}>
                <Button variant="ghost" className="flex items-center gap-2">
                  <link.icon size={18} />
                  {link.text}
                </Button>
              </Link>
            ))}
            {authLinks.map((link) => (
              <Link key={link.href} to={link.href}>
                <Button variant={link.variant}>{link.text}</Button>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
