import { createBrowserRouter } from "react-router-dom";

import { Root, CreatePost, PageNotFound, Error } from "./routes";

import { RootLayout } from "./layouts";

const routes = [
  {
    path: "/",
    Component: Root,
  },
  {
    path: "/create",
    Component: CreatePost,
  },
  {
    path: "*",
    Component: PageNotFound,
  },
];

const router = createBrowserRouter([
  {
    Component: RootLayout,
    errorElement: <Error />,
    children: routes,
  },
]);

export default router;
