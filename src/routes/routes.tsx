import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Error from "../pages/Error";
import Item from "../pages/Item";
import Layout from "../pages/Layout";

export const routerConfig = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/search/:query?",
        element: <Home />,
      },
      {
        path: "/region/:queryRegion?",
        element: <Home />,
      },
      {
        path: "/country/:countryID",
        element: <Item />,
      },
    ],
    errorElement: <Error />,
  },
]);
