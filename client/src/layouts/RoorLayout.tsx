import { Outlet } from "react-router-dom";
import { Header, Footer } from "../components";

const RootLayout = () => {
  return (
    <>
      <Header />
      <main className="relative mx-auto bg-[#f9fafe] px-4 py-1 min-h-[calc(100vh-360px)]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;
