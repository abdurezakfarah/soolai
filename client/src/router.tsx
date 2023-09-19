import { createBrowserRouter } from "react-router-dom"

import { 
    Root,
    CreatePost,
    PageNotFound,
    Error,
    } from "./routes"
    
import {
  HeaderFooterLayout
} from "./layouts"


const routes = [
    {
    path: "/",
    Component: Root,    
  },
  {
    path: "/create-post",
    Component: CreatePost,
    
  },
  {
    path: "*",
    Component: PageNotFound 
  },
]


const router = createBrowserRouter([{
  Component: HeaderFooterLayout,
  errorElement: <Error />,
  children: routes
}]
)

export default router