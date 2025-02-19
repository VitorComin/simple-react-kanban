import { EditIcon } from "assets/icons/Icons";
import { ButtonHTMLAttributes } from "react";

const EditColumnButton: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = (
  props
) => {
  return (
    <button className={"edit-column-button"} {...props}>
      <EditIcon />
    </button>
  );
};

export default EditColumnButton;
