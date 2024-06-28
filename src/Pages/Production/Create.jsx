import { Button, Flex, Input, Stack, Text, useToast } from "@chakra-ui/react";
import React from "react";
import Layout from "../../Components/Layout";
import { useDispatch } from "react-redux";
import useHandler from "../../hooks/useHandler";
import { create_production } from "../../Redux/production/action";
import { Link } from "react-router-dom";

export const CreateProduction = ({ onClose }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const { handleRes, handleError } = useHandler();

  const handleForm = (event) => {
    event.preventDefault();
    const form = event.target;
    const raw_product = form.querySelector("#raw_product").value;
    const production_process = form.querySelector("#production_process").value;
    const quality_check = form.querySelector("#quality_check").value;
    const final_check = form.querySelector("#final_check").value;
    const client_access_to_production = form.querySelector(
      "#client_access_to_production"
    ).value;
    const scraped = form.querySelector("#scraped").value;

    let empty = "";

    switch (empty) {
      case raw_product:
        empty = "Raw Products";
        break;
      case production_process:
        empty = "Allocate Stock For Order";
        break;
      case quality_check:
        empty = "Quality Check";
        break;
      case final_check:
        empty = "Final Check";
        break;
      case client_access_to_production:
        empty = "Client Access to Production";
        break;
      case scraped:
        empty = "Scraped";
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
      raw_product,
      production_process,
      quality_check,
      final_check,
      client_access_to_production,
      scraped,
    };
    dispatch(create_production(data, handleRes, handleError)).then(() => {
      onClose();
    });
  };
  return (
    // <Layout>
    <Stack alignItems={"center"} justifyContent={"center"}>
      <Text as={"h2"} fontSize={"xl"} fontWeight={"bold"}>
        Production Create
      </Text>
      <Stack gap={4} mt={12}>
        <form onSubmit={handleForm}>
          <Stack gap={4}>
            <Input type="text" placeholder="Raw Product" id="raw_product" />
            <Input
              type="text"
              placeholder="Production Process"
              id="production_process"
            />
            <Input type="text" placeholder="Quality Check" id="quality_check" />
            <Input type="text" placeholder="Final Check" id="final_check" />
            <Input
              type="text"
              placeholder="Client Access to Production"
              id="client_access_to_production"
            />
            <Input type="text" placeholder="Scraped" id="scraped" />
            <Flex gap={2}>
              <Button
                as={Link}
                to="/production"
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
