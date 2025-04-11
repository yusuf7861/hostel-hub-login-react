
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Building2,
  LayoutDashboard,
  LogOut,
  Settings,
  Shield,
  User,
  UserCog,
} from "lucide-react";

type MobileNavProps = {
  onClose: () => void;
};

const MobileNav = ({ onClose }: MobileNavProps) => {
  const mainLinks = [
    { text: "Hostels", icon: Building2, href: "/hostels" },
    { text: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { text: "Warden", icon: UserCog, href: "/warden" },
    { text: "Admin", icon: Shield, href: "/admin" },
  ];

  const userLinks = [
    { text: "Account", icon: User, href: "/account" },
    { text: "Settings", icon: Settings, href: "/settings" },
    { text: "Sign Out", icon: LogOut, href: "/signout" },
  ];

  return (
    <div className="flex flex-col h-full gap-6 p-6">
      <div className="flex flex-col gap-1">
        <h4 className="font-medium text-sm px-2">Main Navigation</h4>
        {mainLinks.map((link) => (
          <Link key={link.href} to={link.href} onClick={onClose}>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 text-foreground"
            >
              <link.icon size={18} />
              {link.text}
            </Button>
          </Link>
        ))}
      </div>

      <div className="flex flex-col gap-1">
        <h4 className="font-medium text-sm px-2">User</h4>
        {userLinks.map((link) => (
          <Link key={link.href} to={link.href} onClick={onClose}>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2 text-foreground"
            >
              <link.icon size={18} />
              {link.text}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileNav;
