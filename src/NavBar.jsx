
import { Link } from "react-router-dom";
import './NavBar.css';

function NavBar() {
  return (
    <>
      <nav>
        <Link to="/add">הוספת תרומה</Link> {/* קישור לדף הוספת תרומה */}
        <Link to="/list">רשימת תרומות</Link> {/* קישור לדף הצגת רשימת התרומות */}
      </nav>
    </>
  );
}

export default NavBar;
