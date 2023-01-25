import { Alert } from "@material-tailwind/react";
import { useState, useEffect } from "react";

export default function CustomAlert({ message }) {
  // the alert is displayed by default
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    // when the component is mounted, the alert is displayed for 3 seconds
    setTimeout(() => {
      setAlert(false);
    }, 3000);
  }, []);

  return alert ? (
    <Alert
      className={`absolute bottom-0 right-0 mb-10 w-fit mr-20  border text-green-400 border-green-400`}
      animate={{
        mount: { y: 0 },
        unmount: { y: -50 },
      }}
      dismissible={{
        onClose: () => setAlert(false),
      }}
      color="green"
    >
      {message}
    </Alert>
  ) : null;
}
