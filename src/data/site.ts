// Единственное место для замены временного бренда и сведений заказчика.
export const site = {
  name: "Маслозавод",
  tagline: "Производство растительного масла",
  logo: "/logo/cotton.svg",
  description:
    "Новое предприятие по производству растительного масла в Таджикистане готовится к открытию.",
  location: "Бохтар, Таджикистан",
  contacts: { phone: "", whatsapp: "", email: "", address: "" },
  navigation: [
    { href: "#home", label: "Главная" },
    { href: "#about", label: "О заводе" },
    { href: "#production", label: "Производство" },
    { href: "#products", label: "Продукция" },
    { href: "#contacts", label: "Контакты" },
  ],
  about:
    "Наше предприятие готовится к открытию производства растительного масла. В ближайшее время здесь появится подробная информация о деятельности завода и выпускаемой продукции.",
  production: [
    {
      title: "Хлопковое растение",
      text: "От растения начинается история хлопкового масла.",
      image: "/images/cotton.webp",
      alt: "Иллюстрация белого хлопка на ветке",
    },
    {
      title: "Сырьё для производства",
      text: "Семена хлопчатника — сырьё для хлопкового масла.",
      image: "/images/seeds.webp",
      alt: "Иллюстрация семян хлопчатника",
    },
    {
      title: "Растительное масло",
      text: "Направление будущего производства нашего предприятия.",
      image: "/images/oil.webp",
      alt: "Иллюстрация золотистого растительного масла",
    },
  ],
  products: [
    {
      name: "Хлопковое масло",
      description:
        "Растительное масло из семян хлопчатника. Подробная информация о продукте появится после открытия предприятия.",
      image: "/images/product.webp",
    },
  ],
};

function getSiteUrl() {
  const value = process.env.NEXT_PUBLIC_SITE_URL;
  if (!value) return undefined;
  const url = new URL(value);
  if (url.protocol !== "https:")
    throw new Error("NEXT_PUBLIC_SITE_URL должен начинаться с https://");
  return url.origin;
}
export const siteUrl = getSiteUrl();

export function contactLinks() {
  const { phone, whatsapp, email, address } = site.contacts;
  return [
    phone && {
      label: "Телефон",
      text: phone,
      href: `tel:${phone.replace(/[^+\d]/g, "")}`,
    },
    whatsapp && {
      label: "WhatsApp",
      text: "Написать в WhatsApp",
      href: `https://wa.me/${whatsapp.replace(/\D/g, "")}`,
    },
    email && {
      label: "Электронная почта",
      text: email,
      href: `mailto:${email}`,
    },
    address && { label: "Адрес", text: address, href: "" },
  ].filter((item): item is { label: string; text: string; href: string } =>
    Boolean(item),
  );
}
