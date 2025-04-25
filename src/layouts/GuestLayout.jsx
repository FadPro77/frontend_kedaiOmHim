/* eslint-disable react/prop-types */
import Footer from "../components/Footer";
import NavigationBar from "../components/Navbar/Index";

export default function GuestLayout({ children }) {
  return (
    <>
      <NavigationBar />
      {children}
      <Footer />
    </>
  );
}
