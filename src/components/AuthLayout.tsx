
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

type AuthLayoutProps = {
  children: ReactNode;
  title: string;
  description: string;
  footerText: string;
  footerLinkText: string;
  footerLinkHref: string;
};

const AuthLayout = ({
  children,
  title,
  description,
  footerText,
  footerLinkText,
  footerLinkHref,
}: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-muted/50">
      <div className="absolute top-8 left-8">
        <Link to="/">
          <Logo />
        </Link>
      </div>
      
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
        <CardFooter className="flex justify-center border-t p-4">
          <div className="text-sm text-muted-foreground">
            {footerText}{" "}
            <Link to={footerLinkHref} className="font-medium text-primary hover:underline">
              {footerLinkText}
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthLayout;
