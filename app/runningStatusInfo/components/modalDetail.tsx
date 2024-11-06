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
  Link,
  Divider,
  Chip,
} from "@nextui-org/react";

const ModalDetail = ({ isOpen, onClose, result, weatherIndex }) => {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  // const [size, setSize] = React.useState('md')
  // console.log("ModalDetail", weatherIndex, result);
  const selectedResult = result[weatherIndex];
  console.log("selectedResult", selectedResult);
  return (
    <Modal
      backdrop="blur"
      size="md"
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
              <Chip
                className={
                  selectedResult.rating === "good"
                    ? "bg-success-400"
                    : selectedResult.rating === "caution"
                    ? "bg-amber-300 text-black"
                    : selectedResult.rating === "warning"
                    ? "bg-warning-400"
                    : "bg-danger-400"
                }
              >
                {selectedResult.rating}
              </Chip>
              {/*<p>{selectedResult.rating}</p>*/}
              <div>
                <span className="font-semibold">메세지</span>
                <p className="text-base ml-2">
                  {selectedResult.recommendation.message}
                </p>
              </div>

              {selectedResult.recommendation.items !== "" && (
                <div>
                  <span className="font-semibold">아이템</span>
                  <p className="text-base ml-2">
                    {selectedResult.recommendation.items}
                  </p>
                </div>
              )}

              {selectedResult.recommendation.shoes !== "" && (
                <div>
                  <span className="font-semibold">러닝슈즈</span>
                  <p className="text-base ml-2">
                    {selectedResult.recommendation.shoes}
                  </p>
                </div>
              )}

              <Divider />

              {/*<iframe*/}
              {/*  src="https://coupa.ng/cguRSF"*/}
              {/*  width="120"*/}
              {/*  height="240"*/}
              {/*  frameBorder="0"*/}
              {/*  scrolling="no"*/}
              {/*  referrerPolicy="unsafe-url"*/}
              {/*  browsingtopics*/}
              {/*></iframe>*/}
            </ModalBody>
            <ModalFooter>
              <div>
                <Button
                  href="https://link.coupang.com/a/bZga9r"
                  as={Link}
                  color="success"
                  showAnchorIcon
                  size="sm"
                  variant="solid"
                  className="mb-2"
                  isExternal
                >
                  쿠팡 홈
                </Button>
                <p className="text-xs">
                  &quot;쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의
                  수수료를 제공받습니다.&quot;
                </p>
              </div>
              {/*<Button color="danger" variant="light" onPress={onClose}>*/}
              {/*  Close*/}
              {/*</Button>*/}
              {/*<Button color="primary" onPress={onClose}>*/}
              {/*  Action*/}
              {/*</Button>*/}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalDetail;
