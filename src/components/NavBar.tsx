
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";

const NavBar = () => {
  return (
    <nav className="w-full border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/">
          <Logo />
        </Link>
        
        <div className="flex items-center gap-4">
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
