import { Box, HStack, VStack , Image, Text} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import BookForm from "../../components/BookForm";
import { getOneBook } from "../../modules/fetch";
import { useRouter } from "next/router";
// import img from "../../../public/assets/register.png"

export default function EditBookPage() {

  const [book, setBook] = useState(null);
  const router = useRouter()
  const {id} = router.query

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await getOneBook(id);
        // console.log(response)
        setBook(response);
      } catch (e) {
        console.log(e);
      }
    };
    fetchBook();
  }, [id]);

  return (
    <VStack w="full" p={5}>
      <Box w="100%">
        <Box borderWidth="2px" borderRadius="lg"  mx={'5'} p={4} borderColor={"blackAlpha.600"}>
          <BookForm bookData={book} />
        </Box>
      </Box>
    </VStack>
  );
}
