import { Dispatch, SetStateAction } from "react";
import { Modal, Box } from "@mui/material";

interface IModal {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  activeItem: any;
  component: any;
  setRoute?: Dispatch<SetStateAction<string>>;
}

export default function CustomModal({
  open,
  setOpen,
  activeItem,
  component: Component,
  setRoute,
}: IModal) {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
     {/*  <Box className="absolute top-[50%] translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none"> */}
     <Box className="w-[450px] max-w-full mx-auto mt-[200px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
      <Component setOpen={setOpen} setRoute={setRoute} />
      </Box>
    </Modal>
  );
}
