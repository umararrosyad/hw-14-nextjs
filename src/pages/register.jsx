import { useState } from "react";
import { Box, Button, FormControl, FormErrorMessage, FormLabel, HStack, Input, Text, useToast, VStack } from "@chakra-ui/react";
import { registerUser } from "../modules/fetch";
// import { useNavigate } from "react-router-dom";
import img from "../../public/assets/register.png";
import Image from "next/image";
import { useRouter } from "next/router";


export default function Register(){
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  // const navigate = useNavigate();
  const toast = useToast();
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return;
    }
    try {
      await registerUser(e.target.name.value, e.target.email.value, password);
      toast({
        title: "Registered",
        description: "You have successfully registered.",
        status: "success",
        duration: 3000,
        isClosable: true
      });
      router.push("/");
    } catch (e) {
      const error = new Error(e);
      toast({
        title: "An error occurred.",
        description: error?.message || "An error occurred. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true
      });
    }
    setError(error?.message || "An error occurred");
  };

  return (
    <>
      <HStack w="full" pt={8}>
        <VStack ms={10}>
          <Text fontSize="6xl" fontFamily="cursive" mb={"-10"} fontWeight="bold">
            Register
          </Text>
          <Image htmlWidth={"800x"} ms={5} src={img} />
        </VStack>

        <Box w="80%" py={4} pe={"32"} me={20} mt={2}>
          <Box borderWidth="2px" borderRadius="lg" p={4} borderColor={"blackAlpha.600"}>
            <form onSubmit={handleSubmit}>
              {error && (
                <Box color="red.500" mb={4}>
                  {error}
                </Box>
              )}

              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input type="name" name="name" placeholder="Enter your name" />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input type="email" name="email" placeholder="Enter your email address" />
              </FormControl>

              <FormControl isRequired mt={4}>
                <FormLabel>Password</FormLabel>
                <Input type="password" placeholder="Enter a password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </FormControl>

              <FormControl isRequired mt={4}>
                <FormLabel>Confirm Password</FormLabel>
                <Input type="password" placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                {password !== confirmPassword && (
                  <Text fontSize="xs" color="red.500">
                    The password does not match
                  </Text>
                )}
              </FormControl>

              <Button mt={6} w={"full"} colorScheme="teal" type="submit">
                Register
              </Button>
            </form>
          </Box>
        </Box>
      </HStack>
    </>
  );
};

