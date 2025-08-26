import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div id="Header">
      <div className="logo">
        <h1>QS Pallets</h1>
      </div>
      <nav>
        <ul>
          {/* <Link to="">Home</Link>
          <Link to="">Producs</Link>
          <Link to="">Request a Quote</Link>
          <Link to="">About Us</Link> */}
        </ul>
      </nav>
    </div>
  );
};

export { Header };
