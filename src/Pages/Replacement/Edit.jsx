import {
  Button,
  DrawerBody,
  Flex,
  Input,
  Select,
  Stack,
  Text,
  useToast,
  Drawer,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "../../Components/Layout";
import { update_dispatch } from "../../Redux/dispatch/action";
import useHandler from "../../hooks/useHandler";
import { update_replacement } from "../../Redux/replacement/action";

export const EditReplacement = ({ id, setOpenEditID }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  // const { id } = useParams();
  const { handleRes, handleError } = useHandler();
  const [current, setCurrent] = useState({});
  const { isLoading, error, replacement } = useSelector(
    (replacement) => replacement.replacementReducer
  );

  useEffect(() => {
    const filtered = replacement.filter((item) => {
      return item.replacement_id == id;
    });
    // console.log(filtered);
    setCurrent(filtered[0]);
    onOpen();
  }, [id]);
  const handleForm = (event) => {
    event.preventDefault();
    const form = event.target;
    const check_warranty = form.querySelector("#check_warranty").value;
    const product_wise_replace = form.querySelector(
      "#product_wise_replace"
    ).value;
    const fault_analysis = form.querySelector("#fault_analysis").value;
    const client_wise_replacement = form.querySelector(
      "#client_wise_replacement"
    ).value;
    const time_wise_replacement = form.querySelector(
      "#time_wise_replacement"
    ).value;
    const client_receipt = form.querySelector("#client_receipt").value;
    const amount_credit_to_client = form.querySelector(
      "#amount_credit_to_client"
    ).value;
    const check_product = form.querySelector("#check_product").value;
    const client_update = form.querySelector("#client_update").value;

    let empty = "";

    switch (empty) {
      case check_warranty:
        empty = "Check-Warranty";
        break;
      case product_wise_replace:
        empty = "Product Wise Replace";
        break;
      case fault_analysis:
        empty = "Fault Analysis";
        break;
      case client_wise_replacement:
        empty = "Client Wise Replacement";
        break;
      case time_wise_replacement:
        empty = "Time Wise Replacement";
        break;
      case client_receipt:
        empty = "Client Receipt";
        break;
      case amount_credit_to_client:
        empty = "Amount Credit To Client";
        break;
      case check_product:
        empty = "Check Product";
        break;
      case client_update:
        empty = "Client Update";
        break;
      default:
        break;
    }

    if (empty) {
      toast({
        title: empty + " is required",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }

    const data = {
      replacement_id: id,
      check_warranty,
      product_wise_replace,
      fault_analysis,
      client_wise_replacement,
      time_wise_replacement,
      client_receipt,
      amount_credit_to_client,
      check_product,
      client_update,
    };
    dispatch(update_replacement(data, handleRes, handleError, id))?.then(
      (data) => {
        onClose();
        setOpenEditID("");
        navigate("/replacement");
      }
    );
  };

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={() => {
        onClose();
        setOpenEditID("");
        navigate("/replacement");
      }}
      size="md"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader sx={{ textAlign: "center" }}>
          Edit Replacement
        </DrawerHeader>

        <Stack alignItems={"center"} justifyContent={"center"}>
          <DrawerBody>
            <Stack gap={4} mt={12}>
              <form onSubmit={handleForm}>
                <Stack gap={4}>
                  <Flex
                    sx={{
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <Text sx={{ minWidth: "50%" }}>Check Warranty</Text>
                    <Input
                      type="text"
                      placeholder="Check Warranty"
                      id="check_warranty"
                      value={current.check_warranty}
                      onChange={(e) => {
                        setCurrent({
                          ...current,
                          check_warranty: e.target.value,
                        });
                      }}
                    />
                  </Flex>
                  <Flex
                    sx={{
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <Text sx={{ minWidth: "50%" }}>Product Wise Replace</Text>
                    <Input
                      type="text"
                      placeholder="Product Wise Replace"
                      id="product_wise_replace"
                      value={current.product_wise_replace}
                      onChange={(e) => {
                        setCurrent({
                          ...current,
                          product_wise_replace: e.target.value,
                        });
                      }}
                    />
                  </Flex>
                  <Flex
                    sx={{
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <Text sx={{ minWidth: "50%" }}>Fault Analysis</Text>
                    <Input
                      type="text"
                      placeholder="Fault Analysis"
                      id="fault_analysis"
                      value={current.fault_analysis}
                      onChange={(e) => {
                        setCurrent({
                          ...current,
                          fault_analysis: e.target.value,
                        });
                      }}
                    />
                  </Flex>
                  <Flex
                    sx={{
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <Text sx={{ minWidth: "50%" }}>
                      Client Wise Replacement
                    </Text>
                    <Input
                      type="text"
                      placeholder="Client Wise Replacement"
                      id="client_wise_replacement"
                      value={current.client_wise_replacement}
                      onChange={(e) => {
                        setCurrent({
                          ...current,
                          client_wise_replacement: e.target.value,
                        });
                      }}
                    />
                  </Flex>
                  <Flex
                    sx={{
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <Text sx={{ minWidth: "50%" }}>Time Wise Replacement</Text>
                    <Input
                      type="text"
                      placeholder="Time Wise Replacement"
                      id="time_wise_replacement"
                      value={current.time_wise_replacement}
                      onChange={(e) => {
                        setCurrent({
                          ...current,
                          time_wise_replacement: e.target.value,
                        });
                      }}
                    />
                  </Flex>
                  <Flex
                    sx={{
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <Text sx={{ minWidth: "50%" }}>Client Receipt</Text>
                    <Input
                      type="text"
                      placeholder="Client Receipt"
                      id="client_receipt"
                      value={current.client_receipt}
                      onChange={(e) => {
                        setCurrent({
                          ...current,
                          client_receipt: e.target.value,
                        });
                      }}
                    />
                  </Flex>
                  <Flex
                    sx={{
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <Text sx={{ minWidth: "50%" }}>
                      Amount Credit to Client
                    </Text>
                    <Input
                      type="text"
                      placeholder="Amount Credit to Client"
                      id="amount_credit_to_client"
                      value={current.amount_credit_to_client}
                      onChange={(e) => {
                        setCurrent({
                          ...current,
                          amount_credit_to_client: e.target.value,
                        });
                      }}
                    />
                  </Flex>
                  <Flex
                    sx={{
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <Text sx={{ minWidth: "50%" }}>Check Product</Text>
                    <Input
                      type="text"
                      placeholder="Check Product"
                      id="check_product"
                      value={current.check_product}
                      onChange={(e) => {
                        setCurrent({
                          ...current,
                          check_product: e.target.value,
                        });
                      }}
                    />
                  </Flex>
                  <Flex
                    sx={{
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <Text sx={{ minWidth: "50%" }}>Client Update</Text>
                    <Select
                      placeholder="Client Update"
                      id="client_update"
                      value={current.client_update}
                      onChange={(e) => {
                        setCurrent({
                          ...current,
                          client_update: e.target.value,
                        });
                      }}
                    >
                      <option value="false">False</option>
                      <option value="true">True</option>
                    </Select>
                  </Flex>
                  <Flex gap={2} justifyContent={"flex-end"} mt={5}>
                    <Button
                      as={Link}
                      to="/replacement"
                      w={"fit-content"}
                      variant={"outline"}
                      onClick={() => {
                        onClose();
                        setOpenEditID("");
                        navigate("/replacement");
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      w={"fit-content"}
                      backgroundColor="#319AF6"
                      color="#fff"
                    >
                      Submit
                    </Button>
                  </Flex>
                </Stack>
              </form>
            </Stack>
          </DrawerBody>
        </Stack>
      </DrawerContent>
    </Drawer>
  );
};
