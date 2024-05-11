import Logo from "./Logo";

const Header: React.FC = () => {
  interface NavItem {
    name: string;
    link: string;
  }

  const nav: NavItem[] = [
    { name: "Home", link: "/" },
    { name: "About", link: "/" },
    { name: "Servics", link: "/" },
    { name: "Contact", link: "/" },
  ];

  return (
    <div className="h-28 w-full flex font-headingFont px-10 items-center justify-between gap-1 font-sm">
      <div className="">
      <Logo/>
      </div>
      <div>
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
      </div>
      </div>
      <div className="hidden  md:min-w-1/2 lg:min-w-1/2 rounded-full text-white md:block lg:block bg-[#301E53] px-10 py-4">
        <ul className="flex gap-5  justify-center items-center ">
          {nav.map((item:any) => {
            return (
              <li key={item.name} className="bg-[#130726] py-1 rounded-full px-5  ">
                {item.name}
              </li>
            );
          })}
        </ul>
       
      </div>
      <div className="login">
          <button className=" py-1 bg-[#301E53] shadow-2xl  rounded-full px-5 text-gray-200  ">Sign In</button> 
        </div>
    </div>
  );
};

export default Header;
