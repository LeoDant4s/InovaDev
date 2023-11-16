import "./Navbar.css";

// navbar 
export const NavBar = ({ goToMain }) => {
  return (

<nav className="navbar navbar-light custom-navbar">
  <div className="navbar-container">
    <span onClick={goToMain}> PROJETO INOVADEV
    </span>
  </div>
</nav>
  )
}
