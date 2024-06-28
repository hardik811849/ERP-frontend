import { Box, Stack, Text } from "@chakra-ui/react";
import {
  ArrowsUpFromLine,
  Barcode,
  CircleDollarSign,
  Gift,
  HomeIcon,
  MessageCircleQuestion,
  MonitorCheck,
  ReceiptText,
  Replace,
  ShoppingBag,
  User,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
const Sidebar = () => {
  const role = Cookies.get("role");
  const path = window.location.href;
  const roleCapitalized =
    role?.split("")[0].toUpperCase() + role?.slice(1, role?.length);

  const StyledLink = ({ linkTo, children, Icon }) => {
    const activeLink = path.includes(linkTo);
    return (
      <Link to={linkTo}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginTop: "-8px",
            padding: 2,
            color: "#fff",
            ":hover": {
              cursor: "pointer",
              boxShadow: `rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px`,
            },
            backgroundColor: activeLink && "#383C50",
          }}
        >
          <Icon size={16} style={{ margin: "10px 10px 5px 20px" }} />
          <Text>{children}</Text>
        </Box>
      </Link>
    );
  };

  if (role === "employee") {
    return (
      <Stack
        bgColor="#2A2D3E"
        boxShadow={
          " rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
        }
        minH={"100vh"}
        minW={"15vw"}
        px={6}
        py={6}
      >
        <Box bg={"white"} fontSize={"lg"} px={4}>
          <Text>ERP {role}</Text>
        </Box>
        <Stack>
          <Link to={"/inquiry"}>Inquiry</Link>
          <Link to={"/orders"}>Orders</Link>
        </Stack>
      </Stack>
    );
  }

  if (role === "admin" || role === "superAdmin") {
    return (
      <Stack
        bgColor="#2A2D3E"
        boxShadow={
          " rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
        }
        minH={"100vh"}
        minW={"16vw"}
        py={6}
      >
        <Box
          sx={{
            display: "flex",
            color: "#fff",
            border: "1px solid #fff",
            borderRadius: "20px",
            mx: "auto",
            py: 2,
            px: 4,
            mb: 5,
          }}
        >
          <User style={{ marginRight: "14px" }} />
          <Text>{roleCapitalized} Dashboard</Text>
        </Box>
        <Stack>
          <StyledLink linkTo={"/"} Icon={HomeIcon}>
            Dashboard
          </StyledLink>
          <StyledLink linkTo={"/inquiry"} Icon={MessageCircleQuestion}>
            Inquiry
          </StyledLink>
          <StyledLink linkTo={"/orders"} Icon={Gift}>
            Orders
          </StyledLink>
          <StyledLink linkTo={"/store"} Icon={ShoppingBag}>
            Store
          </StyledLink>
          <StyledLink linkTo={"/purchase"} Icon={CircleDollarSign}>
            Purchase
          </StyledLink>
          <StyledLink linkTo={"/production"} Icon={MonitorCheck}>
            Production
          </StyledLink>
          <StyledLink linkTo={"/packaging"} Icon={Barcode}>
            Packaging
          </StyledLink>
          <StyledLink linkTo={"/billing"} Icon={ReceiptText}>
            Billing
          </StyledLink>
          <StyledLink linkTo={"/dispatch"} Icon={ArrowsUpFromLine}>
            Dispatch
          </StyledLink>
          <StyledLink linkTo={"/replacement"} Icon={Replace}>
            Replacement
          </StyledLink>
          <StyledLink linkTo={"/employee"} Icon={User}>
            Employee
          </StyledLink>
          <StyledLink linkTo={"/settings"} Icon={User}>
            Setting
          </StyledLink>
        </Stack>
      </Stack>
    );
  }
  if (role === "supplier") {
    return (
      <Stack
        bgColor="#2A2D3E"
        boxShadow={
          " rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
        }
        minH={"100vh"}
        minW={"15vw"}
        px={6}
        py={6}
      >
        <Box bg={"white"} fontSize={"lg"} px={4}>
          <Text>Welcome Supplier </Text>
        </Box>
        <Stack></Stack>
      </Stack>
    );
  }

  if (role === "customer") {
    return (
      <Stack
        bgColor="#2A2D3E"
        boxShadow={
          " rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
        }
        minH={"100vh"}
        minW={"15vw"}
        px={6}
        py={6}
      >
        <Box bg={"white"} fontSize={"lg"} px={4}>
          <Text>Welcome Customer </Text>
        </Box>
        <Stack></Stack>
      </Stack>
    );
  }

  if (role === "ca") {
    return (
      <Stack
        bgColor="#2A2D3E"
        boxShadow={
          " rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
        }
        minH={"100vh"}
        minW={"15vw"}
        px={6}
        py={6}
      >
        <Box bg={"white"} fontSize={"lg"} px={4}>
          <Text>Welcome CA </Text>
        </Box>
        <Stack></Stack>
      </Stack>
    );
  }
  return;
};

export default Sidebar;
