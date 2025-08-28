import App from "./App";
import { Products } from "./pages/Products/Products";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/products",
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
