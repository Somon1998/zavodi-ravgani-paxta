import type { Dictionary } from "../types";

const brandName = "Vakhsh Sanoat";

export const en: Dictionary = {
  brand: {
    name: brandName,
    tagline: "Vegetable oil production",
    homeAria: `${brandName} — go to homepage`,
  },
  seo: {
    title: `${brandName} — cottonseed oil in Tajikistan`,
    description: `${brandName} is a new cottonseed oil production enterprise in Tajikistan. We are preparing to open.`,
    ogTitle: `${brandName} — preparing to open`,
    ogImageAlt: "Illustration of vegetable oil production",
    twitterTitle: `${brandName} — cottonseed oil in Tajikistan`,
  },
  a11y: {
    skipToContent: "Skip to content",
    mainNav: "Primary navigation",
    footerNav: "Footer navigation",
    mobileNav: "Mobile navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    languageSwitcher: "Language selection",
    aboutFacts: "Company highlights",
    contactsList: "Contact details",
  },
  nav: {
    home: "Home",
    about: "About",
    production: "Production",
    products: "Products",
    contacts: "Contacts",
  },
  hero: {
    status: "Preparing to open",
    title: "Vegetable oil",
    titleAccent: "from the producer",
    description: `${brandName} is a new cottonseed oil production enterprise in Tajikistan. We are preparing to open.`,
    ctaProducts: "Our products",
    ctaAbout: "About the company",
    directionLabel: "Our focus",
    directionValue: "cottonseed oil",
    caption: "Illustration of future production",
    imageAlt:
      "Demonstrative illustration of oil production, not a photograph of our facility",
  },
  about: {
    title: `About ${brandName}`,
    text: `${brandName} is preparing to launch cottonseed oil production in Tajikistan. After the enterprise opens, detailed information about the company, production, and products will be published here.`,
    moreProduction: "More about production",
    cottonLine1: "Cottonseed",
    cottonLine2: "oil",
    openingLine1: "Preparing",
    openingLine2: "to open",
  },
  production: {
    title: "Production",
    items: [
      {
        title: "The cotton plant",
        text: "The story of cottonseed oil begins with the plant.",
      },
      {
        title: "Raw material for production",
        text: "Cotton seeds are the raw material for cottonseed oil.",
      },
      {
        title: "Vegetable oil",
        text: "The focus of our enterprise’s future production.",
      },
    ],
  },
  products: {
    title: "Our products",
    intro: "Our focus is the production of cottonseed vegetable oil.",
    contactLink: "Contact information",
    eyebrow: "Preparing for launch",
    items: [
      {
        name: `${brandName} cottonseed oil`,
        secondaryName: "Равғани пахта",
        secondaryLang: "tg",
        description:
          "Vegetable oil made from cotton seeds. Detailed product information will be published after the enterprise opens.",
        imageAlt: `Preliminary bottle and label mockup for ${brandName}, provided by the client`,
      },
    ],
  },
  contacts: {
    title: "Contacts",
    lead: "Get in touch with us about products and cooperation",
    addressLabel: "Address",
    phoneLabel: "Phone",
    whatsappLabel: "WhatsApp",
    whatsappCta: "Message on WhatsApp",
    whatsappMessage: `Hello! I am interested in ${brandName} products and would like more information`,
  },
  footer: {
    opening: "Preparing to open",
  },
  location: {
    region: "Khatlon Region",
    district: "Kushoniyon District",
    address:
      "Republic of Tajikistan, Khatlon Region, Kushoniyon District, Bokhtariyon town jamoat, S. Sherozi village",
  },
  gate: {
    title: brandName,
    subtitle: "Vegetable oil production",
    choose: "Choose your language",
    languages: {
      ru: "Русский",
      tg: "Тоҷикӣ",
      en: "English",
    },
  },
};
