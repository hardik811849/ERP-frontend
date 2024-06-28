import {
  Box,
  Button,
  Flex,
  Input,
  Select,
  Stack,
  Text,
  useToast,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { edit_purchase, update_purchase } from "../../Redux/purchase/action";
import useHandler from "../../hooks/useHandler";
import { Link, useNavigate, useParams } from "react-router-dom";
import { update_production } from "../../Redux/production/action";
import { update_billing } from "../../Redux/billing/action";

export const EditBilling = ({ id, setOpenEditID }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const toast = useToast();
  // const { id } = useParams();
  const { handleRes, handleError } = useHandler();
  const [current, setCurrent] = useState({});
  const { isLoading, error, billing } = useSelector(
    (billing) => billing.billingReducer
  );

  useEffect(() => {
    const filtered = billing.filter((item) => {
      return item.billing_id == id;
    });
    console.log(filtered);
    setCurrent(filtered[0]);
    onOpen();
  }, [id]);
  const handleForm = (event) => {
    event.preventDefault();
    const form = event.target;
    const invoice_generation = form.querySelector("#invoice_generation").value;
    const payment = form.querySelector("#payment").value;
    const expenses = form.querySelector("#expenses").value;
    const price_prefix = form.querySelector("#price_prefix").value;
    const discount_system = form.querySelector("#discount_system").value;
    const client_update = form.querySelector("#client_update").value;

    let empty = "";

    switch (empty) {
      case invoice_generation:
        empty = "Invoice generation";
        break;
      case payment:
        empty = "Payment";
        break;
      case expenses:
        empty = "Expenses";
        break;
      case price_prefix:
        empty = "Price Prefix";
        break;
      case discount_system:
        empty = "Discount System";
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
      billing_id: id,
      invoice_generation,
      payment,
      expenses,
      price_prefix,
      discount_system,
      client_update,
    };
    dispatch(update_billing(data, handleRes, handleError, id))?.then((data) => {
      onClose();
      setOpenEditID("");
      navigate("/billing");
    });
  };

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={() => {
        onClose();
        setOpenEditID("");
        navigate("/billing");
      }}
      size="md"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader sx={{ textAlign: "center" }}>Edit Billing</DrawerHeader>

        <Stack alignItems={"center"} justifyContent={"center"}>
          <DrawerBody>
            <Stack gap={4} mt={5}>
              <form onSubmit={handleForm}>
                <Stack gap={4}>
                  <Flex
                    sx={{
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <Text sx={{ minWidth: "50%" }}>Invoice Generation</Text>
                    <Input
                      type="text"
                      placeholder="Invoice Generation"
                      id="invoice_generation"
                      value={current.invoice_generation}
                      onChange={(e) => {
                        setCurrent({
                          ...current,
                          invoice_generation: e.target.value,
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
                    <Text sx={{ minWidth: "50%" }}>Payment</Text>
                    <Input
                      type="text"
                      placeholder="Payment"
                      id="payment"
                      value={current.payment}
                      onChange={(e) => {
                        setCurrent({
                          ...current,
                          payment: e.target.value,
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
                    <Text sx={{ minWidth: "50%" }}>Expenses</Text>
                    <Input
                      type="text"
                      placeholder="Expenses"
                      id="expenses"
                      value={current.expenses}
                      onChange={(e) => {
                        setCurrent({
                          ...current,
                          expenses: e.target.value,
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
                    <Text sx={{ minWidth: "50%" }}>Price Prefix</Text>
                    <Input
                      type="text"
                      placeholder="Price Prefix"
                      id="price_prefix"
                      value={current.price_prefix}
                      onChange={(e) => {
                        setCurrent({
                          ...current,
                          price_prefix: e.target.value,
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
                    <Text sx={{ minWidth: "50%" }}>Discount System</Text>
                    <Input
                      type="text"
                      placeholder="Discount System"
                      id="discount_system"
                      value={current.discount_system}
                      onChange={(e) => {
                        setCurrent({
                          ...current,
                          discount_system: e.target.value,
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
                  {/* <Input
                type="text"
                placeholder="client_update"
                id="client_update"
                value={current.client_update}
                onChange={(e) => {
                  setCurrent({ ...current, client_update: e.target.value });
                }}
              /> */}
                  <Flex gap={2} justifyContent={"flex-end"} mt={5}>
                    <Button
                      as={Link}
                      to="/billing"
                      w={"fit-content"}
                      variant={"outline"}
                      onClick={() => {
                        onClose();
                        setOpenEditID("");
                        navigate("/billing");
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
