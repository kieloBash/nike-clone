import Navbar from "@/components/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import SearchModal from "@/components/SearchModal";
import Provider from "@/components/Provider";
import Loading from "@/components/Loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Nike Clone",
  description: "Practice Cloning Nike",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <div className="relative flex min-h-screen w-full flex-col justify-between">
            <SearchModal />
            <Loading />
            <div className="w-full flex-grow flex-col">
              <Navbar />
              <main>{children}</main>
            </div>
            <Footer />
          </div>
        </Provider>
      </body>
    </html>
  );
}
