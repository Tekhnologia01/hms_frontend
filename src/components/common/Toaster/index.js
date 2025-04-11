import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CommonToast = () => {
  return <ToastContainer position="top-right" />;
};

export const showToast = (message, type = "success", autoClose = 3000) => {
  switch (type) {
    case "success":
      toast.success(message, { autoClose });
      break;
    case "error":
      toast.error(message, { autoClose });
      break;
    case "info":
      toast.info(message, { autoClose });
      break;
    case "warning":
      toast.warning(message);
      break;
    default:
      toast(message);
  }
};

export default CommonToast;
