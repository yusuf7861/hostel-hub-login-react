import { ArrowRight, Building2, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import NavBar from "@/components/NavBar";
import { Illustration, IllustrationContainer } from "@/components/ui/illustration";
import { DeskWithLaptop } from "@/components/assets";

const features = [
  {
    title: "Room Management",
    description: "Efficiently manage rooms, allocations, and maintenance schedules.",
    icon: Building2,
  },
  {
    title: "Student Records",
    description: "Maintain comprehensive records of all residents with searchable history.",
    icon: Users,
  },
  {
    title: "Secure Access",
    description: "Role-based permissions and secure authentication for staff.",
    icon: ShieldCheck,
  },
];

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 auth-gradient">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="flex flex-col space-y-4 text-white">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Simplify Your Hostel Management
                </h1>
                <p className="max-w-[700px] text-lg md:text-xl">
                  Complete hostel administration solution for managing rooms, students, staff, and more.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                    <Link to="/register">Get Started</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                    <Link to="/signin">Sign In</Link>
                  </Button>
                </div>
              </div>
              
              <IllustrationContainer className="hidden md:flex">
                <Illustration src={DeskWithLaptop} alt="Desk with laptop illustration" className="w-full max-w-lg mx-auto" />
              </IllustrationContainer>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Powerful Features
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Everything you need to manage your hostel efficiently
                </p>
              </div>
              
              <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12">
                {features.map((feature) => (
                  <div key={feature.title} className="relative overflow-hidden rounded-lg border bg-background p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <div className="mt-4 space-y-2">
                      <h3 className="text-xl font-bold">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 flex justify-center">
                <Button asChild variant="ghost" className="group">
                  <Link to="/register">
                    Learn more <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2025 HostelHub. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link to="#" className="hover:underline">Privacy Policy</Link>
            <Link to="#" className="hover:underline">Terms of Service</Link>
            <Link to="#" className="hover:underline">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
