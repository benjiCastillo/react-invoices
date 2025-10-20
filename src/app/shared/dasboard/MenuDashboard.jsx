import React, { useRef } from "react";
import { Menubar } from "primereact/menubar";
import { Menu } from "primereact/menu";
import { Avatar } from "primereact/avatar";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/UseAuthStore";
import { AuthServices } from "../../../features/auth/services/auth.services";

export default function MenuDashboard() {
  const navigate = useNavigate();
  const menuUser = useRef(null);
  const { user, logout: logoutStore } = useAuthStore();

  const items = [
    {
      label: "Pos",
      icon: "pi pi-calculator",
      command: () => {
        navigate("/pos");
      },
    },
    {
      label: "Comandas",
      icon: "pi pi-ticket",
      command: () => {
        navigate("/orders");
      },
    },
  ];

  const logout = async () => {
    try {
      const res = await AuthServices.logout({
        log_access_id: user.log_access_id,
      });
      console.log(res);
      logoutStore();
    } catch (error) {
      console.log(error);
    }
  };

  const menuItems = [
    {
      label: user?.username,
      items: [
        {
          label: "Cerrar sesión",
          icon: "pi pi-sign-out",
          command: () => {
            logout();
          },
        },
      ],
    },
  ];

  const start = (
    <img
      alt="logo"
      src="https://primefaces.org/cdn/primereact/images/logo.png"
      height="40"
      width="40"
      className="mr-2"
    ></img>
  );
  const end = (
    <div className="flex align-items-center gap-2">
      <Avatar
        icon="pi pi-user"
        size="small"
        style={{ backgroundColor: "#2196F3", color: "#ffffff" }}
        shape="circle"
        className="cursor-pointer"
        onClick={(e) => menuUser.current.toggle(e)}
      />
      <Menu
        model={menuItems}
        popup
        ref={menuUser}
        id="popup_menu_right"
        popupAlignment="right"
      />
    </div>
  );

  return (
    <div className="card">
      <Menubar model={items} start={start} end={end} />
    </div>
  );
}
