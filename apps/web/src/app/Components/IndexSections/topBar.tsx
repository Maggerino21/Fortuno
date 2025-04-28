import '../../globals.css'; // Correct path to globals.css
import Button from '@mui/material/Button';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Button variant='outlined' href="/login" className="navbar-button">
        Login
      </Button>
        <Button variant='outlined' href="/register" className="navbar-button">
            Register
        </Button>
    </nav>
  );
};

export default Navbar;

