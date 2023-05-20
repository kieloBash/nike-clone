
import Navbar from "@/components/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import SearchModal from "@/components/SearchModal";
import Provider from "@/components/Provider";

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
          <div className="flex flex-col w-full justify-between min-h-screen relative">
            <SearchModal />
            <div className="flex-grow flex-col w-full">
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
