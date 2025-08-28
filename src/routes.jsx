import App from "./App";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/products",
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
