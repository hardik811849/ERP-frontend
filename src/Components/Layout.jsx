import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { Navbar } from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <Box>
      <Navbar></Navbar>
      <Flex>
        <Sidebar />
        <Box mx={4} my={4} w={"82vw"}>
          {children}
        </Box>
      </Flex>
    </Box>
  );
};

export default Layout;
