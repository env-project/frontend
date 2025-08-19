import { Outlet } from "react-router";
import Header from "@/components/header/Header";
import Footer from "@/components/Footer";

export default function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1  pt-[52px] sm:pt-[110px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
