const Header: React.FC = () => {
  return (
    <div className="h-28 w-full flex font-headingFont">
      <div className="w-[50%] m-auto rounded-full text-white bg-[#301E53] p-4">
        <ul className="flex gap-16  justify-center items-center ">
          <li className="bg-[#130726] p-2 rounded-full px-8">HOME</li>
          <li>ABOUT</li>
          <li>SERVICS</li>
          <li>CONTACT</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
