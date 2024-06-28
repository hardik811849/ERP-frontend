import {
  Box,
  Button,
  Flex,
  Input,
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
import { edit_store, update_store } from "../../Redux/store/action";
import useHandler from "../../hooks/useHandler";
import { Link, useNavigate, useParams } from "react-router-dom";

export const EditStore = ({ id, setOpenEditID }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  // const { id } = useParams();
  const { handleRes, handleError } = useHandler();
  const [current, setCurrent] = useState({});
  const { isLoading, error, store } = useSelector(
    (store) => store.storeReducer
  );
  useEffect(() => {
    const filtered = store.filter((item) => {
      return item.store_id == id;
    });
    setCurrent(filtered[0]);
    onOpen();
  }, [id]);

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
        empty = "Address";
        break;

      case product_placed_guide:
        empty = "Contact Number";
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
      store_id: id,
      ready_products: ready_products,
      allocate_stock_for_order: +allocate_stock_for_order,
      product_placed_guide,
      minimum_stock_level,
      product_id,
    };
    dispatch(update_store(data, handleRes, handleError))?.then((data) => {
      onClose();
      setOpenEditID("");
      navigate("/store");
    });
  };
  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={() => {
        onClose();
        setOpenEditID("");
        navigate("/store");
      }}
      size="md"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader sx={{ textAlign: "center" }}>Edit Store</DrawerHeader>

        <Stack alignItems={"center"} justifyContent={"center"}>
          <DrawerBody>
            <Stack gap={4} mt={12}>
              <form onSubmit={handleForm}>
                <Stack gap={4}>
                  <Flex
                    sx={{
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <Text sx={{ minWidth: "50%" }}>Ready Products</Text>
                    <Input
                      type="text"
                      placeholder="Ready Products"
                      id="ready_products"
                      value={current?.ready_products}
                      onChange={(e) =>
                        setCurrent({
                          ...current,
                          ready_products: e.target.value,
                        })
                      }
                    />
                  </Flex>
                  <Flex
                    sx={{
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <Text sx={{ minWidth: "50%" }}>
                      Allocated Stock For Order
                    </Text>
                    <Input
                      type="text"
                      placeholder="Allocated Stock For Order"
                      id="allocate_stock_for_order"
                      value={current?.allocate_stock_for_order}
                      onChange={(e) =>
                        setCurrent({
                          ...current,
                          allocate_stock_for_order: e.target.value,
                        })
                      }
                    />
                  </Flex>
                  <Flex
                    sx={{
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <Text sx={{ minWidth: "50%" }}>Product Placed Guide</Text>
                    <Input
                      type="text"
                      placeholder="Product Placed Guide"
                      id="product_placed_guide"
                      value={current?.product_placed_guide}
                      onChange={(e) =>
                        setCurrent({
                          ...current,
                          product_placed_guide: e.target.value,
                        })
                      }
                    />
                  </Flex>
                  <Flex
                    sx={{
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <Text sx={{ minWidth: "50%" }}>Min Stock Level</Text>
                    <Input
                      type="text"
                      placeholder="Min Stock Level"
                      id="minimum_stock_level"
                      value={current?.minimum_stock_level}
                      onChange={(e) =>
                        setCurrent({
                          ...current,
                          minimum_stock_level: e.target.value,
                        })
                      }
                    />
                  </Flex>
                  <Flex
                    sx={{
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <Text sx={{ minWidth: "50%" }}>Product Id</Text>
                    <Input
                      type="text"
                      placeholder="Product Id"
                      id="product_id"
                      value={current?.product_id}
                      onChange={(e) =>
                        setCurrent({
                          ...current,
                          product_id: e.target.value,
                        })
                      }
                    />
                  </Flex>
                  <Flex gap={2} justifyContent={"flex-end"} mt={5}>
                    <Button
                      as={Link}
                      to="/store"
                      w={"fit-content"}
                      variant={"outline"}
                      onClick={() => {
                        onClose();
                        setOpenEditID("");
                        navigate("/store");
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
