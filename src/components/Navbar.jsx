import "./Navbar.css";

// navbar 
export const NavBar = ({ goToMain }) => {
  return (

<nav className="navbar navbar-light custom-navbar">
  <div className="navbar-container">
    <span onClick={goToMain}> INOVADEV
    </span>
  </div>
</nav>
  )
}
