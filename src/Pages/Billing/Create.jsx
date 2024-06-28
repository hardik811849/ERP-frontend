import {
  Button,
  Flex,
  Input,
  Select,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useDispatch } from "react-redux";
import Layout from "../../Components/Layout";
import { create_billing } from "../../Redux/billing/action";
import useHandler from "../../hooks/useHandler";
import { Link } from "react-router-dom";

export const CreateBilling = ({ onClose }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { handleRes, handleError } = useHandler();

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

    if (empty !== "") {
      toast({
        title: empty + " cannot be empty!",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });

      return;
    }
    const data = {
      invoice_generation,
      payment,
      expenses,
      price_prefix,
      discount_system,
      client_update,
    };
    // console.log(data);
    dispatch(create_billing(data, handleRes, handleError)).then(() => {
      onClose();
    });
  };
  return (
    // <Layout>
    <Stack alignItems={"center"} justifyContent={"center"}>
      <Text as={"h2"} fontSize={"xl"} fontWeight={"bold"}>
        Billing Create
      </Text>
      <Stack gap={4} mt={12}>
        <form onSubmit={handleForm}>
          <Stack gap={4}>
            <Input
              type="text"
              placeholder="Invoice Generation"
              id="invoice_generation"
            />
            <Input type="text" placeholder="Payment" id="payment" />
            <Input type="text" placeholder="Expenses" id="expenses" />
            <Input type="text" placeholder="Price Prefix" id="price_prefix" />
            <Input
              type="text"
              placeholder="Discount System"
              id="discount_system"
            />
            <Select placeholder="Client Update" id="client_update">
              <option value="false">False</option>
              <option value="true">True</option>
            </Select>
            {/* <Input
                type="text"
                placeholder="Client Update"
                id="client_update"
              /> */}
            <Flex gap={2}>
              <Button
                as={Link}
                to="/billing"
                w={"fit-content"}
                variant={"outline"}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                bg={"#319AF6"}
                color={"white"}
                w={"fit-content"}
              >
                Submit
              </Button>
            </Flex>
          </Stack>
        </form>
      </Stack>
    </Stack>
    // </Layout>
  );
};
