import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import PremiumDialog from "@/components/PremiumDialog";
import Logo from "@/components/Logo";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Modullar", path: "/#modules" },
  { label: "Necə işləyir", path: "/#how" },
  { label: "Parking xəritəsi", path: "/parking" },
  { label: "Haqqımızda", path: "/#about" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, signOut } = useAuth();
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll to in-page anchors (react-router doesn't do this by itself)
  useEffect(() => {
    if (!hash) return;
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [hash, pathname]);

  const displayName =
    user?.user_metadata?.first_name || user?.user_metadata?.company_name || user?.email;

  const isActive = (path: string) => !path.includes("#") && pathname === path;

  return (
    <nav
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        scrolled ? "bg-white/90 backdrop-blur-xl border-border" : "bg-white border-transparent",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" aria-label="LogiTech ana səhifə">
          <Logo />
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive(item.path)
                  ? "text-navy"
                  : "text-muted-foreground hover:text-navy",
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <PremiumDialog />
          {user ? (
            <>
              <span className="flex max-w-[160px] items-center gap-1.5 truncate text-sm text-muted-foreground">
                <User className="h-4 w-4 shrink-0" />
                <span className="truncate">{displayName}</span>
              </span>
              <Button size="sm" variant="outline" onClick={signOut} className="gap-1.5">
                <LogOut className="h-3.5 w-3.5" /> Çıxış
              </Button>
            </>
          ) : (
            <>
              <Link to="/auth" className="text-sm font-medium text-navy hover:text-primary">
                Daxil ol
              </Link>
              <Link to="/auth">
                <Button size="sm" className="bg-navy hover:bg-navy/90">
                  Qeydiyyat
                </Button>
              </Link>
            </>
          )}
        </div>

        <button
          className="rounded-md p-2 text-navy md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Menyunu bağla" : "Menyunu aç"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="space-y-1 border-t bg-white p-4 md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-navy"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="space-y-3 border-t pt-4 mt-3">
            <PremiumDialog />
            {user ? (
              <>
                <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <User className="h-4 w-4" /> {displayName}
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full gap-1.5"
                  onClick={() => {
                    signOut();
                    setOpen(false);
                  }}
                >
                  <LogOut className="h-3.5 w-3.5" /> Çıxış
                </Button>
              </>
            ) : (
              <Link to="/auth" onClick={() => setOpen(false)} className="block">
                <Button size="sm" className="w-full bg-navy hover:bg-navy/90">
                  Daxil ol / Qeydiyyat
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
