import "./globals.css";
import Navbaar from "./components/Navbar";
import Footer from "./components/Footer";
import SessionWrapper from "./components/SessionWrapper";

export const metadata = {
  title: "Get Me A Chai",
  description: "A delightful app for chai lovers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
        <SessionWrapper>
          <Navbaar />
          <div className=" min-h-[83.6vh] text-white box-border">
            {children}
          </div>
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}
