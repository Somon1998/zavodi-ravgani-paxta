import Image from "next/image";
import { site, contactLinks } from "@/data/site";

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export function Hero() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <Image
        className="hero-photo"
        src="/images/hero.webp"
        alt="Демонстрационная иллюстрация производства масла, не фотография нашего предприятия"
        fill
        priority
        sizes="100vw"
      />
      <div className="hero-shade" />
      <div className="container hero-content">
        <div className="eyebrow hero-status">
          <span className="status-dot" />
          Готовимся к открытию
        </div>
        <h1 id="hero-title">
          Растительное масло <span>от производителя</span>
        </h1>
        <p>{site.description}</p>
        <div className="hero-actions">
          <a className="button button-gold" href="#products">
            Наша продукция <span aria-hidden="true">→</span>
          </a>
          <a className="button button-outline" href="#about">
            {site.aboutTitle} <Arrow />
          </a>
        </div>
        <div className="hero-facts">
          <div>
            <span className="fact-symbol" aria-hidden="true">
              ⌖
            </span>
            <span>
              {site.region}
              <br />
              <strong>{site.district}</strong>
            </span>
          </div>
          <div>
            <Image src={site.logo} width={34} height={38} alt="" />
            <span>
              Наше направление
              <br />
              <strong>хлопковое масло</strong>
            </span>
          </div>
        </div>
      </div>
      <span className="hero-caption">Иллюстрация будущего производства</span>
      <svg
        className="hero-wave"
        viewBox="0 0 1440 70"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          fill="#D9AC45"
          d="M0 22C210 0 280 75 500 35S800 18 990 42s300-28 450-34v62H0Z"
        />
        <path
          fill="#F8F9F6"
          d="M0 45C210 12 325 74 530 49s300-10 480-1 330-15 430-20v42H0Z"
        />
      </svg>
    </section>
  );
}
export function About() {
  return (
    <section id="about" className="section about">
      <div className="container about-grid">
        <div>
          <h2>{site.aboutTitle}</h2>
          <p className="body-copy">{site.about}</p>
          <a href="#production" className="button button-green about-link">
            Подробнее о производстве <span aria-hidden="true">→</span>
          </a>
        </div>
        <ul className="about-facts" aria-label="Коротко о предприятии">
          <li>
            <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
              <path d="M20 36S7 23 7 15a13 13 0 0 1 26 0c0 8-13 21-13 21Z" />
              <circle cx="20" cy="15" r="5" />
            </svg>
            <span>
              {site.region}
              <br />
              {site.district}
            </span>
          </li>
          <li>
            <Image src={site.logo} alt="" width={40} height={46} />
            <span>
              Хлопковое
              <br />
              масло
            </span>
          </li>
          <li>
            <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
              <circle cx="20" cy="20" r="16" />
              <path d="M20 9v12l8 5" />
            </svg>
            <span>
              Готовимся
              <br />к открытию
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
}
export function Production() {
  return (
    <section id="production" className="section production">
      <div className="container">
        <div className="section-heading">
          <div>
            <h2>Производство</h2>
          </div>
          <p className="section-aside">
            Знакомимся с хлопком и маслом.
            <br />
            Подробности о заводе — после открытия.
          </p>
        </div>
        <div className="production-grid">
          {site.production.map((item, i) => (
            <article className="process-card" key={item.title}>
              <span className="process-number">0{i + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
export function Products() {
  return (
    <section id="products" className="section products">
      <div className="container">
        <div className="products-intro">
          <h2>Наша продукция</h2>
          <p className="body-copy">
            Наше направление — производство хлопкового растительного масла.
          </p>
          <a className="text-link" href="#contacts">
            Контактная информация <span aria-hidden="true">→</span>
          </a>
        </div>
        {site.products.map((product) => (
          <article className="product-card" key={product.name}>
            <figure className="product-visual">
              <div className="product-image">
                <Image
                  src={product.image}
                  alt={product.imageAlt}
                  fill
                  sizes="(max-width: 639px) 100vw, (max-width: 1199px) 55vw, 640px"
                  className="product-photo"
                />
              </div>
            </figure>
            <div className="product-info">
              <span className="eyebrow">Готовимся к выпуску</span>
              <h3>{product.name}</h3>
              <p lang="tg" className="product-name-tg">
                {product.nameTg}
              </p>
              <p>{product.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
function MapPinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="10"
        r="3"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function PhoneContactIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
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

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.87 9.87 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.01Zm-7.01 15.24h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.55-3.7 8.24-8.24 8.24Zm4.52-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.17-.48-.29Z"
      />
    </svg>
  );
}

export function Contacts() {
  const links = contactLinks();
  const phone = links.find((item) => item.label === "Телефон");
  const whatsapp = links.find((item) => item.label === "WhatsApp");

  return (
    <section id="contacts" className="section contacts">
      <div className="container">
        <div className="contacts-panel">
          <div className="contacts-intro">
            <h2>Контакты</h2>
            <p className="contacts-lead">
              Свяжитесь с нами по вопросам продукции и сотрудничества
            </p>
          </div>
          <ul className="contact-list" aria-label="Контактная информация">
            <li className="contact-item">
              <span className="contact-icon" aria-hidden="true">
                <MapPinIcon />
              </span>
              <div className="contact-body">
                <span className="contact-label">Адрес</span>
                <p className="contact-value contact-address">
                  {site.contacts.address}
                </p>
              </div>
            </li>
            {phone && (
              <li>
                <a className="contact-item contact-item-link" href={phone.href}>
                  <span className="contact-icon" aria-hidden="true">
                    <PhoneContactIcon />
                  </span>
                  <span className="contact-body">
                    <span className="contact-label">Телефон</span>
                    <span className="contact-value">{phone.text}</span>
                  </span>
                </a>
              </li>
            )}
            {whatsapp && (
              <li>
                <a
                  className="contact-item contact-item-link"
                  href={whatsapp.href}
                >
                  <span className="contact-icon" aria-hidden="true">
                    <WhatsAppIcon />
                  </span>
                  <span className="contact-body">
                    <span className="contact-label">WhatsApp</span>
                    <span className="contact-value">{whatsapp.text}</span>
                  </span>
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
