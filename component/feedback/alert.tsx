import { Alert, AlertColor, Snackbar } from "@mui/material";

import { OnClose } from "@/util/client/hook/useAlert";

interface Props {
  open: boolean;
  message: string;
  type: AlertColor;
  onClose: OnClose;
}

const AlertFeedback = (props: Props) => {
  const { open, message, type, onClose } = props;

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      autoHideDuration={3000}
      open={open}
      onClose={onClose}
    >
      <Alert onClose={onClose} variant="filled" severity={type}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertFeedback;
