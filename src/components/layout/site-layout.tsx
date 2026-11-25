import Image from "next/image";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/get-dictionary";
import { contactLinks, navigation, siteAssets } from "@/data/site";
import { LanguageSwitcher } from "./language-switcher";
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

type LayoutProps = {
  locale: Locale;
  dict: Dictionary;
};

export function Brand({ dict }: { dict: Dictionary }) {
  return (
    <a className="brand" href="#home" aria-label={dict.brand.homeAria}>
      <Image src={siteAssets.logo} width={48} height={56} alt="" />
      <span className="brand-text">
        <strong>{dict.brand.name}</strong>
        <small className="brand-tagline">{dict.brand.tagline}</small>
      </span>
    </a>
  );
}

export function Header({ locale, dict }: LayoutProps) {
  const phone = contactLinks(dict).find((item) => item.id === "phone");
  const links = navigation(dict);

  return (
    <header className="header">
      <div className="container header-inner">
        <Brand dict={dict} />
        <nav className="desktop-nav" aria-label={dict.a11y.mainNav}>
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <LanguageSwitcher
            locale={locale}
            label={dict.a11y.languageSwitcher}
            variant="header"
          />
          {phone && (
            <a className="button button-green header-contact" href={phone.href}>
              {phone.text}
              <PhoneIcon />
            </a>
          )}
          <MobileMenu dict={dict} />
        </div>
      </div>
    </header>
  );
}

export function Footer({ dict }: { dict: Dictionary }) {
  const links = navigation(dict);
  const contacts = contactLinks(dict);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <Brand dict={dict} />
          <nav aria-label={dict.a11y.footerNav}>
            {links.slice(1).map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        {contacts.length > 0 && (
          <div className="footer-contacts">
            {contacts.map((item) =>
              item.href ? (
                <a key={item.id} href={item.href}>
                  {item.text}
                </a>
              ) : (
                <span key={item.id}>{item.text}</span>
              ),
            )}
          </div>
        )}
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {dict.brand.name}
          </span>
          <span className="footer-location">
            {dict.location.address} · {dict.footer.opening}
          </span>
        </div>
      </div>
    </footer>
  );
}
