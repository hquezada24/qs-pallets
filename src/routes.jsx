import App from "./App";
import { Home } from "./pages/Home/Home";
import { Products } from "./pages/Products/Products";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true, // This makes Home the default child route
        element: <Home />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "/request-a-quote",
      },
      {
        path: "/about",
      },
    ],
  },
];

export default routes;
