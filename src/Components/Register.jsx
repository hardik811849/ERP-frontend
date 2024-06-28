import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import {
  Eye,
  EyeOff,
  Factory,
  Handshake,
  LockKeyhole,
  MailPlus,
  MapPin,
  MoveLeft,
  // MoveRight,
  NotebookPen,
  PhoneOutgoing,
} from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { doRegister } from "../Redux/auth/action";
import { useDispatch } from "react-redux";

export const Register = () => {
  const [show, setShow] = useState(false);
  const toast = useToast();
  const handleClick = () => setShow(!show);
  const [user, setUser] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const companyName = form.querySelector("#companyName").value;
    const email = form.querySelector("#email").value;
    const password = form.querySelector("#password").value;
    const confirmPassword = form.querySelector("#confirmPassword").value;
    const contact = form.querySelector("#contact").value;
    const whatsapp = form.querySelector("#whatsapp").value;
    const address = form.querySelector("#address").value;
    const gstNumber = form.querySelector("#gstNumber").value;

    let empty = "";
    switch (empty) {
      case companyName:
        empty = "Company Name";
        break;
      case email:
        empty = "Email";
        break;
      case password:
        empty = "Password";
        break;
      case confirmPassword:
        empty = "Confirm Password";
        break;
      case contact:
        empty = "Contact";
        break;
      case whatsapp:
        empty = "Whatsapp";
        break;
      case address:
        empty = "Address";
        break;
      case gstNumber:
        empty = "GST Number";
        break;
    }

    if (empty !== "") {
      toast({
        title: `${empty} cannot be empty!`,
        status: "error",
        isClosable: true,
        position: "top",
      });
    }

    if (password !== confirmPassword) {
      toast({
        title: "Passwords does not match with confirm password!",
        status: "error",
        isClosable: true,
        position: "top",
      });
    }

    const data = {
      company_name: companyName,
      email,
      password,
      mobile_number: contact,
      alter_mobile_number: contact,
      whatsapp_no: whatsapp,
      address,
      gst_no: gstNumber,
      reference_no: "none",
      address_proof: "none",
      gst_no_proof: "none",
      role: user.toLowerCase(),
    };
    dispatch(doRegister(data, handleRes));
  };
  const handleRes = (userId) => {
    toast({
      title: "Registered Successfully!",
      status: "success",
      isClosable: true,
      position: "top",
    });
    toast({
      title: `Your userId is ${userId}`,
      status: "info",
      duration: 10000,
      position: "top",
    });
    navigate("/login");
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
      ></Image>
      <Flex
        px={12}
        py={4}
        sx={{
          border: "1px solid white",
          borderRadius: 16,
          color: "#fff",
          backdropFilter: "auto",
          backdropBlur: "6px",
        }}
      >
        <form onSubmit={handleSubmit}>
          {user === "" && (
            <>
              <Text
                fontSize={"2xl"}
                fontWeight={"bold"}
                textAlign={"center"}
                my={4}
              >
                Register Now
              </Text>
              <Flex gap={4} my={8} justifyContent="center">
                <Button onClick={() => setUser("Supplier")}>Supplier</Button>
                <Button onClick={() => setUser("Customer")}>Customer</Button>
              </Flex>
            </>
          )}
          {(user === "Supplier" || user === "Customer") && (
            <Stack gap={2}>
              <Text
                textAlign={"center"}
                fontSize={"xl"}
                fontWeight={"bold"}
                my={4}
              >
                Register as {user}
              </Text>
              {/* {page === 1 && ( */}
              <Flex
                sx={{
                  flexDirection: { sm: "column", lg: "row" },
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ mr: { lg: 8 } }}>
                  <InputGroup sx={{ my: 3 }}>
                    <InputLeftElement>
                      <Factory strokeWidth={1.5} size={20} />
                    </InputLeftElement>
                    <Input
                      type="text"
                      name="companyName"
                      id="companyName"
                      placeholder="Company Name"
                    ></Input>
                  </InputGroup>
                  <InputGroup sx={{ my: 3 }}>
                    <InputLeftElement>
                      <MailPlus strokeWidth={1.5} size={20} />
                    </InputLeftElement>
                    <Input
                      type="email"
                      id="email"
                      placeholder="Email"
                      name="email"
                    ></Input>
                  </InputGroup>

                  <InputGroup sx={{ my: 3 }}>
                    <InputLeftElement>
                      <LockKeyhole size={20} strokeWidth={1.75} />
                    </InputLeftElement>
                    <Input
                      placeholder="Password"
                      type={show ? "text" : "password"}
                      name="password"
                      id="password"
                    ></Input>
                    <InputRightElement width="4.5rem">
                      <Button
                        h="1.75rem"
                        size="sm"
                        onClick={handleClick}
                        sx={{
                          background: "transparent",
                          color: "white",
                          ":hover": { background: "transparent" },
                        }}
                      >
                        {show ? (
                          <EyeOff size={20} strokeWidth={1.75} />
                        ) : (
                          <Eye size={20} strokeWidth={1.75} />
                        )}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <InputGroup sx={{ my: 3 }}>
                    <InputLeftElement>
                      <LockKeyhole size={20} strokeWidth={1.75} />
                    </InputLeftElement>
                    <Input
                      placeholder="Confirm Password"
                      type={show ? "text" : "password"}
                      name="password"
                      id="confirmPassword"
                    ></Input>
                    <InputRightElement width="4.5rem">
                      <Button
                        h="1.75rem"
                        size="sm"
                        onClick={handleClick}
                        sx={{
                          background: "transparent",
                          color: "white",
                          ":hover": { background: "transparent" },
                        }}
                      >
                        {show ? (
                          <EyeOff size={20} strokeWidth={1.75} />
                        ) : (
                          <Eye size={20} strokeWidth={1.75} />
                        )}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </Box>
                {/* )}
              {page === 2 && ( */}
                <Box>
                  <InputGroup sx={{ my: 3 }}>
                    <InputLeftElement>
                      <PhoneOutgoing size={20} strokeWidth={1.75} />
                    </InputLeftElement>
                    <Input
                      type="number"
                      name="contact"
                      placeholder="Contact Number"
                      id="contact"
                      maxLength={10}
                    ></Input>
                  </InputGroup>

                  <InputGroup sx={{ my: 3 }}>
                    <InputLeftElement>
                      <NotebookPen size={20} strokeWidth={1.75} />
                    </InputLeftElement>
                    <Input
                      name="whatsapp"
                      type="number"
                      id="whatsapp"
                      placeholder="Whatsapp Number"
                      maxLength={10}
                    ></Input>
                  </InputGroup>

                  <InputGroup sx={{ my: 3 }}>
                    <InputLeftElement>
                      <MapPin size={20} strokeWidth={1.75} />
                    </InputLeftElement>
                    <Input
                      type="text"
                      name="address"
                      id="address"
                      placeholder="Address"
                    ></Input>
                  </InputGroup>
                  <InputGroup sx={{ my: 3 }}>
                    <InputLeftElement>
                      <Handshake size={20} strokeWidth={1.75} />
                    </InputLeftElement>
                    <Input
                      type="text"
                      name="gstNumber"
                      id="gstNumber"
                      placeholder="GST Number"
                    ></Input>
                  </InputGroup>
                </Box>
              </Flex>
              {/* )} */}
              <Flex gap={4} mt={2} justifyContent={"space-between"}>
                <Button
                  variant="outlined"
                  w={"fit-content"}
                  onClick={() => {
                    if (page !== 1) {
                      setPage(page - 1);
                    } else {
                      setUser("");
                    }
                  }}
                  sx={{
                    background: "transparent",
                    color: "white",
                    ":hover": { background: "transparent" },
                  }}
                >
                  <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
                    <MoveLeft size={18} strokeWidth={4} />
                  </Flex>
                </Button>
                {/* {page != 2 && (
                <Button w={"fit-content"} onClick={() => setPage(page + 1)}>
                  <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
                    <MoveRight size={16} />
                  </Flex>
                </Button> */}
                {/* )}
                {page === 2 && ( */}
                <Button
                  variant="outlined"
                  sx={{ border: "1px solid #fff" }}
                  type="submit"
                  w={"fit-content"}
                >
                  <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
                    Submit
                  </Flex>
                </Button>
                {/* )} */}
              </Flex>
            </Stack>
          )}
          <Flex mt={8} sx={{ alignItems: "center", justifyContent: "center" }}>
            <Text>Already have an account? Login &nbsp;</Text>
            <Text textAlign={"center"} textDecor={"underline"}>
              <Link to={"/login"}>here</Link>
            </Text>
          </Flex>
        </form>
      </Flex>
    </Flex>
  );
};
