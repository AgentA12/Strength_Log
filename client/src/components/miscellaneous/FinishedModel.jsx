import React from "react";
import { Button, Modal } from "flowbite-react";
import { GiPartyPopper } from "react-icons/gi";

function FinishedModel({ isOpen, setIsOpen }) {
  return (
    <React.Fragment>
      <Modal color="grey" show={isOpen} size="md" popup={true}>
        <Modal.Header
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        />
        <Modal.Body>
          <div className="text-center">
            <GiPartyPopper color="green" className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Finish your workout?
            </h3>
            <div className="flex justify-center gap-4">
              <Button>Yes, I'm sure</Button>
              <Button color="gray">No</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}

export default FinishedModel;
