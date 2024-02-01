import { Box ,VStack} from "@chakra-ui/react";
import BookForm from "@/components/BookForm";

export default function Newbooks() {
  return (
    <VStack w="100%" p={5}>
      <Box w="100%" >
        <Box borderWidth="2px" borderRadius="lg" mx={"5"} p={5} borderColor={"blackAlpha.600"}>
          <BookForm />
        </Box>
      </Box>
    </VStack>
  );
}
