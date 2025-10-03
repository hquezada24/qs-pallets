import { Outlet } from "react-router-dom";
import { Header } from "./components/common/Header/Index";
import { Footer } from "./components/common/Footer/Index";
import "./App.css";

function App() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Header />
      <main id="main-content" role="main">
        <Outlet /> {/* This renders the child routes */}
      </main>
      <Footer />
    </>
  );
}

export default App;
