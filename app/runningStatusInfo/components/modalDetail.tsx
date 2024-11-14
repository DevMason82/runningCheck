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
import { IoClose } from "react-icons/io5";

const ModalDetail = ({ isOpen, onClose, result, weatherIndex }) => {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  // const [size, setSize] = React.useState('md')
  // console.log("ModalDetail", weatherIndex, result);
  const selectedResult = result[weatherIndex];
  console.log("selectedResult", selectedResult);
  return (
    <Modal
      backdrop="blur"
      size="sm"
      isOpen={isOpen}
      onClose={onClose}
      className="text-default-700"
      placement="bottom"
      closeButton={<IoClose size={45} color="white" />}
      scrollBehavior="inside"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {selectedResult.condition}
            </ModalHeader>
            <ModalBody className="gap-6">
              <div>
                <span className="font-semibold">러닝상태</span>
                <div className="ml-3">
                  <Chip
                    className={
                      selectedResult.rating === "good"
                        ? "bg-success-400 capitalize"
                        : selectedResult.rating === "caution"
                        ? "bg-amber-300 text-black capitalize"
                        : selectedResult.rating === "warning"
                        ? "bg-warning-400 capitalize"
                        : "bg-danger-400 capitalize"
                    }
                    size="sm"
                  >
                    {selectedResult.rating}
                  </Chip>
                </div>
              </div>
              {/*<p>{selectedResult.rating}</p>*/}
              <div>
                <span className="font-semibold">러닝코멘트</span>
                <p className="text-base ml-4 whitespace-pre-wrap">
                  {selectedResult.recommendation.message}
                </p>
                {/*<p>*/}
                {/*  Lorem ipsum dolor sit amet, consectetur adipiscing elit.*/}
                {/*  Nullam pulvinar risus non risus hendrerit venenatis.*/}
                {/*  Pellentesque sit amet hendrerit risus, sed porttitor quam.*/}
                {/*</p>*/}
                {/*<p>*/}
                {/*  Magna exercitation reprehenderit magna aute tempor cupidatat*/}
                {/*  consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex*/}
                {/*  incididunt cillum quis. Velit duis sit officia eiusmod Lorem*/}
                {/*  aliqua enim laboris do dolor eiusmod. Et mollit incididunt*/}
                {/*  nisi consectetur esse laborum eiusmod pariatur proident Lorem*/}
                {/*  eiusmod et. Culpa deserunt nostrud ad veniam.*/}
                {/*</p>*/}
              </div>

              {selectedResult.recommendation.items !== "" && (
                <div>
                  <span className="font-semibold">러닝의류</span>
                  <p className="text-base ml-4">
                    {selectedResult.recommendation.items}
                  </p>
                </div>
              )}

              {selectedResult.recommendation.shoes !== "" && (
                <div>
                  <span className="font-semibold">러닝화</span>
                  <p className="text-base ml-4">
                    {selectedResult.recommendation.shoes}
                  </p>
                </div>
              )}

              {/*<Divider />*/}

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
            {/*<ModalFooter>*/}
            {/*  <div>*/}
            {/*    <Button*/}
            {/*      href="https://link.coupang.com/a/bZga9r"*/}
            {/*      as={Link}*/}
            {/*      color="success"*/}
            {/*      showAnchorIcon*/}
            {/*      size="sm"*/}
            {/*      variant="solid"*/}
            {/*      className="mb-2"*/}
            {/*      isExternal*/}
            {/*    >*/}
            {/*      쿠팡 홈*/}
            {/*    </Button>*/}
            {/*    <p className="text-xs">*/}
            {/*      &quot;쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의*/}
            {/*      수수료를 제공받습니다.&quot;*/}
            {/*    </p>*/}
            {/*  </div>*/}
            {/*</ModalFooter>*/}
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalDetail;
