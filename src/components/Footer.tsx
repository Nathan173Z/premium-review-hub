import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border py-12 md:py-16">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        <div>
          <Link to="/" className="text-lg font-bold text-foreground" style={{ fontFamily: "var(--font-display)" }}>
            TechReview
          </Link>
          <p className="mt-2 text-sm text-muted-foreground">
            Reviews honestos de produtos de tecnologia.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3">Links</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Reviews
              </Link>
            </li>
            <li>
              <Link to="/#guias" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Guias
              </Link>
            </li>
            <li>
              <Link to="/#sobre" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Sobre
              </Link>
            </li>
            <li>
              <Link to="/admin" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Admin
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3">Aviso</h4>
          <p className="text-sm text-muted-foreground">
            Links de afiliados — podemos receber comissão por compras qualificadas.
          </p>
        </div>
      </div>
      <div className="mt-10 pt-8 border-t border-border text-center">
        <p className="text-sm text-muted-foreground">
          © 2026 TechReview. Todos os direitos reservados.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
