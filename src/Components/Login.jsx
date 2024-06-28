import {
  Button,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  RadioGroup,
  Radio,
  Stack,
  Text,
  useToast,
  SimpleGrid,
} from "@chakra-ui/react";
import { LockKeyhole, User } from "lucide-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, redirect, useNavigate } from "react-router-dom";
import { Logging, doLogin } from "../Redux/auth/action";

export const Login = () => {
  const [show, setShow] = useState(false);
  const toast = useToast();
  const [user, setUser] = useState("");
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => setShow(!show);
  const handleRes = () => {
    toast({
      title: "Login Successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
    window.location.reload();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const userId = form.querySelector("#userId").value;
    const password = form.querySelector("#password").value;

    let empty = null;

    switch (empty) {
      case userId:
        empty = "User Id";
        break;
      case password:
        empty = "Password";
        break;
      default:
        break;
    }

    if (empty) {
      toast({
        title: empty,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    let data = null;
    if (user === "Supplier" || user === "Customer" || user === "CA") {
      data = {
        serial_no: userId,
        password,
        role: user.toLowerCase(),
        path: `auth/${user.toLowerCase()}/`,
      };
    } else if (user === "Employee") {
      data = {
        employee_id: userId,
        password,
        role: user.toLowerCase(),
        path: "auth/",
      };
    } else if (user === "Admin") {
      data = {
        userId: userId,
        password,
        role: user.toLowerCase(),
        path: "auth/",
      };
    } else if (user === "Super Admin") {
      data = {
        userId,
        password,
        role: "superAdmin",
        path: "auth/",
      };
    } else {
      data = {
        userId,
        password,
        role: user.toLowerCase(),
        path: "",
      };
    }
    if (
      user === "Admin" ||
      user === "Supplier" ||
      user === "Customer" ||
      user === "Super Admin"
    ) {
      dispatch(Logging(data, handleRes));
    } else {
      dispatch(doLogin(data, handleRes));
    }

    dispatch(Logging(data, handleRes));
  };

  return (
    <Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"}>
      <Image
        pos={"absolute"}
        zIndex={-1}
        height={"100vh"}
        w={"100vw"}
        objectFit={"cover"}
        src="https://images.unsplash.com/photo-1497864149936-d3163f0c0f4b?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        // src="https://img.freepik.com/premium-photo/abstract-background-design-images-wallpaper-ai-generated_643360-142545.jpg"
      ></Image>
      <Flex
        px={12}
        py={4}
        sx={{
          border: "1px solid white",
          borderRadius: 16,
          color: "#fff",
          backdropFilter: "auto",
          backdropBlur: "16px",
        }}
      >
        <form onSubmit={handleSubmit}>
          <>
            <Text fontSize={"2xl"} fontWeight={"bold"} textAlign={"center"}>
              Login Now
            </Text>
            <RadioGroup onChange={setUser} value={user} colorScheme="green">
              <SimpleGrid
                columns={{ base: 1, md: 2, xl: 3 }}
                sx={{ py: 6, gap: 3 }}
              >
                <Radio value="Employee">Employee</Radio>
                <Radio value="Admin">Admin</Radio>
                <Radio value="Super Admin">Super Admin</Radio>
                <Radio value="Supplier">Supplier</Radio>
                <Radio value="Customer">Customer</Radio>
                <Radio value="CA">CA</Radio>
              </SimpleGrid>
            </RadioGroup>
          </>
          <Stack gap={2} justifyContent={"center"}>
            <InputGroup>
              <InputLeftElement>
                <User strokeWidth={1.5} size={20} />
              </InputLeftElement>
              <Input
                type="text"
                name="userId"
                id="userId"
                placeholder="User Id"
              ></Input>
            </InputGroup>
            <InputGroup sx={{ mt: 4 }}>
              <InputLeftElement>
                <LockKeyhole size={20} strokeWidth={1.75} />
              </InputLeftElement>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
              ></Input>
            </InputGroup>
            <Button w={"fit-content"} type="submit" sx={{ mt: 4 }}>
              Submit
            </Button>
          </Stack>
          <Flex mt={8} sx={{ alignItems: "center", justifyContent: "center" }}>
            <Text>New user? Register &nbsp;</Text>
            <Text textAlign={"center"} textDecor={"underline"}>
              <Link to={"/register"}>here</Link>
            </Text>
          </Flex>
        </form>
      </Flex>
    </Flex>
  );
};
