import React from "react";
import { navConfigCreator } from "@/components/creatorDashboard/constants";
import Navbar from "@/components/creatorDashboard/navbar/Navbar";
import Sidebar from "@/components/common/sidebar/Sidebar";

const layout = (props) => {
  return (
    <Sidebar navConfig={navConfigCreator} NavbarComponent={Navbar}>
      {props.children}
    </Sidebar>
  );
};

export default layout;
