import { Link } from "react-router-dom";

interface HeaderProps {
  variant?: "light" | "dark";
}

const Header = ({ variant = "dark" }: HeaderProps) => {
  const textClass =
    variant === "dark"
      ? "text-primary-foreground"
      : "text-foreground";
  const linkClass =
    variant === "dark"
      ? "text-primary-foreground/70 hover:text-primary-foreground"
      : "text-muted-foreground hover:text-foreground";

  return (
    <header
      className={`${variant === "dark" ? "absolute" : ""} top-0 left-0 right-0 z-50 px-6 py-5`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link
          to="/"
          className={`text-xl font-bold tracking-tight ${textClass} transition-opacity hover:opacity-90`}
          style={{ fontFamily: "var(--font-display)" }}
        >
          TechReview
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className={`text-sm ${linkClass} transition-colors`}
          >
            Reviews
          </Link>
          <Link
            to="/#guias"
            className={`text-sm ${linkClass} transition-colors`}
          >
            Guias
          </Link>
          <Link
            to="/#sobre"
            className={`text-sm ${linkClass} transition-colors`}
          >
            Sobre
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
