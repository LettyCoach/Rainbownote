import { useEffect } from "react";
import {
  Home,
  Trash,
  Package,
  PenSquare,
  AlignJustify,
  X,
  Heart,
  LogOut,
  Moon,
  SunMedium
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { sidebarLinks } from "@/constants/BottomTabBarData";
import { useUserContext } from "@/context";
import { useSignOut } from "@/lib/react-query/QueriesAndMutations";

export const SideBar = ({ isOpenSidebar, sidebarRef, toggleSideBar }) => {
  const navigate = useNavigate();

  const { user, setIsLoggedIn, checkAuthUser } = useUserContext();
  const { mutateAsync: Logout } = useSignOut();

  const handleLogout = async () => {
    const res = await Logout();
    if (res?.status === "ok") {
      setIsLoggedIn(false);
      navigate("/sign-in");
    }
  };

  return (
    <nav
      className={`left_sidebar_container ${
        isOpenSidebar ? "left-0" : "left-[-100%]"
      }`}
    >
      <div ref={sidebarRef} className="left_sidebar">
        <span
          onClick={toggleSideBar}
          className="absolute right-4 bg-light-2 p-1 rounded dark:bg-dark-3"
        >
          <X />
        </span>
        
        
        <div>
          <div className="flex gap-2 items-center">
            <img className="w-7 h-7" src="/apple-touch-icon.png" alt="Logo" />
            <span>Rainbownote</span>
          </div>
          {/* Display User Info */}
          <div className="my-4">
            <img
              className="w-14 h-14 rounded-full"
              src={user?.imageUrl}
              alt={user?.name}
            />
            <h2 className="h2-bold">{user?.name}</h2>
            <p className="info">{user?.email}</p>
          </div>
          
          {/* Display Links */}
          <ul className="left_sidebar_menu">
            {sidebarLinks?.map(item => (
              <li key={item.id} className="">
                <Link
                  onClick={toggleSideBar}
                  target={
                    (item.name === "🚀 Source code" ||
                      item.name === "🐞 Report issue") &&
                    "__blank"
                  }
                  to={item.link}
                  className="block py-2 rounded hover:bg-light-2 dark:hover:bg-dark-3"
                >
                  {item?.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <button
              onClick={handleLogout}
              className="bg-primary-600 text-white py-2 px-4 rounded flex gap-2 items-center dark:bg-dark-3"
              type="button"
            >
              <span>
                <LogOut />
              </span>
              <span>Logout</span>
            </button>
            <button type="button">
              <Moon />
            </button>
          </div>
          <p className="text-sm text-gray-500">
            Made with &hearts; By Fazle Rabbi
          </p>
        </div>
      </div>
    </nav>
  );
};
