import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
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
      <Button onClick={show}>Open Modal</Button>

      <Modal isOpen={show} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {title && <ModalHeader>{title}</ModalHeader>}
          <ModalCloseButton />
          <ModalBody pb={6}>{children}Contenido del modal</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
