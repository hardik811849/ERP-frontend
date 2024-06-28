import {
  Box,
  Button,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Input,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { edit_purchase, update_purchase } from "../../Redux/purchase/action";
import useHandler from "../../hooks/useHandler";
import { Link, useNavigate, useParams } from "react-router-dom";
import { update_production } from "../../Redux/production/action";

export const EditProduction = ({ id, setOpenEditID }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  // const { id } = useParams();
  const { handleRes, handleError } = useHandler();
  const [current, setCurrent] = useState({});
  const { isLoading, error, production } = useSelector(
    (production) => production.productionReducer
  );

  useEffect(() => {
    const filtered = production.filter((item) => {
      return item.production_id == id;
    });
    // console.log(filtered);
    setCurrent(filtered[0]);
    onOpen();
  }, [id]);
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
        empty = "Client access to Production";
        break;
      case scraped:
        empty = "Scrapped";
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
      production_id: id,
      raw_product,
      production_process,
      quality_check,
      final_check,
      client_access_to_production,
      scraped,
    };
    dispatch(update_production(data, handleRes, handleError, id))?.then(
      (data) => {
        onClose();
        setOpenEditID("");
        navigate("/production");
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
        navigate("/production");
      }}
      size="md"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader sx={{ textAlign: "center" }}>
          Edit Production
        </DrawerHeader>

        <Stack alignItems={"center"} justifyContent={"center"}>
          <Stack gap={4} mt={12}>
            <form onSubmit={handleForm}>
              <Stack gap={4}>
                <Flex
                  sx={{
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <Text sx={{ minWidth: "50%" }}>Raw Product</Text>
                  <Input
                    type="text"
                    placeholder="Raw Product"
                    id="raw_product"
                    value={current.raw_product}
                    onChange={(e) => {
                      setCurrent({ ...current, raw_product: e.target.value });
                    }}
                  />
                </Flex>
                <Flex
                  sx={{
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <Text sx={{ minWidth: "50%" }}>Production Process</Text>
                  <Input
                    type="text"
                    placeholder="Production Process"
                    id="production_process"
                    value={current.production_process}
                    onChange={(e) => {
                      setCurrent({
                        ...current,
                        production_process: e.target.value,
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
                  <Text sx={{ minWidth: "50%" }}>Quality Check</Text>
                  <Input
                    type="text"
                    placeholder="Quality Check"
                    id="quality_check"
                    value={current.quality_check}
                    onChange={(e) => {
                      setCurrent({
                        ...current,
                        quality_check: e.target.value,
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
                  <Text sx={{ minWidth: "50%" }}>Final Check</Text>
                  <Input
                    type="text"
                    placeholder="Final Check"
                    id="final_check"
                    value={current.final_check}
                    onChange={(e) => {
                      setCurrent({ ...current, final_check: e.target.value });
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
                    Client access to Production
                  </Text>
                  <Input
                    type="text"
                    placeholder="Client access to Production"
                    id="client_access_to_production"
                    value={current.client_access_to_production}
                    onChange={(e) => {
                      setCurrent({
                        ...current,
                        client_access_to_production: e.target.value,
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
                  <Text sx={{ minWidth: "50%" }}>Scraped</Text>
                  <Input
                    type="text"
                    placeholder="Scraped"
                    id="scraped"
                    value={current.scraped}
                    onChange={(e) => {
                      setCurrent({ ...current, scraped: e.target.value });
                    }}
                  />
                </Flex>
                <Flex gap={2} justifyContent={"flex-end"} mt={5}>
                  <Button
                    as={Link}
                    to="/production"
                    w={"fit-content"}
                    variant={"outline"}
                    onClick={() => {
                      onClose();
                      setOpenEditID("");
                      navigate("/production");
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
        </Stack>
      </DrawerContent>
    </Drawer>
  );
};
