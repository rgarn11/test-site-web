import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from './ui/sheet';

const Navbar = ({ onReserveClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', href: '#hero' },
    { name: 'Menu', href: '#menu' },
    { name: 'À propos', href: '#about' },
    { name: 'Avis', href: '#reviews' },
    { name: 'Accès', href: '#access' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href) => {
    setOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      data-testid="navbar"
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-bone/95 backdrop-blur-md border-b border-border shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#hero');
            }}
            className="flex items-center gap-2"
            data-testid="navbar-logo"
          >
            <span className={`font-heading text-2xl font-medium transition-colors ${
              scrolled ? 'text-cedar' : 'text-white'
            }`}>
              Le Gros Arbre
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                data-testid={`nav-link-${link.name.toLowerCase().replace(/\s/g, '-')}`}
                className={`font-medium transition-colors hover:text-wood ${
                  scrolled ? 'text-charcoal' : 'text-white/90 hover:text-white'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="tel:0765872934"
              data-testid="navbar-phone"
              className={`flex items-center gap-2 transition-colors ${
                scrolled ? 'text-cedar hover:text-wood' : 'text-white hover:text-white/80'
              }`}
            >
              <Phone className="w-4 h-4" strokeWidth={1.5} />
              <span className="text-sm font-medium">07 65 87 29 34</span>
            </a>
            <Button
              data-testid="navbar-reserve-btn"
              onClick={onReserveClick}
              className="bg-cedar hover:bg-cedar-dark text-white rounded-full px-6 py-2 transition-all duration-300 hover:scale-105"
            >
              Réserver
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  data-testid="mobile-menu-trigger"
                  className={scrolled ? 'text-charcoal' : 'text-white'}
                >
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-bone w-[300px]">
                <div className="flex flex-col gap-6 mt-8">
                  <span className="font-heading text-2xl text-cedar font-medium">
                    Le Gros Arbre
                  </span>
                  <div className="flex flex-col gap-4">
                    {navLinks.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToSection(link.href);
                        }}
                        data-testid={`mobile-nav-${link.name.toLowerCase().replace(/\s/g, '-')}`}
                        className="text-charcoal hover:text-cedar font-medium text-lg transition-colors"
                      >
                        {link.name}
                      </a>
                    ))}
                  </div>
                  <div className="flex flex-col gap-4 mt-4 pt-4 border-t border-border">
                    <a
                      href="tel:0765872934"
                      className="flex items-center gap-2 text-cedar hover:text-wood"
                    >
                      <Phone className="w-5 h-5" strokeWidth={1.5} />
                      <span className="font-medium">07 65 87 29 34</span>
                    </a>
                    <Button
                      data-testid="mobile-reserve-btn"
                      onClick={() => {
                        setOpen(false);
                        onReserveClick();
                      }}
                      className="bg-cedar hover:bg-cedar-dark text-white rounded-full w-full"
                    >
                      Réserver une table
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
