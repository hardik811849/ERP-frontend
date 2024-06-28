import {
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
import { useDispatch, useSelector } from "react-redux";
import { edit_orders } from "../../Redux/orders/action";
import useHandler from "../../hooks/useHandler";
import { Link, useNavigate, useParams } from "react-router-dom";

export const EditOrders = ({ id, setOpenEditID }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  // const { id } = useParams();
  const { handleRes, handleError } = useHandler();
  const [current, setCurrent] = useState({});
  const { isLoading, error, orders } = useSelector(
    (store) => store.ordersReducer
  );
  useEffect(() => {
    const filtered = orders.filter((item) => {
      return item.order_id == id;
    });
    setCurrent(filtered[0]);
    onOpen();
  }, [id]);
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
        empty = "Ordered Products";
        break;

      case quality:
        empty = "Address";
        break;

      case total_amount:
        empty = "Contact Number";
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
        empty = "White Labeling";
        break;

      case type_of_packaging:
        empty = "Type of Packaging";
        break;

      case urgent_requirement:
        empty = "Urgent Requirement";
        break;

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
      order_id: id,
      ordered_products: ordered_products,
      quality: +quality,
      total_amount,
      payment_mode,
      delivery_date,
      transport_method,
      white_labeling,
      type_of_packaging,
      urgent_requirement,
      customer_id,
    };
    dispatch(edit_orders(data, handleRes, handleError))?.then((data) => {
      onClose();
      setOpenEditID("");
      navigate("/orders");
    });
  };
  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={() => {
        onClose();
        setOpenEditID("");
        navigate("/orders");
      }}
      size="md"
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader sx={{ textAlign: "center" }}>Edit Order</DrawerHeader>
        <Stack alignItems={"center"} justifyContent={"center"}>
          <DrawerBody>
            <Stack gap={4} mt={1}>
              <form onSubmit={handleForm}>
                <Stack gap={4}>
                  <Flex
                    sx={{
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <Text sx={{ minWidth: "50%" }}>Ordered Products</Text>
                    <Input
                      type="text"
                      placeholder="Ordered Products"
                      id="ordered_products"
                      value={current?.ordered_products}
                      onChange={(e) =>
                        setCurrent({
                          ...current,
                          ordered_products: e.target.value,
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
                    <Text sx={{ minWidth: "50%" }}>Quality</Text>
                    <Input
                      type="text"
                      placeholder="Quality"
                      id="quality"
                      value={current?.quality}
                      onChange={(e) =>
                        setCurrent({ ...current, quality: e.target.value })
                      }
                    />
                  </Flex>
                  <Flex
                    sx={{
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    <Text sx={{ minWidth: "50%" }}>Total Amount</Text>
                    <Input
                      type="text"
                      placeholder="Total Amount"
                      id="total_amount"
                      value={current?.total_amount}
                      onChange={(e) =>
                        setCurrent({
                          ...current,
                          total_amount: e.target.value,
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
                    <Text sx={{ minWidth: "50%" }}>Payment Mode</Text>
                    <Input
                      type="text"
                      placeholder="Payment Mode"
                      id="payment_mode"
                      value={current?.payment_mode}
                      onChange={(e) =>
                        setCurrent({
                          ...current,
                          payment_mode: e.target.value,
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
                    <Text sx={{ minWidth: "50%" }}>Delivery Date</Text>
                    <Input
                      type="text"
                      placeholder="Delivery Date"
                      id="delivery_date"
                      value={current?.delivery_date}
                      onChange={(e) =>
                        setCurrent({
                          ...current,
                          delivery_date: e.target.value,
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
                    <Text sx={{ minWidth: "50%" }}>Transport Method</Text>
                    <Input
                      type="text"
                      placeholder="Transport Method"
                      id="transport_method"
                      value={current?.transport_method}
                      onChange={(e) =>
                        setCurrent({
                          ...current,
                          transport_method: e.target.value,
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
                    <Text sx={{ minWidth: "50%" }}>White Labeling</Text>
                    <Input
                      type="text"
                      placeholder="White Labeling"
                      id="white_labeling"
                      value={current?.white_labeling}
                      onChange={(e) =>
                        setCurrent({
                          ...current,
                          white_labeling: e.target.value,
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
                    <Text sx={{ minWidth: "50%" }}>Type of Packaging</Text>
                    <Input
                      type="text"
                      placeholder="Type of Packaging"
                      id="type_of_packaging"
                      value={current?.type_of_packaging}
                      onChange={(e) =>
                        setCurrent({
                          ...current,
                          type_of_packaging: e.target.value,
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
                    <Text sx={{ minWidth: "50%" }}>Urgent Requirement</Text>
                    <Input
                      type="text"
                      placeholder="Urgent Requirement"
                      id="urgent_requirement"
                      value={current?.urgent_requirement}
                      onChange={(e) =>
                        setCurrent({
                          ...current,
                          urgent_requirement: e.target.value,
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
                    <Text sx={{ minWidth: "50%" }}>Customer Id</Text>
                    <Input
                      type="text"
                      placeholder="Customer Id"
                      id="customer_id"
                      value={current?.customer_id}
                      onChange={(e) =>
                        setCurrent({
                          ...current,
                          customer_id: e.target.value,
                        })
                      }
                    />
                  </Flex>
                  <Flex gap={2} justifyContent={"flex-end"}>
                    <Button
                      as={Link}
                      to="/orders"
                      w={"fit-content"}
                      variant={"outline"}
                      onClick={() => {
                        onClose();
                        setOpenEditID("");
                        navigate("/orders");
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
