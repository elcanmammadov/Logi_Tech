import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import PremiumDialog from "@/components/PremiumDialog";
import logo from "@/assets/logicoo-logo.jpeg";

const navItems = [
  { label: "Ana Səhifə", path: "/" },
  { label: "Modullar", path: "/#modules" },
  { label: "Parking Xəritəsi", path: "/parking" },
  { label: "Haqqımızda", path: "/#about" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-b">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="LogiTech" className="h-10 w-10 object-contain" />
          <span className="font-display font-bold text-xl text-navy">LogiTech</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              {item.label}
            </Link>
          ))}
          <PremiumDialog />
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <User className="h-4 w-4" />
                {user.user_metadata?.first_name || user.user_metadata?.company_name || user.email}
              </span>
              <Button size="sm" variant="outline" onClick={signOut} className="gap-1">
                <LogOut className="h-3.5 w-3.5" /> Çıxış
              </Button>
            </div>
          ) : (
            <Link to="/auth">
              <Button size="sm">Daxil Ol</Button>
            </Link>
          )}
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-card border-b p-4 space-y-3">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path} className="block text-sm font-medium text-muted-foreground hover:text-primary" onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
          <PremiumDialog />
          {user ? (
            <>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <User className="h-4 w-4" />
                {user.user_metadata?.first_name || user.user_metadata?.company_name || user.email}
              </p>
              <Button size="sm" variant="outline" className="w-full gap-1" onClick={() => { signOut(); setOpen(false); }}>
                <LogOut className="h-3.5 w-3.5" /> Çıxış
              </Button>
            </>
          ) : (
            <Link to="/auth" onClick={() => setOpen(false)}>
              <Button size="sm" className="w-full">Daxil Ol</Button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
