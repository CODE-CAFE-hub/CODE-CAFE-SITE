import Logo from "../Logo";

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
    <div className="md:h-28 w-full flex font-headingFont md:px-14 items-center justify-between gap-1 font-sm px-5 py-2 fixed top-0  bg-[#0a0613] z-30">
      <div className=" flex gap-10 justify-center items-center">
      <div className="drawer md:hidden w-5">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label htmlFor="my-drawer" className="">
            {" "}
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle md:hidden "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
          </label>
        </div>
        <div className="drawer-side opacity-95 ">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu fixed  w-80 min-h-full  mt-20 text-base-content  z-40  bg-[#301E53]">
            {/* Sidebar content here */}
            {nav.map((item: any) => {
            return (
              <li
                key={item.name}
                className="py-2 my-5 rounded-lg px-5 text-center text-xl bg-[#0a0612] "
              >
                {item.name}
              </li>
            );
          })}
          </ul>
        </div>
      </div>
      <div className="flex justify-center items-center gap-2">
        
          <Logo />
        </div>
      </div>
      <div className="hidden  md:min-w-1/2 lg:min-w-1/2 rounded-full text-white md:block lg:block bg-[#301E53] px-10 py-4 sha">
        <ul className="flex gap-5  justify-center items-center ">
          {nav.map((item: any) => {
            return (
              <li
                key={item.name}
                className="bg-[#130726] py-1 rounded-full px-5  "
              >
                {item.name}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="login">
        <button className=" py-1 mr-8 bg-[#301E53] shadow-2xl  rounded-full px-5 text-gray-200  ">
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Header;
