import {
  Avatar,
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
export const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("role");
    // window.location.reload();
    navigate("/login");
  };
  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      boxShadow={
        " rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px "
      }
      px={12}
      py={2}
      bgColor="#2F323A"
      color="#fff"
    >
      <Box>
        <Text as={"h2"} mb={0} fontSize={"3xl"} fontWeight={"bold"}>
          <Link to={"/"}>ERP System</Link>
        </Text>
      </Box>
      <Flex gap={4}>
        {/* <Link style={{ width: "80px", fontSize: "18px" }}>Home</Link> */}
        {/* <Link style={{ width: "80px", fontSize: "18px" }}>Contact</Link> */}
        {/* <Link style={{ width: "80px", fontSize: "18px" }}>About</Link> */}
        {/* <Link style={{ width: "80px", fontSize: "18px" }}>Profile</Link> */}
        <Menu>
          <MenuButton>
            <Avatar />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={handleLogout} color={"black"}>
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};
