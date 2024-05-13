import React from "react";
import HomePage from "./pages/HomePage";
import { Cursor, Header} from "./components/components";

const App: React.FC = () => {
  return (
    <div className="bg-[#130726]">
      <Cursor/>
      <Header />
      <main className="md:mt-16 mt-20 mx-8">
       <HomePage />
    
      </main>
    </div>
  );
};

export default App;
