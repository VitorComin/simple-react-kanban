import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export function useToastMessages() {
  const { t } = useTranslation();

  function savedSuccessfullyMessage() {
    toast.success(t("saved_successfully"), {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  }

  return { savedSuccessfullyMessage };
}
