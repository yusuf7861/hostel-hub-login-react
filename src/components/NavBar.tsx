
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Building2, LayoutDashboard, UserCog } from "lucide-react";
import Logo from "./Logo";

const NavBar = () => {
  return (
    <nav className="w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/">
          <Logo />
        </Link>
        
        <div className="flex items-center gap-4">
          <Link to="/hostels">
            <Button variant="ghost" className="flex items-center gap-2">
              <Building2 size={18} />
              Hostels
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="ghost" className="flex items-center gap-2">
              <LayoutDashboard size={18} />
              Dashboard
            </Button>
          </Link>
          <Link to="/warden">
            <Button variant="ghost" className="flex items-center gap-2">
              <UserCog size={18} />
              Warden
            </Button>
          </Link>
          <Link to="/signin">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link to="/register">
            <Button>Register</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
