import {
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
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "../../Components/Layout";
import { update_dispatch } from "../../Redux/dispatch/action";
import useHandler from "../../hooks/useHandler";

export const EditDispatch = ({ id, setOpenEditID }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  // const { id } = useParams();
  const { handleRes, handleError } = useHandler();
  const [current, setCurrent] = useState({});
  const { isLoading, error, dispatch_products } = useSelector(
    (dispatch_products) => dispatch_products.dispatchReducer
  );

  useEffect(() => {
    const filtered = dispatch_products.filter((item) => {
      return item.dispatch_id == id;
    });
    console.log(filtered);
    setCurrent(filtered[0]);
    onOpen();
  }, [id]);
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
        empty = "Invoice generation";
        break;
      case transport_copy:
        empty = "transport_copy";
        break;
      case transport_option_wise:
        empty = "transport_option_wise";
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
      dispatch_id: id,
      dispatch_discussion,
      transport_copy,
      transport_option_wise,
      client_update,
    };
    dispatch(update_dispatch(data, handleRes, handleError, id))?.then(
      (data) => {
        onClose();
        setOpenEditID("");
        navigate("/dispatch");
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
        navigate("/dispatch");
      }}
      size="md"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader sx={{ textAlign: "center" }}>Edit Dispatch</DrawerHeader>

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
                    <Text sx={{ minWidth: "50%" }}>Dispatch Discussion</Text>
                    <Input
                      type="text"
                      placeholder="Dispatch Discussion"
                      id="dispatch_discussion"
                      value={current.dispatch_discussion}
                      onChange={(e) => {
                        setCurrent({
                          ...current,
                          dispatch_discussion: e.target.value,
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
                    <Text sx={{ minWidth: "50%" }}>Transport Copy</Text>
                    <Input
                      type="text"
                      placeholder="Transport Copy"
                      id="transport_copy"
                      value={current.transport_copy}
                      onChange={(e) => {
                        setCurrent({
                          ...current,
                          transport_copy: e.target.value,
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
                    <Text sx={{ minWidth: "50%" }}>Transport options wise</Text>
                    <Input
                      type="text"
                      placeholder="Transport options wise"
                      id="transport_option_wise"
                      value={current.transport_option_wise}
                      onChange={(e) => {
                        setCurrent({
                          ...current,
                          transport_option_wise: e.target.value,
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
                      to="/dispatch"
                      w={"fit-content"}
                      variant={"outline"}
                      onClick={() => {
                        onClose();
                        setOpenEditID("");
                        navigate("/dispatch");
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
