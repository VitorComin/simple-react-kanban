import { EditIcon } from "assets/icons/Icons";
import { ButtonHTMLAttributes } from "react";

const EditCardButton: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = (
  props
) => {
  return (
    <button className={"edit-card-button"} {...props}>
      <EditIcon />
    </button>
  );
};

export default EditCardButton;
