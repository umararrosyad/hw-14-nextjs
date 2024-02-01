import { Button, Flex, FormControl, FormLabel, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, useToast, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
// import { Link, useNavigate, useLocation } from "react-router-dom";
import { loginUser } from "../modules/fetch";
import logo from "../../public/assets/logo.png";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLogin, setIsLogin] = useState(false);
  const toast = useToast();
  const router = useRouter();
  const { pathname } = router;
  useEffect(() => {
    // Pastikan kode hanya berjalan di lingkungan browser sebelum mencoba mengakses window.localStorage
    if (typeof window !== "undefined") {
      const token = window.localStorage.getItem("token");
      if (token) {
        setIsLogin(true);
      }
    }
  }, );

  return (
    <Flex w="100%" as="nav" align="center" justify="space-between" wrap="wrap" py="1rem" bg="teal.500" color="white">
      <HStack>
        <Link href="/">
          <Flex align="center" ms={5} cursor="pointer" justify="left">
            <Image width={190} height={10} objectFit="contain" src={logo} alt="Logo" />
          </Flex>
        </Link>

        <Link href="/">
          {pathname == "/" ? (
            <Text px="1" fontSize="xl" fontFamily="mono" textDecoration={"underline"}>
              Home
            </Text>
          ) : (
            <Text px="1" fontSize="xl" fontFamily="mono">
              Home
            </Text>
          )}
        </Link>
        <Link href="/explore">
          {pathname == "/explore" ? (
            <Text px="1" fontSize="xl" fontFamily="mono" textDecoration={"underline"}>
              Books
            </Text>
          ) : (
            <Text px="1" fontSize="xl" fontFamily="mono">
              Books
            </Text>
          )}
        </Link>
      </HStack>

      <HStack mx={10}>
        {isLogin && pathname === "/explore" && (
          <Link href="/newbooks">
            <Button colorScheme="blackAlpha">Create New Book</Button>
          </Link>
        )}
        {!isLogin ? (
          <>
            <Button onClick={onOpen} colorScheme="blackAlpha">
              Sign in
            </Button>
            <Link href="/register">
              <Button colorScheme="facebook">Sigh up</Button>
            </Link>
          </>
        ) : (
          <Button
            colorScheme="red"
            onClick={() => {
              window.localStorage.removeItem("token");
              setIsLogin(false);
              router.push("/");
            }}
          >
            Sign Out
          </Button>
        )}
      </HStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <form
          id="login-form"
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              const token = await loginUser(e.target.email.value, e.target.password.value);
              // console.log(token.token);
              if (!token.token) {
                throw { message: "username or password wrong" };
              } else {
                window.localStorage.setItem("token", token.token);
              }
              // navigate("/");
              onClose();
            } catch (err) {
              toast({
                title: "caredential error",
                description: err.message,
                status: "error",
                duration: 3000,
                isClosable: true
              });
            }
          }}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Login</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack>
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input name="email" type="email" placeholder="Enter your email address" />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" name="password" placeholder="Enter your password" />
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" form="login-form" colorScheme="blue" mr={3}>
                Login
              </Button>
              <Link href="/register" onClick={onClose}>
                <Button variant="ghost">Doesn't Have Account? Click here</Button>
              </Link>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </Flex>
  );
};

export default Navbar;
