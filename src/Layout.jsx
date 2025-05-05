
import { Outlet } from "react-router";
import Header from "./Pages/Header";

const Layout = () => (
  <>
    <Header />
    <main className="max-w-6xl mx-auto px-4 py-6">
      <Outlet />
    </main>
  </>
);

export default Layout;
