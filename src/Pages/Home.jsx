import React from "react";
import Layout from "../Components/Layout";
import { Box, Card, Stat, StatLabel, StatNumber } from "@chakra-ui/react";

export const Home = () => {
  return (
    <Layout>
      <Card
        sx={{
          backgroundColor: "#FAFAFA",
          pb: 2,
          px: 5,
          mt: 10,
          border: "1px solid #d3d3d3",
          boxShadow: "none",
        }}
        p={5}
      >
        <Box
          display={"grid"}
          gridTemplateColumns={"repeat(3, 1fr)"}
          textAlign={"center"}
          gap={10}
          color={"darkblue"}
        >
          <Box
            bg={"white"}
            p={6}
            borderRadius={10}
            boxShadow={"md"}
            border={"1px solid lightgray"}
          >
            <Stat>
              <StatNumber fontSize={"2rem"}>5345</StatNumber>
              <StatLabel>Total Inquiry</StatLabel>
            </Stat>
          </Box>
          <Box
            bg={"white"}
            p={6}
            borderRadius={10}
            boxShadow={"md"}
            border={"1px solid lightgray"}
          >
            <Stat>
              <StatNumber fontSize={"2rem"}>2322</StatNumber>
              <StatLabel>Total Orders</StatLabel>
            </Stat>
          </Box>
          <Box
            bg={"white"}
            p={6}
            borderRadius={10}
            boxShadow={"md"}
            border={"1px solid lightgray"}
          >
            <Stat>
              <StatNumber fontSize={"2rem"}>324</StatNumber>
              <StatLabel>Total Store</StatLabel>
            </Stat>
          </Box>
          <Box
            bg={"white"}
            p={6}
            borderRadius={10}
            boxShadow={"md"}
            border={"1px solid lightgray"}
          >
            <Stat>
              <StatNumber fontSize={"2rem"}>3243</StatNumber>
              <StatLabel>Total Purchase</StatLabel>
            </Stat>
          </Box>
          <Box
            bg={"white"}
            p={6}
            borderRadius={10}
            boxShadow={"md"}
            border={"1px solid lightgray"}
          >
            <Stat>
              <StatNumber fontSize={"2rem"}>676</StatNumber>
              <StatLabel>Total Production</StatLabel>
            </Stat>
          </Box>
          <Box
            bg={"white"}
            p={6}
            borderRadius={10}
            boxShadow={"md"}
            border={"1px solid lightgray"}
          >
            <Stat>
              <StatNumber fontSize={"2rem"}>3422</StatNumber>
              <StatLabel>Total Packaging</StatLabel>
            </Stat>
          </Box>
          <Box
            bg={"white"}
            p={6}
            borderRadius={10}
            boxShadow={"md"}
            border={"1px solid lightgray"}
          >
            <Stat>
              <StatNumber fontSize={"2rem"}>3242</StatNumber>
              <StatLabel>Total Billing</StatLabel>
            </Stat>
          </Box>
          <Box
            bg={"white"}
            p={6}
            borderRadius={10}
            boxShadow={"md"}
            border={"1px solid lightgray"}
          >
            <Stat>
              <StatNumber fontSize={"2rem"}>423</StatNumber>
              <StatLabel>Total Dispatch</StatLabel>
            </Stat>
          </Box>
          <Box
            bg={"white"}
            p={6}
            borderRadius={10}
            boxShadow={"md"}
            border={"1px solid lightgray"}
          >
            <Stat>
              <StatNumber fontSize={"2rem"}>3423</StatNumber>
              <StatLabel>Total Replacement</StatLabel>
            </Stat>
          </Box>
          <Box></Box>
          <Box
            bg={"white"}
            p={6}
            borderRadius={10}
            boxShadow={"md"}
            border={"1px solid lightgray"}
          >
            <Stat>
              <StatNumber fontSize={"2rem"}>1221</StatNumber>
              <StatLabel>Total Employee</StatLabel>
            </Stat>
          </Box>
        </Box>
      </Card>
    </Layout>
  );
};
