import { Button, Flex, Input, Stack, Text, useToast } from "@chakra-ui/react";
import React from "react";
import Layout from "../../Components/Layout";
import { useDispatch } from "react-redux";
import useHandler from "../../hooks/useHandler";
import { create_orders } from "../../Redux/orders/action";
import { create_production } from "../../Redux/production/action";
import { create_packaging } from "../../Redux/packaging/action";
import { Link } from "react-router-dom";

export const CreatePackaging = ({ onClose }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { handleRes, handleError } = useHandler();

  const handleForm = (event) => {
    event.preventDefault();
    const form = event.target;
    const white_labeling = form.querySelector("#white_labeling").value;
    const printing = form.querySelector("#printing").value;
    const labeling_on_box = form.querySelector("#labeling_on_box").value;
    const dispatch_label = form.querySelector("#dispatch_label").value;

    let empty = "";

    switch (empty) {
      case white_labeling:
        empty = "White labeling";
        break;
      case printing:
        empty = "Packaging Printing";
        break;
      case labeling_on_box:
        empty = "Labeling on box";
        break;
      case dispatch_label:
        empty = "Dispatch Label";
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
      white_labeling,
      printing,
      labeling_on_box,
      dispatch_label,
    };
    // console.log(data);
    dispatch(create_packaging(data, handleRes, handleError)).then(() => {
      onClose();
    });
  };
  return (
    // <Layout>
    <Stack alignItems={"center"} justifyContent={"center"}>
      <Text as={"h2"} fontSize={"xl"} fontWeight={"bold"}>
        Packaging Create
      </Text>
      <Stack gap={4} mt={12}>
        <form onSubmit={handleForm}>
          <Stack gap={4}>
            <Input
              type="text"
              placeholder="White Labeling"
              id="white_labeling"
            />
            <Input type="text" placeholder="Printing" id="printing" />
            <Input
              type="text"
              placeholder="Labeling on box"
              id="labeling_on_box"
            />
            <Input
              type="text"
              placeholder="Dispatch Label"
              id="dispatch_label"
            />

            <Flex gap={2}>
              <Button
                as={Link}
                to="/packaging"
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
