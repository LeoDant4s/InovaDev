import "./Layout.css";
import { NavBar } from "./Navbar"

// Layout das páginas
export const Layout = ({ children, goToMain }) => {
  return (
    <div>
      {/* Navbar */}
      <NavBar goToMain={goToMain} />

      {/* Conteúdo das páginas */}
      <div className="page-container">
        {children}
      </div>
    </div>
  )
}