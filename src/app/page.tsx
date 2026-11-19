import { Header, Footer } from "@/components/layout/site-layout";
import {
  Hero,
  About,
  Production,
  Products,
  Contacts,
} from "@/components/sections/home";
export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Перейти к содержимому
      </a>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Production />
        <Products />
        <Contacts />
      </main>
      <Footer />
    </>
  );
}
