import { Button, Flex, Input, Stack, Text, useToast } from "@chakra-ui/react";
import React from "react";
import Layout from "../../Components/Layout";
import { useDispatch } from "react-redux";
import useHandler from "../../hooks/useHandler";
import { create_orders, get_orders } from "../../Redux/orders/action";
import { Link } from "react-router-dom";

export const CreateOrders = ({ onClose }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { handleRes, handleError } = useHandler();

  const handleForm = (event) => {
    event.preventDefault();
    const form = event.target;
    const ordered_products = form.querySelector("#ordered_products").value;
    const quality = form.querySelector("#quality").value;
    const total_amount = form.querySelector("#total_amount").value;
    const payment_mode = form.querySelector("#payment_mode").value;
    const delivery_date = form.querySelector("#delivery_date").value;
    const transport_method = form.querySelector("#transport_method").value;
    const white_labeling = form.querySelector("#white_labeling").value;
    const type_of_packaging = form.querySelector("#type_of_packaging").value;
    const urgent_requirement = form.querySelector("#urgent_requirement").value;
    const customer_id = form.querySelector("#customer_id").value;

    let empty = "";

    switch (empty) {
      case ordered_products:
        empty = "Stored Products";
        break;
      case quality:
        empty = "Quality";
        break;
      case total_amount:
        empty = "Total Amount";
        break;
      case payment_mode:
        empty = "Payment Mode";
        break;
      case delivery_date:
        empty = "Delivery Date";
        break;
      case transport_method:
        empty = "Transport Method";
        break;
      case white_labeling:
        empty = "White Lableing";
        break;
      case type_of_packaging:
        empty = "Type of Packaging";
      case urgent_requirement:
        empty = "Urgent Requirement";
      case customer_id:
        empty = "Customer Id";
        break;
      default:
        break;
    }

    if (empty != "") {
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
      ordered_products,
      quality,
      total_amount,
      payment_mode,
      delivery_date,
      transport_method,
      white_labeling,
      type_of_packaging,
      urgent_requirement,
      customer_id,
    };
    dispatch(create_orders(data, handleRes, handleError)).then(() => {
      onClose();
    });
  };
  return (
    // <Layout>
    <Stack alignItems={"center"} justifyContent={"center"}>
      <Text as={"h2"} fontSize={"xl"} fontWeight={"bold"}>
        Order Create
      </Text>
      <Stack gap={4} mt={12}>
        <form onSubmit={handleForm}>
          <Stack gap={4}>
            <Input
              type="text"
              placeholder="Ordered Product"
              id="ordered_products"
            />
            <Input type="text" placeholder="Quality" id="quality" />
            <Input type="text" placeholder="Total Amount" id="total_amount" />
            <Input type="text" placeholder="Payment Mode" id="payment_mode" />
            <Input type="text" placeholder="Delivery Date" id="delivery_date" />
            <Input
              type="text"
              placeholder="Transport Method"
              id="transport_method"
            />
            <Input
              type="text"
              placeholder="White Labeling"
              id="white_labeling"
            />
            <Input
              type="text"
              placeholder="Type of Packaging"
              id="type_of_packaging"
            />
            <Input
              type="text"
              placeholder="Urgent Requirement"
              id="urgent_requirement"
            />
            <Input
              type="text"
              placeholder="Company/Customer Id"
              id="customer_id"
            />
            <Flex gap={2}>
              <Button
                as={Link}
                to="/orders"
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
