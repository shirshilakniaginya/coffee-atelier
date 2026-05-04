import Image from "next/image";
import { contacts } from "@/lib/coffee-content";

const footerNavigation = [
  { label: "Магазин", href: "#collection" },
  { label: "О компании", href: "#philosophy" },
  { label: "Истории", href: "#stories" },
  { label: "Контакты", href: "#contacts" },
] as const;

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__layout">
        <div className="site-footer__brand">
          <a className="site-logo site-logo--footer" href="#home" aria-label="Coffee People">
            <Image src="/coffee-people-logo.svg" alt="Coffee People" width={38} height={38} className="site-logo__image site-logo__image--footer" />
            <span className="site-logo__text">Coffee People</span>
          </a>
          <p>Спокойная подача кофе без визуального шума: выбрать, заказать и вернуться за любимым вкусом.</p>
        </div>

        <nav className="site-footer__nav" aria-label="Footer">
          <span className="site-footer__label">Разделы</span>
          <div className="site-footer__links">
            {footerNavigation.map((item) => (
              <a key={item.label} href={item.href}>
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        <div className="site-footer__contact">
          <span className="site-footer__label">На связи</span>
          <a href={`tel:${contacts.phone.replace(/[^\d+]/g, "")}`}>{contacts.phone}</a>
          <a href={`mailto:${contacts.email}`}>{contacts.email}</a>
          <p>{contacts.address}</p>
        </div>
      </div>

      <div className="site-footer__bottom">
        <span>© 2026 Coffee People</span>
        <span>{contacts.hours}</span>
      </div>
    </footer>
  );
}