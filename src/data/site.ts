// Подтверждённые сведения заказчика. SVG-знак пока временный.
const brandName = "Вахш Саноат";
const aboutTitle = `О ${brandName}`;
/** Официальный адрес предприятия — единый источник для Contacts и Footer. */
const address =
  "Республика Таджикистан, Хатлонская область, Кушониёнский район, Джамоат посёлок Бохтариён, село С.Шерози";
export const site = {
  name: brandName,
  aboutTitle,
  tagline: "Производство растительного масла",
  logo: "/logo/cotton.svg",
  description: `«${brandName}» — новое предприятие по производству хлопкового масла в Таджикистане. Готовимся к открытию.`,
  region: "Хатлонская область",
  district: "Кушониёнский район",
  location: address,
  contacts: {
    phone: "+992 88 844 3588",
    whatsapp: "+992 88 844 3588",
    whatsappMessage:
      "Здравствуйте! Меня интересует продукция „Вахш Саноат“. Хотел бы получить дополнительную информацию",
    email: "",
    address,
  },
  navigation: [
    { href: "#home", label: "Главная" },
    { href: "#about", label: aboutTitle },
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
    },
    {
      title: "Сырьё для производства",
      text: "Семена хлопчатника — сырьё для хлопкового масла.",
    },
    {
      title: "Растительное масло",
      text: "Направление будущего производства нашего предприятия.",
    },
  ],
  products: [
    {
      name: `Хлопковое масло «${brandName}»`,
      nameTg: "Равғани пахта",
      description:
        "Растительное масло из семян хлопчатника. Подробная информация о продукте появится после открытия предприятия.",
      image: "/images/vakhsh-sanoat-product.webp",
      imageAlt: `Предварительный макет бутылки и этикетки «${brandName}», предоставленный заказчиком`,
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
  // Адрес выводится отдельно в Contacts и Footer из site.contacts.address.
  const { phone, whatsapp, whatsappMessage, email } = site.contacts;
  return [
    phone && {
      label: "Телефон",
      text: phone,
      href: `tel:${phone.replace(/[^+\d]/g, "")}`,
    },
    whatsapp && {
      label: "WhatsApp",
      text: "Написать в WhatsApp",
      href: `https://wa.me/${whatsapp.replace(/\D/g, "")}${whatsappMessage ? `?text=${encodeURIComponent(whatsappMessage)}` : ""}`,
    },
    email && {
      label: "Электронная почта",
      text: email,
      href: `mailto:${email}`,
    },
  ].filter((item): item is { label: string; text: string; href: string } =>
    Boolean(item),
  );
}
