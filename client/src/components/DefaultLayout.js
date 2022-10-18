import React from "react";
import "../resources/layout.css";
import{useSelector} from 'react-redux'
import { useNavigate } from "react-router-dom";
import flightLogo from "../images/f-logo.png"


const DefaultLayout = ({ children }) => {
  
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = React.useState(false);
  const { user } = useSelector((state) => state.users);
  const userMenu = [
    { name: "Home", icon: "ri-home-line", path: "/" },
    { name: "Bookings", icon: "ri-file-list-line", path: "/bookings" },
    { name: "Profile", icon: "ri-user-line", path: "/profile" },
    { name: "Logout", icon: "ri-logout-box-line", path: "/logout" },
  ];
  const adminMenu = [
    { name: "Home", path: "/", icon: "ri-home-line" },
    { name: "Flights", path: "/admin/flights", icon: "ri-plane-line" },
    { name: "Users", path: "/admin/users", icon: "ri-user-line" },
    { name: "Bookings", path: "/admin/bookings", icon: "ri-file-list-line" },
    { name: "Logout", path: "/logout", icon: "ri-logout-box-line" },
  ];
  const menuToBeRendered = user?.isAdmin ? adminMenu : userMenu;

  return (
    <div>
      <div className="layout-parent">
        <div className="sidebar">
        <div className="sidebar-header pb-5 mb-5">


             <h1 className="logo d-flex m-3 font-d"><img id="bb" src={flightLogo}></img>
             {!collapsed && <span className="font-d ps-3 pe-3">K.Flights</span>}
             </h1>
            
        </div>
          <div className=" ">
            {menuToBeRendered.map((item, index) => {
              return (
                <div className="menu-item mb-4 ms-2 p-1 ">
                  <div id="aa" className="menu-icon">
                    <i  className={item.icon}></i>
                  </div>
                 
                  {!collapsed && (
                  <span className="font-b pe-3"
                    onClick={() => {
                      if (item.path === "/logout") {
                        localStorage.removeItem("token");
                        navigate("/login");
                      } else {
                        navigate(item.path);
                      }
                    }}
                  >
                    {item.name}
                  </span>
                )}

                </div>
              );
            })}
          </div>
        </div>
        <div className="body">
          <div  className="header">


          {collapsed ? (
            <i
              className="ri-menu-add-line"
              onClick={() => setCollapsed(!collapsed)}
            ></i>
          ) : (
            <i
              className="ri-close-line"
              onClick={() => setCollapsed(!collapsed)}
            ></i>
          )}
          </div>
         


          <div className="content p-5">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
