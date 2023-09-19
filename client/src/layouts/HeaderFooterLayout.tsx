import {
  Outlet
} from "react-router-dom"

import {
  Header,
  Main,
  Footer
} from "../components"

const HeaderFooterLayout = () => {
  return (
    <>
     <Header />
     <Main>
        <Outlet />     
     </Main>
     <Footer />
    </>
  )
}

export default HeaderFooterLayout