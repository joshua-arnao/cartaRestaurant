import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

export function ModalBasic(props) {
  const { show, title, children, onClose } = props;
  //const { isOpen, onOpen, onClose } = useDisclosure(props);
  //const { title, children } = props;

  // const formik = useFormik({
  //   initialValues: initialValues(),
  //   validationSchema: Yup.object(newSchema()),
  //   validateOnChange: false,
  //   onSubmit: (formValue) => {
  //     console.log("Formulario enviado");
  //     console.log(formValue);
  //   },
  // });

  return (
    <>
      <Modal isOpen={show} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {title && <ModalHeader mt={4}>{title}</ModalHeader>}
          <ModalCloseButton />
          <ModalBody px={6}>{children}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
