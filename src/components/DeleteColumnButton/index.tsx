import { DeleteIcon } from "assets/icons/Icons";
import { IDeleteColumnButton } from "types/Colums";

const DeleteColumnButton: React.FC<IDeleteColumnButton> = ({
  setColumns,
  currentColumnId,
}) => {
  function removeColumn() {
    setColumns((prevColumns) =>
      prevColumns?.filter((column) => column.id !== currentColumnId)
    );
  }

  return (
    <button className={"remove-column-button"} onClick={removeColumn}>
      <DeleteIcon />
    </button>
  );
};

export default DeleteColumnButton;
