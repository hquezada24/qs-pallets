import { Outlet } from "react-router-dom";
import { Header } from "./components/common/Header/Index";
//import { Home } from "./pages/Home/Home";
import { Footer } from "./components/common/Footer/Index";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet /> {/* This renders the child routes */}
      </main>
      <Footer />
    </>
  );
}

export default App;
