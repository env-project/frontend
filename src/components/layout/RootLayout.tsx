import { Outlet } from "react-router";
import Header from "@/components/header/Header";
import Footer from "@/components/Footer";

export default function RootLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
