import { Alert } from "@material-tailwind/react";

export default function CustomAlert({ message, showToast, setShowtoast }) {
  return (
    <Alert
      className="absolute bottom-0 right-0 mb-10 w-fit mr-20 text-green-400 bg-background border border-green-400"
      show={showToast}
      animate={{
        mount: { y: 0 },
        unmount: { y: -50 },
      }}
      dismissible={{
        onClose: () => setShowtoast(false),
      }}
      color="green"
    >
      {message}
    </Alert>
  );
}
