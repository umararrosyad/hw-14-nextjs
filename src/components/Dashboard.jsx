import { Card, Heading, InputGroup, Center, Input, Spacer, Text, VStack, Box, Flex, HStack, Button } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon } from "@chakra-ui/icons";
import img from "../../public/assets/img-dashboard.png";

export default function Dasboard() {
  return (
    <>
      <Flex m={5} justify="center">
        <Box ms={20}>
          <Image width={450} ms={20} src={img} />
        </Box>
        <Spacer />
        <Center m={10}>
          <VStack>
            <Box></Box>
            <Text as={"h1"} fontSize={"xx-large"} mt={"-10"} my={5} fontFamily="cursive" textAlign={"center"}>
              Explore the Wonders of Literature with BookStore
            </Text>
            <Link href="/explore">
              <Button rightIcon={<ArrowRightIcon />} colorScheme="teal" variant="solid">
                Explore
              </Button>
            </Link>
          </VStack>
        </Center>
      </Flex>
    </>
  );
}
