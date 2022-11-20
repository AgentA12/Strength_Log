import React from "react";
import { GiPartyPopper } from "react-icons/gi";
import { Dialog, DialogHeader, DialogFooter } from "@material-tailwind/react";

function FinishedModel({ isOpen, setIsOpen }) {
  return (
    <React.Fragment>
      <Dialog
        open={isOpen}
        handler={setIsOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        className="bg-overlay"
      >
        <DialogHeader className="text-white_faded justify-center">
          Finish Workout ?
        </DialogHeader>

        <DialogFooter className="justify-between">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-error mr-1 bg-transparent py-2 px-4 border border-error hover:border-opacity-10 hover:bg-opacity-10 hover:bg-error rounded transition-colors ease-in"
          >
            <span>Cancel</span>
          </button>
          <button
            className="save-workout-btn gap-3"
            onClick={() => setIsOpen(!isOpen)}
          >
            <GiPartyPopper size={32} /> <span>Confirm</span>
          </button>
        </DialogFooter>
      </Dialog>
    </React.Fragment>
  );
}

export default FinishedModel;
