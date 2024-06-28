import { Button, Input, Select, Stack, Text, useToast } from "@chakra-ui/react";
import React from "react";
import { useDispatch } from "react-redux";
import Layout from "../../Components/Layout";
import { create_replacement } from "../../Redux/replacement/action";
import useHandler from "../../hooks/useHandler";

export const CreateReplacement = ({ onClose }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { handleRes, handleError } = useHandler();

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
    dispatch(create_replacement(data, handleRes, handleError)).then(() => {
      onClose();
    });
  };
  return (
    // <Layout>
    <Stack alignItems={"center"} justifyContent={"center"}>
      <Text as={"h2"} fontSize={"xl"} fontWeight={"bold"}>
        Replacement Create
      </Text>
      <Stack gap={4} mt={12}>
        <form onSubmit={handleForm}>
          <Stack gap={4}>
            <Input
              type="text"
              placeholder="Check Warranty"
              id="check_warranty"
            />
            <Input
              type="text"
              placeholder="Product wise Replace"
              id="product_wise_replace"
            />
            <Input
              type="text"
              placeholder="Fault Analysis"
              id="fault_analysis"
            />
            <Input
              type="text"
              placeholder="Client Wise Replacement"
              id="client_wise_replacement"
            />
            <Input
              type="text"
              placeholder="Time Wise Replacement"
              id="time_wise_replacement"
            />
            <Input
              type="text"
              placeholder="Client Receipt"
              id="client_receipt"
            />
            <Input
              type="text"
              placeholder="Amount Credit to client"
              id="amount_credit_to_client"
            />
            <Input type="text" placeholder="check Product" id="check_product" />
            <Select placeholder="Client Update" id="client_update">
              <option value="false">False</option>
              <option value="true">True</option>
            </Select>
            <Button
              type="submit"
              bg={"#319AF6"}
              color={"white"}
              w={"fit-content"}
            >
              Submit
            </Button>
          </Stack>
        </form>
      </Stack>
    </Stack>
    // </Layout>
  );
};
