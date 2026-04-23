import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logicoo-logo.jpeg";

const Footer = () => (
  <footer className="bg-navy py-16 border-t border-navy-foreground/10">
    <div className="container">
      <div className="grid md:grid-cols-4 gap-10 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-4">
            <img src={logo} alt="LogiTech" className="h-10 w-10 object-contain" />
            <span className="font-display font-bold text-xl text-navy-foreground">LogiTech</span>
          </div>
          <p className="text-sm text-navy-foreground/50 leading-relaxed">
            Logistika sahəsində resurs paylaşımı üçün ən böyük platforma.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <h4 className="font-display font-semibold text-navy-foreground mb-4">Modullar</h4>
          <div className="space-y-2">
            {[
              { label: "TIR İcarəsi", path: "/modules/trucks" },
              { label: "Gəmi Yeri", path: "/modules/ships" },
              { label: "Təyyarə Yeri", path: "/modules/aircraft" },
              { label: "Anbar İcarəsi", path: "/modules/warehouses" },
              { label: "İşçi Qüvvəsi", path: "/modules/workforce" },
            ].map((item) => (
              <Link key={item.path} to={item.path} className="block text-sm text-navy-foreground/50 hover:text-orange transition-colors">
                {item.label}
              </Link>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <h4 className="font-display font-semibold text-navy-foreground mb-4">Şirkət</h4>
          <div className="space-y-2">
            {["Haqqımızda", "Karyera", "Blog", "Partnyorlar", "Şərtlər"].map((item) => (
              <span key={item} className="block text-sm text-navy-foreground/50 hover:text-orange transition-colors cursor-pointer">
                {item}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <h4 className="font-display font-semibold text-navy-foreground mb-4">Əlaqə</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-navy-foreground/50">
              <Mail className="h-4 w-4" /> info@logitech.az
            </div>
            <div className="flex items-center gap-2 text-sm text-navy-foreground/50">
              <Phone className="h-4 w-4" /> +994 12 555 00 00
            </div>
            <div className="flex items-center gap-2 text-sm text-navy-foreground/50">
              <MapPin className="h-4 w-4" /> Bakı, Azərbaycan
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="pt-8 border-t border-navy-foreground/10 text-center"
      >
        <p className="text-sm text-navy-foreground/40">
          © 2026 LogiTech. Bütün hüquqlar qorunur.
        </p>
      </motion.div>
    </div>
  </footer>
);

export default Footer;
