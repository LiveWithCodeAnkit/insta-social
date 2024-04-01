import React from "react";
import Sidebar from "@/components/common/sidebar/Sidebar";
import Navbar from "@/components/brief_builder/navbar/Navbar";
import { navConfigBriefBuilder } from "@/components/brief_builder/constants";

const Layout = (props) => {
  return (
    <Sidebar navConfig={navConfigBriefBuilder} NavbarComponent={Navbar}>
      {props.children}
    </Sidebar>
  );
};

export default Layout;
