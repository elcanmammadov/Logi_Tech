import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "dark" | "light";
}

/** Brand mark: stacked chevrons in the brand colours + wordmark. */
const Logo = ({ className, variant = "dark" }: LogoProps) => (
  <span className={cn("inline-flex items-center gap-2.5", className)}>
    <svg viewBox="0 0 32 32" className="h-8 w-8 shrink-0" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="hsl(var(--navy))" />
      <path d="M8 9h7l5 7-5 7H8l5-7z" fill="hsl(var(--primary))" />
      <path d="M15 9h5l5 7-5 7h-5l5-7z" fill="hsl(var(--orange))" />
      <circle cx="25.5" cy="24.5" r="2" fill="hsl(var(--green))" />
    </svg>
    <span
      className={cn(
        "font-display text-lg font-bold tracking-tight",
        variant === "dark" ? "text-navy" : "text-white",
      )}
    >
      LogiTech
    </span>
  </span>
);

export default Logo;
