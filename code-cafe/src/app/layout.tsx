import { ReactNode } from "react";
import "../styles/global.css";
interface LayoutProps {
  children: ReactNode;
}

// Layout component to wrap other components
const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <html>
        <body className="bg-teal-100">{children}</body>
      </html>
    </>
  );
};

export default Layout;
