import App from "./App";
import { Home } from "./pages/Home/Home";
import { Products } from "./pages/Products/Products";
import { Quote } from "./pages/Quote/Quote";

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
        element: <Quote />,
      },
      {
        path: "/about",
      },
    ],
  },
];

export default routes;
