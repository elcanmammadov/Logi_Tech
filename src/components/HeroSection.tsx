import { motion } from "framer-motion";
import { ArrowRight, Truck, Ship, Plane, Warehouse, Users, ParkingCircle, Globe, Shield, Clock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import logo from "@/assets/logicoo-logo.jpeg";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const floatingIcons = [
  { icon: Ship, label: "Gəmi", cls: "-top-6 -right-6 bg-primary", delay: 0.5 },
  { icon: Plane, label: "Təyyarə", cls: "-bottom-6 -right-10 bg-green", delay: 0.7 },
  { icon: ParkingCircle, label: "Parking", cls: "-bottom-6 -left-10 bg-orange", delay: 0.9 },
  { icon: Users, label: "İşçi", cls: "-top-6 -left-6 bg-navy border border-navy-foreground/20", delay: 1.1 },
];

const quickLinks = [
  { icon: Truck, label: "TIR", path: "/modules/trucks", color: "bg-primary" },
  { icon: Ship, label: "Gəmi", path: "/modules/ships", color: "bg-navy border border-navy-foreground/20" },
  { icon: Plane, label: "Təyyarə", path: "/modules/aircraft", color: "bg-orange" },
  { icon: Warehouse, label: "Anbar", path: "/modules/warehouses", color: "bg-green" },
  { icon: Users, label: "İşçi", path: "/modules/workforce", color: "bg-secondary" },
  { icon: ParkingCircle, label: "Parking", path: "/parking", color: "bg-accent" },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-navy">
      {/* Animated decorative bg */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-72 h-72 bg-orange rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], y: [0, -40, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-primary rounded-full blur-[150px]"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], x: [0, -20, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-green rounded-full blur-[100px]"
        />
      </div>

      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(hsl(var(--navy-foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--navy-foreground)) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      <div className="container relative z-10 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 bg-primary/20 text-primary-foreground/80 rounded-full px-3 py-1 text-xs sm:text-sm mb-4 sm:mb-6 border border-primary/30">
              <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>
                <Globe className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </motion.div>
              Logistika üçün yeni platform
            </motion.div>

            {/* Responsive title — smaller on mobile */}
            <motion.h1 variants={itemVariants} className="font-display text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-navy-foreground leading-tight mb-4 sm:mb-6">
              Logistika resurslarını{" "}
              <motion.span
                className="text-orange inline-block"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                icarəyə
              </motion.span>{" "}
              ver və ya{" "}
              <motion.span
                className="text-green inline-block"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                götür
              </motion.span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-sm sm:text-base md:text-lg text-navy-foreground/70 mb-6 sm:mb-8 max-w-lg">
              TIR, gəmi, təyyarə, anbar və işçi qüvvəsi — bütün logistika
              resurslarını bir platformada idarə et.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-3 sm:gap-4">
              <Link to="/auth">
                <Button size="lg" className="bg-orange hover:bg-orange/90 text-orange-foreground gap-2 group">
                  Başla <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-navy-foreground/30 text-navy-foreground hover:bg-navy-foreground/10 bg-transparent">
                Daha ətraflı
              </Button>
            </motion.div>

            {/* Quick access shortcuts - mobile friendly */}
            <motion.div variants={itemVariants} className="mt-8 sm:mt-10">
              <p className="text-xs text-navy-foreground/40 mb-3 flex items-center gap-1.5">
                <Zap className="h-3 w-3" /> Cəld keçid
              </p>
              <div className="flex flex-wrap gap-2">
                {quickLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + i * 0.08, type: "spring", stiffness: 200 }}
                  >
                    <Link
                      to={link.path}
                      className="inline-flex items-center gap-1.5 bg-navy-foreground/5 hover:bg-navy-foreground/15 border border-navy-foreground/10 rounded-full px-3 py-1.5 text-navy-foreground/70 hover:text-navy-foreground transition-all text-xs sm:text-sm group"
                    >
                      <link.icon className="h-3.5 w-3.5 text-orange group-hover:scale-110 transition-transform" />
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Stats row */}
            <motion.div variants={itemVariants} className="flex items-center gap-4 sm:gap-8 mt-8">
              {[
                { icon: Truck, label: "500+ TIR", color: "text-orange" },
                { icon: Ship, label: "120+ Gəmi", color: "text-primary" },
                { icon: Warehouse, label: "300+ Anbar", color: "text-green" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="flex items-center gap-1.5 text-navy-foreground/60"
                  whileHover={{ scale: 1.1 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + i * 0.15 }}
                >
                  <stat.icon className={`h-4 w-4 sm:h-5 sm:w-5 ${stat.color}`} />
                  <span className="text-xs sm:text-sm font-medium">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Trust badges */}
            <motion.div
              variants={itemVariants}
              className="hidden sm:flex items-center gap-6 mt-8 pt-8 border-t border-navy-foreground/10"
            >
              {[
                { icon: Shield, text: "Təhlükəsiz ödəniş" },
                { icon: Clock, text: "24/7 dəstək" },
                { icon: Globe, text: "50+ ölkə" },
              ].map((badge) => (
                <div key={badge.text} className="flex items-center gap-1.5 text-navy-foreground/50 text-xs">
                  <badge.icon className="h-3.5 w-3.5" />
                  <span>{badge.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 100 }}
            className="hidden lg:flex justify-center"
          >
            <div className="relative">
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-80 h-80 rounded-3xl bg-gradient-to-br from-primary/20 to-orange/20 flex items-center justify-center backdrop-blur-sm"
              >
                <motion.img
                  src={logo}
                  alt="LogiTech"
                  className="w-60 h-60 object-contain drop-shadow-2xl"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
              </motion.div>

              {/* Orbiting ring */}
              <motion.div
                className="absolute inset-[-20px] rounded-full border border-dashed border-orange/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />

              {/* Floating badges */}
              {floatingIcons.map((badge) => (
                <motion.div
                  key={badge.label}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: badge.delay, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  className={`absolute ${badge.cls} text-card rounded-xl p-3 shadow-lg cursor-pointer`}
                >
                  <badge.icon className="h-6 w-6" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Animated bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" className="w-full">
          <motion.path
            d="M0 60V30C240 10 480 0 720 10C960 20 1200 40 1440 30V60H0Z"
            fill="hsl(var(--background))"
            animate={{ d: [
              "M0 60V30C240 10 480 0 720 10C960 20 1200 40 1440 30V60H0Z",
              "M0 60V40C240 20 480 10 720 20C960 30 1200 50 1440 40V60H0Z",
              "M0 60V30C240 10 480 0 720 10C960 20 1200 40 1440 30V60H0Z",
            ]}}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
