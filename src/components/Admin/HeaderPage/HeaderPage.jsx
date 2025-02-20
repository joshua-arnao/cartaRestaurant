import React from "react";
import { Flex, Box, Stack, Spacer, Text, Button } from "@chakra-ui/react";
import { MdAddCircle, MdPersonRemove } from "react-icons/md";

export function HeaderPage(props) {
  const { title, btnTitle, btnClick, btnTitleTwo, btnClicTwo } = props;
  return (
    <Flex>
      <Text fontSize="4xl">{title}</Text>
      <Spacer />
      <Stack direction="row" spacing={4} align="center">
        <Box>
          {btnTitleTwo && (
            <Button
              leftIcon={<MdPersonRemove />}
              colorScheme="red"
              variant="outline"
              onClick={btnClicTwo}
            >
              {btnTitleTwo}
            </Button>
          )}
        </Box>
        <Box>
          {btnTitle && (
            <Button
              leftIcon={<MdAddCircle />}
              colorScheme="teal"
              onClick={btnClick}
            >
              {btnTitle}
            </Button>
          )}
        </Box>
      </Stack>
    </Flex>
  );
}
