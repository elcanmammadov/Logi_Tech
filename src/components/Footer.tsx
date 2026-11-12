import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import Logo from "@/components/Logo";

const columns = [
  {
    title: "Modullar",
    links: [
      { label: "TIR icarəsi", to: "/modules/trucks" },
      { label: "Gəmi yeri", to: "/modules/ships" },
      { label: "Təyyarə yeri", to: "/modules/aircraft" },
      { label: "Anbar icarəsi", to: "/modules/warehouses" },
      { label: "İşçi qüvvəsi", to: "/modules/workforce" },
      { label: "Parking xəritəsi", to: "/parking" },
    ],
  },
  {
    title: "Şirkət",
    links: [
      { label: "Haqqımızda", to: "/#about" },
      { label: "Necə işləyir", to: "/#how" },
      { label: "Qeydiyyat", to: "/auth" },
    ],
  },
];

const Footer = () => (
  <footer className="border-t bg-white">
    <div className="container py-16">
      <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Logistika resurslarının paylaşılması və icarəsi üçün vahid platforma.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="mb-4 text-sm font-semibold text-navy">{col.title}</h4>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-muted-foreground transition-colors hover:text-navy">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="mb-4 text-sm font-semibold text-navy">Əlaqə</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>
              <a href="mailto:info@logitech.az" className="flex items-center gap-2 hover:text-navy">
                <Mail className="h-4 w-4" /> info@logitech.az
              </a>
            </li>
            <li>
              <a href="tel:+994125550000" className="flex items-center gap-2 hover:text-navy">
                <Phone className="h-4 w-4" /> +994 12 555 00 00
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4" /> Bakı, Azərbaycan
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div className="border-t">
      <div className="container flex flex-col items-center justify-between gap-2 py-6 text-xs text-muted-foreground sm:flex-row">
        <p>© {new Date().getFullYear()} LogiTech. Bütün hüquqlar qorunur.</p>
        <p>Bakıda hazırlanıb</p>
      </div>
    </div>
  </footer>
);

export default Footer;
