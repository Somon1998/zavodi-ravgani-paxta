import Image from "next/image";
import { site, contactLinks } from "@/data/site";
import { MobileMenu } from "./mobile-menu";

function PhoneIcon() {
  return (
    <svg
      className="phone-icon"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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
  const phone = contactLinks().find((item) => item.label === "Телефон");
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
        {phone && (
          <a className="button button-green header-contact" href={phone.href}>
            {phone.text}
            <PhoneIcon />
          </a>
        )}
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
          <span className="footer-location">
            {site.contacts.address} · Готовимся к открытию
          </span>
        </div>
      </div>
    </footer>
  );
}
