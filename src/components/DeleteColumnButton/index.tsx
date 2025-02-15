import { DeleteIcon } from "assets/icons/Icons";
import { IDeleteColumnButton } from "types/Colums";

const DeleteColumnButton: React.FC<IDeleteColumnButton> = ({
  setColumns,
  currentColumnIndex,
}) => {
  function removeColumn() {
    setColumns((prevColumns) =>
      prevColumns?.filter((_, index) => index !== currentColumnIndex)
    );
  }

  return (
    <button className={"remove-column-button"} onClick={removeColumn}>
      <DeleteIcon />
    </button>
  );
};

export default DeleteColumnButton;
