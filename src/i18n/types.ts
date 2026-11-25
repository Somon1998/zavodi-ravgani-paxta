export type Dictionary = {
  brand: {
    name: string;
    tagline: string;
    homeAria: string;
  };
  seo: {
    title: string;
    description: string;
    ogTitle: string;
    ogImageAlt: string;
    twitterTitle: string;
  };
  a11y: {
    skipToContent: string;
    mainNav: string;
    footerNav: string;
    mobileNav: string;
    openMenu: string;
    closeMenu: string;
    languageSwitcher: string;
    aboutFacts: string;
    contactsList: string;
  };
  nav: {
    home: string;
    about: string;
    production: string;
    products: string;
    contacts: string;
  };
  hero: {
    status: string;
    title: string;
    titleAccent: string;
    description: string;
    ctaProducts: string;
    ctaAbout: string;
    directionLabel: string;
    directionValue: string;
    caption: string;
    imageAlt: string;
  };
  about: {
    title: string;
    text: string;
    moreProduction: string;
    cottonLine1: string;
    cottonLine2: string;
    openingLine1: string;
    openingLine2: string;
  };
  production: {
    title: string;
    items: Array<{ title: string; text: string }>;
  };
  products: {
    title: string;
    intro: string;
    contactLink: string;
    eyebrow: string;
    items: Array<{
      name: string;
      secondaryName: string;
      secondaryLang: "ru" | "tg" | "en";
      description: string;
      imageAlt: string;
    }>;
  };
  contacts: {
    title: string;
    lead: string;
    addressLabel: string;
    phoneLabel: string;
    whatsappLabel: string;
    whatsappCta: string;
    whatsappMessage: string;
  };
  footer: {
    opening: string;
  };
  location: {
    region: string;
    district: string;
    address: string;
  };
  gate: {
    title: string;
    subtitle: string;
    choose: string;
    languages: {
      ru: string;
      tg: string;
      en: string;
    };
  };
};
