"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

const ModalDetail = ({ isOpen, onClose, result, weatherIndex }) => {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  // const [size, setSize] = React.useState('md')
  // console.log("ModalDetail", weatherIndex, result);
  const selectedResult = result[weatherIndex];
  console.log("selectedResult", selectedResult);
  return (
    <Modal
      size="full"
      isOpen={isOpen}
      onClose={onClose}
      className="text-default-700"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {selectedResult.condition}
            </ModalHeader>
            <ModalBody>
              <p>{selectedResult.rating}</p>
              <p>{selectedResult.recommendation.message}</p>
              <p>{selectedResult.recommendation.items}</p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={onClose}>
                Action
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalDetail;
