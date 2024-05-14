import React from "react";
import { Cursor, Footer, Header} from "./components/components";
import { Outlet } from "react-router-dom";

const App: React.FC = () => {
  return (
    <div className="bg-[#130726]">
      <Cursor/>
      <Header />
      <main className="md:mt-16 mt-20">
       <Outlet/>
      </main>
    <Footer/>
    </div>
  );
};

export default App;
