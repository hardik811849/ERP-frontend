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
import { create_dispatch } from "../../Redux/dispatch/action";
import { Link } from "react-router-dom";

export const CreateDispatch = ({ onClose }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { handleRes, handleError } = useHandler();

  const handleForm = (event) => {
    event.preventDefault();
    const form = event.target;
    const dispatch_discussion = form.querySelector(
      "#dispatch_discussion"
    ).value;
    const transport_copy = form.querySelector("#transport_copy").value;
    const transport_option_wise = form.querySelector(
      "#transport_option_wise"
    ).value;
    const client_update = form.querySelector("#client_update").value;

    let empty = "";

    switch (empty) {
      case dispatch_discussion:
        empty = "Dispatch Discussion";
        break;
      case transport_copy:
        empty = "Transport Copy";
        break;
      case transport_option_wise:
        empty = "Transport Option Wise";
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
      dispatch_discussion,
      transport_copy,
      transport_option_wise,
      client_update,
    };
    // console.log(data);
    dispatch(create_dispatch(data, handleRes, handleError)).then(() => {
      onClose();
    });
  };
  return (
    // <Layout>
    <Stack alignItems={"center"} justifyContent={"center"}>
      <Text as={"h2"} fontSize={"xl"} fontWeight={"bold"}>
        Dispatch Create
      </Text>
      <Stack gap={4} mt={12}>
        <form onSubmit={handleForm}>
          <Stack gap={4}>
            <Input
              type="text"
              placeholder="Dispatch Discussions"
              id="dispatch_discussion"
            />
            <Input
              type="text"
              placeholder="Transport Copy"
              id="transport_copy"
            />
            <Input
              type="text"
              placeholder="Transport Option Wise"
              id="transport_option_wise"
            />
            <Select placeholder="Client Update" id="client_update">
              <option value="false">False</option>
              <option value="true">True</option>
            </Select>
            <Flex gap={2}>
              <Button
                as={Link}
                to="/dispatch"
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
