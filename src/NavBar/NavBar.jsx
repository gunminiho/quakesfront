import "bootstrap/dist/css/bootstrap.min.css";
import Settings from "./Settings/Settings";
import Pagination from "./Pagination/Pagination";


const NavBar = () => {

  return (
    <>
      <nav className="navbar bg-success-subtle justify-content-center ">
        <div className="d-flex flex-nowrap ">
            <div className="order-1 p-2">
         <Settings />
         </div>
         <div className="order-2 p-2">
         <Pagination />
         </div>
         </div>
      </nav>
    </>
  );
};

export default NavBar;
