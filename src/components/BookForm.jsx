import { Button, FormControl, FormLabel, HStack, Text, Input, useToast, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { createBook, editBook } from "../modules/fetch";
import img from "../../public/assets/upload.png";
import Image from "next/image";

export default function BookForm({ bookData }) {
  const toast = useToast();
  const [selectedImage, setSelectedImage] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!selectedImage) {
      toast({
        title: "Error",
        description: "Please select image",
        status: "error",
        duration: 5000,
        isClosable: true
      });
    }
    const formData = new FormData(event.target);
    if (bookData) {
      try {
        
        const data = await editBook(bookData.id, formData.get("title"), formData.get("author"), formData.get("publisher"), parseInt(formData.get("year")), parseInt(formData.get("pages")));
        console.log(data)
        toast({
          title: "Success",
          description: "Book edited successfully",
          status: "success",
          duration: 5000,
          isClosable: true
        });
      } catch (error) {
        toast({
          title: "Error",
          description: error.response.data.message || "Something went wrong",
          status: "error",
          duration: 5000,
          isClosable: true
        });
      }
      return;
    }
    try {
      await createBook(formData);
      event.target.reset();
      toast({
        title: "Success",
        description: "Book created successfully",
        status: "success",
        duration: 5000,
        isClosable: true
      });
      setSelectedImage("");
    } catch (error) {
      toast({
        title: "Error",
        description: error.response.data.message || "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true
      });
    }
  }

  useEffect(() => {
    if (bookData?.image) {
      setSelectedImage(`http://localhost:3000/${bookData?.image}`);
    }
  }, [bookData]);

  return (
    <form onSubmit={handleSubmit}>
      <HStack w={"full"} p={4}>
        <VStack mb="auto" spacing={4} w={"50%"}>
          <Text fontSize="2xl" fontFamily="cursive" fontWeight="bold">
            {bookData ? "Form Edit Book" : "Form Create Book"}
          </Text>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input name="title" required defaultValue={bookData?.title} />
          </FormControl>
          <FormControl>
            <FormLabel>Author</FormLabel>
            <Input name="author" required defaultValue={bookData?.author} />
          </FormControl>
          <FormControl>
            <FormLabel>Publisher</FormLabel>
            <Input name="publisher" required defaultValue={bookData?.publisher} />
          </FormControl>
          <FormControl>
            <FormLabel>Year</FormLabel>
            <Input name="year" type="number" required defaultValue={bookData?.year} />
          </FormControl>
          <FormControl>
            <FormLabel>Pages</FormLabel>
            <Input name="pages" type="number" required defaultValue={bookData?.pages} />
          </FormControl>

          <Button w="full" type="submit" colorScheme="teal">
            {bookData ? "Edit Book" : "Create Book"}
          </Button>
        </VStack>
        <VStack w={"50%"} p={10} mb="auto" spacing={4}>
          {/* {selectedImage && <Image w={"full"} src={selectedImage} mt={"-32"} alt="Selected Image" />} */}
          {selectedImage ? <Image layout="responsive" width={500} height={300} src={selectedImage} mt={"-10"} alt="Selected Image" /> : <Image w={"full"} src={img} px={10} mt={"-10"} alt="Selected Image" />}
          {!bookData?.image && (
            <FormControl>
              <Input
                name="uploads"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setSelectedImage(URL.createObjectURL(file));
                }}
              />
            </FormControl>
          )}
        </VStack>
      </HStack>
    </form>
  );
}
