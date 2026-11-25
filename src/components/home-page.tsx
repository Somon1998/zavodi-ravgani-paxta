import { Header, Footer } from "@/components/layout/site-layout";
import {
  Hero,
  About,
  Production,
  Products,
  Contacts,
} from "@/components/sections/home";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export function HomePage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <>
      <a className="skip-link" href="#main">
        {dict.a11y.skipToContent}
      </a>
      <Header locale={locale} dict={dict} />
      <main id="main">
        <Hero dict={dict} />
        <About dict={dict} />
        <Production dict={dict} />
        <Products dict={dict} />
        <Contacts dict={dict} />
      </main>
      <Footer dict={dict} />
    </>
  );
}
