import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

// Layout component to wrap other components
const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <html>
        <body>{children}</body>
      </html>
    </>
  );
};

export default Layout;
