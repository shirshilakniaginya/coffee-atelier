"use client";

import Image from "next/image";
import { contacts } from "@/lib/coffee-content";

const desktopNavigation = [
  { label: "Магазин", href: "#collection" },
  { label: "О компании", href: "#philosophy" },
] as const;

const mobileNavigation = [
  { label: "Магазин", href: "#collection" },
  { label: "О компании", href: "#philosophy" },
  { label: "Доставка", href: "#contacts" },
  { label: "Контакты", href: "#contacts" },
  { label: "Статьи", href: "#stories" },
  { label: "Фотогалерея", href: "#stories" },
  { label: "Видеогалерея", href: "#stories" },
] as const;

interface HeaderNavProps {
  cartCount: number;
  mobileMenuOpen: boolean;
  onCartOpen: () => void;
  onMobileMenuToggle: () => void;
  onMobileNavClick: () => void;
}

export default function HeaderNav({
  cartCount,
  mobileMenuOpen,
  onCartOpen,
  onMobileMenuToggle,
  onMobileNavClick,
}: HeaderNavProps) {
  return (
    <>
      <nav className="site-nav">
        <div className="site-nav__side site-nav__side--left">
          {desktopNavigation.map((item) => (
            <a key={item.label} href={item.href}>
              {item.label}
            </a>
          ))}
        </div>

        <a className="site-logo" href="#home" aria-label="Coffee People">
          <Image src="/coffee-people-logo.svg" alt="Coffee People" width={44} height={44} className="site-logo__image" priority />
          <span className="site-logo__text">Coffee People</span>
        </a>

        <div className="site-nav__side site-nav__side--right">
          <a href={`tel:${contacts.phone.replace(/[^\d+]/g, "")}`}>{contacts.phone}</a>
          <button type="button" className="nav-bag" onClick={onCartOpen}>
            Корзина{cartCount > 0 ? ` (${cartCount})` : ""}
          </button>
        </div>
        <button
          type="button"
          className={mobileMenuOpen ? "site-nav__toggle site-nav__toggle--open" : "site-nav__toggle"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          aria-label="Открыть меню"
          onClick={onMobileMenuToggle}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div
        className={mobileMenuOpen ? "mobile-nav mobile-nav--open" : "mobile-nav"}
        id="mobile-navigation"
      >
        {mobileNavigation.map((item) => (
          <a key={item.label} href={item.href} onClick={onMobileNavClick}>
            {item.label}
          </a>
        ))}
      </div>
    </>
  );
}
