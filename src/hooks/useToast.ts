import { useCallback } from "react";
import { toast } from "react-toastify";
import { errorToast, successToast } from "../config/toastConfig";

export const useToast = () => {
  const toastSuccess = useCallback((message: string) => {
    return toast.success(message, successToast);
  }, []);

  const toastError = useCallback((message: string) => {
    return toast.error(message, errorToast);
  }, []);

  return {
    toastSuccess,
    toastError,
  };
};
