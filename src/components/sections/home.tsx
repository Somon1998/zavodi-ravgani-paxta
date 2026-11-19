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
            О заводе <Arrow />
          </a>
        </div>
        <div className="hero-facts">
          <div>
            <span className="fact-symbol" aria-hidden="true">
              ⌖
            </span>
            <span>
              Таджикистан
              <br />
              <strong>город Бохтар</strong>
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
          <h2>О заводе</h2>
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
            <span>{site.location}</span>
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
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 639px) 100vw, 33vw"
              />
              <div className="process-overlay">
                <span className="process-number">0{i + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="image-disclaimer">
          <span aria-hidden="true">ⓘ</span> Изображения созданы с помощью ИИ и
          носят иллюстративный характер. Это не фотографии нашего завода или
          готовой продукции.
        </p>
      </div>
    </section>
  );
}
export function Products() {
  return (
    <section id="products" className="section products">
      <div className="container products-grid">
        <div className="products-intro">
          <h2>Наша продукция</h2>
          <p className="body-copy">
            Наше направление — производство хлопкового растительного масла.
          </p>
          <a className="text-link" href="#contacts">
            Контактная информация <span aria-hidden="true">→</span>
          </a>
        </div>
        <div>
          {site.products.map((product) => (
            <article className="product-card" key={product.name}>
              <div className="product-image">
                <Image
                  src={product.image}
                  alt="Иллюстрация масла в прозрачной бутылке рядом с хлопком; упаковка условная"
                  fill
                  sizes="(max-width: 639px) 100vw, 240px"
                />
                <span className="image-label">Иллюстрация продукта</span>
              </div>
              <div className="product-info">
                <span className="eyebrow">Готовимся к выпуску</span>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
export function Contacts() {
  const links = contactLinks();
  return (
    <section id="contacts" className="section contacts">
      <div className="container contacts-grid">
        <div>
          <p className="eyebrow">Будем на связи</p>
          <h2>Контакты</h2>
          <p className="body-copy">{site.location}</p>
          <p className="muted">
            Точный адрес будет опубликован после подтверждения.
          </p>
        </div>
        <div className="contact-panel">
          {links.length ? (
            <dl>
              {links.map((item) => (
                <div key={item.label}>
                  <dt>{item.label}</dt>
                  <dd>
                    {item.href ? (
                      <a href={item.href}>{item.text}</a>
                    ) : (
                      item.text
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          ) : (
            <>
              <span className="status-pill">
                <span className="status-dot" />
                Скоро открытие
              </span>
              <h3>Начинаем с главного</h3>
              <p>
                Сейчас мы готовим предприятие к запуску. Телефон, электронная
                почта и WhatsApp появятся здесь, как только будут подтверждены.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
