import { Button, Flex, Input, Stack, Text, useToast } from "@chakra-ui/react";
import React from "react";
import Layout from "../../Components/Layout";
import { useDispatch } from "react-redux";
import useHandler from "../../hooks/useHandler";
import { create_orders, get_orders } from "../../Redux/orders/action";
import { create_store, get_store } from "../../Redux/store/action";
import { Link } from "react-router-dom";

export const CreateStore = ({ onClose }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { handleRes, handleError } = useHandler();

  const handleForm = (event) => {
    event.preventDefault();
    const form = event.target;
    const ready_products = form.querySelector("#ready_products").value;
    const allocate_stock_for_order = form.querySelector(
      "#allocate_stock_for_order"
    ).value;
    const product_placed_guide = form.querySelector(
      "#product_placed_guide"
    ).value;
    const minimum_stock_level = form.querySelector(
      "#minimum_stock_level"
    ).value;
    const product_id = form.querySelector("#product_id").value;

    let empty = "";

    switch (empty) {
      case ready_products:
        empty = "Ready Products";
        break;
      case allocate_stock_for_order:
        empty = "Allocate Stock For Order";
        break;
      case product_placed_guide:
        empty = "Product Placed Guide";
        break;
      case minimum_stock_level:
        empty = "Min Stock Level";
        break;
      case product_id:
        empty = "Product Id";
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
      ready_products,
      allocate_stock_for_order,
      product_placed_guide,
      minimum_stock_level,
      product_id,
    };
    dispatch(create_store(data, handleRes, handleError)).then(() => {
      onClose();
    });
  };
  return (
    // <Layout>
    <Stack alignItems={"center"} justifyContent={"center"}>
      <Text as={"h2"} fontSize={"xl"} fontWeight={"bold"}>
        Store Create
      </Text>
      <Stack gap={4} mt={12}>
        <form onSubmit={handleForm}>
          <Stack gap={4}>
            <Input
              type="text"
              placeholder="Ready Products"
              id="ready_products"
            />
            <Input
              type="text"
              placeholder="Allocate Stock For Order"
              id="allocate_stock_for_order"
            />
            <Input
              type="text"
              placeholder="Product Placed Guide"
              id="product_placed_guide"
            />
            <Input
              type="text"
              placeholder="Min Stock Level"
              id="minimum_stock_level"
            />
            <Input type="text" placeholder="Product Id" id="product_id" />
            <Flex gap={2}>
              <Button
                as={Link}
                to="/store"
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
