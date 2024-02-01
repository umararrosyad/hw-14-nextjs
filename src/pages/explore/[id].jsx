import { Box, Button, Flex, VStack, Heading, HStack, Image, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Skeleton, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer } from "@chakra-ui/react";
// import { Link, useNavigate, useParams } from "react-router-dom";?
import { useRouter } from 'next/router';
import Link from "next/link";
import { getOneBook,deleteBook } from "../../modules/fetch";

export default function BookDetails() {
  const [book, setBook] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;
  // const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await getOneBook(id);
        setBook(response)
        // console.log(response)
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchBook();
  }, [id]);

  const handleDeleteBook = async () => {
    try {
      await deleteBook(id);
      router.push("/explore")
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <VStack w="100%" p={5}>
      <Box w="100%">
        <Box borderWidth="2px" borderRadius="lg" mx={"5"} pt="5"borderColor={"blackAlpha.600"}>
          <Box>
            <Text fontSize="3xl" ms={"10"} fontFamily="cursive" fontWeight="bold">
              Book Detail 
            </Text>
            {isLoading ? (
              <Skeleton height="300px" my="6" />
            ) : (
              <Flex my="6" gap="10" mx={"10"}>
                <Box w="50%">
                  <Image src={`http://localhost:3000/${book?.image}`} alt={book?.title} />
                </Box>
                <TableContainer w={"50%"}>
                  <Table variant="simple">
                    <Tbody>
                      <Tr>
                        <Td>Title</Td>
                        <Td>{book?.title}</Td>
                      </Tr>
                      <Tr>
                        <Td>Author </Td>
                        <Td>{book?.author}</Td>
                      </Tr>
                      <Tr>
                        <Td>Publisher</Td>
                        <Td>{book?.publisher}</Td>
                      </Tr>
                      <Tr>
                        <Td>Release year</Td>
                        <Td>{book?.year} </Td>
                      </Tr>
                      <Tr>
                        <Td>Total Page</Td>
                        <Td> {book?.pages}</Td>
                      </Tr>
                    </Tbody>
                    <Tfoot>
                    {localStorage.getItem("token") && (
                        <HStack m={"5"}>
                          <Popover>
                            <PopoverTrigger>
                              <Button colorScheme="red">Delete</Button>
                            </PopoverTrigger>
                            <PopoverContent>
                              <PopoverArrow />
                              <PopoverCloseButton />
                              <PopoverHeader>Confirmation!</PopoverHeader>
                              <PopoverBody>Are you sure you want to delete this book?</PopoverBody>
                              <Button onClick={handleDeleteBook} colorScheme="red">
                                Delete
                              </Button>
                            </PopoverContent>
                          </Popover>
                          <Link href={`/editbook/${id}`}>
                            <Button>Edit</Button>
                          </Link>
                        </HStack>
                      )}
                    </Tfoot>
                  </Table>
                </TableContainer>
              </Flex>
            )}
          </Box>
        </Box>
      </Box>
    </VStack>
  );
}
