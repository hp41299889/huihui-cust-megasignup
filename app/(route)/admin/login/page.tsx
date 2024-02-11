import { Dialog, DialogContent, DialogTitle } from "@mui/material";

import LoginForm from "@/component/form/login";

const Page = () => {
  return (
    <Dialog open>
      <DialogTitle>後台登入</DialogTitle>
      <DialogContent>
        <LoginForm />
      </DialogContent>
    </Dialog>
  );
};

export default Page;
