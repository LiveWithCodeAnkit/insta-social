import React from "react";
import Sidebar from "@/components/common/sidebar/Sidebar";
import navConfigBrand from "@/components/common/sidebar/NavConfig";
import Navbar from "@/components/brandDashboard/Navbar";

const Layout = (props) => {
  return (
    <Sidebar navConfig={navConfigBrand} NavbarComponent={Navbar}>
      {props.children}
    </Sidebar>
  );
};

export default Layout;
