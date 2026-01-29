import React from "react";
import SocialIcons from "./SocialIcons";
import Newsletter from "./Newsletter";
import FooterLinks from "./FooterLinks";
import FooterBottom from "./FooterBottom";

import "./Footer.scss";

const Footer = () => {
  const navigationLinks = [
    { id: 1, label: "Home", to: "/" },
    { id: 2, label: "Receitas", to: "/receitas" },
    { id: 3, label: "Categorias", to: "/categorias" },
    { id: 4, label: "Sobre Nós", to: "/sobre" },
    { id: 5, label: "Contato", to: "/contato" },
  ];

  const categoryLinks = [
    { id: 1, label: "Sobremesas", to: "/categoria/sobremesas" },
    { id: 2, label: "Pratos Principais", to: "/categoria/pratos-principais" },
    { id: 3, label: "Aperitivos", to: "/categoria/aperitivos" },
    { id: 4, label: "Vegetariano", to: "/categoria/vegetariano" },
    { id: 5, label: "Low Carb", to: "/categoria/low-carb" },
    { id: 6, label: "Fitness", to: "/categoria/fitness" },
  ];

  const resourceLinks = [
    { id: 1, label: "Blog", to: "/blog" },
    { id: 2, label: "Dicas de Culinária", to: "/dicas" },
    { id: 3, label: "Planos de Refeição", to: "/planos" },
    { id: 4, label: "App Móvel", href: "#", external: true },
    { id: 5, label: "FAQ", to: "/faq" },
    { id: 6, label: "Suporte", to: "/suporte" },
  ];

  const handleNewsletterSubmit = async (email) => {
    // TODO: Integrar com API
    console.log("Inscrição na newsletter:", email);
    // await api.post('/newsletter/subscribe', { email });
  };

  const handleSocialClick = (platform) => {
    console.log("Rede social clicada:", platform);
    // Analytics ou redirecionamento personalizado
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__main">
        <div className="footer__container">
          {/* Seção Brand */}
          <div className="footer__brand">
            <div className="footer__logo-container">

              <h2 className="footer__brand-name">Sabores</h2>
            </div>

            <p className="footer__brand-tagline">
              Descubra, compartilhe e saboreie as melhores receitas!
            </p>

            <div className="footer__social">
              <h3 className="footer__social-title">Conecte-se conosco</h3>
              <SocialIcons
                onSocialClick={handleSocialClick}
                variant="colored"
              />
            </div>
          </div>


          {/* Seção Links */}
          <div className="footer__links-grid">
            <FooterLinks
              title="Navegação"
              links={navigationLinks}
            />

            <FooterLinks
              title="Categorias"
              links={categoryLinks}
              columns={2}
            />

            <FooterLinks
              title="Recursos"
              links={resourceLinks}
              columns={2}
            />
          </div>

          {/* Seção Newsletter */}
          <div className="footer__newsletter">
            <Newsletter
              onSubmit={handleNewsletterSubmit}
              title="Receba nossas melhores receitas"
              subtitle="Inscreva-se para receber receitas exclusivas diretamente no seu email"
            />
          </div>




        </div>
      </div>

      {/* Footer Bottom */}
      <FooterBottom />
    </footer>
  );
};

export default Footer;