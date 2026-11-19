import Image from "next/image";
import { site, contactLinks } from "@/data/site";
import { MobileMenu } from "./mobile-menu";

export function Brand() {
  return (
    <a className="brand" href="#home" aria-label={`${site.name} — на главную`}>
      <Image src={site.logo} width={48} height={56} alt="" />
      <span>
        <strong>{site.name}</strong>
        <small>{site.tagline}</small>
      </span>
    </a>
  );
}
export function Header() {
  return (
    <header className="header">
      <div className="container header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Основная навигация">
          {site.navigation.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <a className="button button-green header-contact" href="#contacts">
          Связаться с нами <span aria-hidden="true">↗</span>
        </a>
        <MobileMenu />
      </div>
    </header>
  );
}
export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <Brand />
          <nav aria-label="Навигация в подвале">
            {site.navigation.slice(1).map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        {contactLinks().length > 0 && (
          <div className="footer-contacts">
            {contactLinks().map((item) =>
              item.href ? (
                <a key={item.label} href={item.href}>
                  {item.text}
                </a>
              ) : (
                <span key={item.label}>{item.text}</span>
              ),
            )}
          </div>
        )}
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <span>{site.location} · Готовимся к открытию</span>
        </div>
      </div>
    </footer>
  );
}
