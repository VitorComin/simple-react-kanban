import { DeleteIcon } from "assets/icons/Icons";
import { useKanban } from "contexts/KanbanContext";
import { IDeleteColumnButton } from "types/Columns";

const DeleteColumnButton: React.FC<IDeleteColumnButton> = ({
  currentColumnId,
}) => {
  const { setCards, setColumns } = useKanban();

  function removeColumn() {
    setColumns((prevColumns) =>
      prevColumns?.filter((column) => column.id !== currentColumnId)
    );

    setCards((prevCards) =>
      prevCards.filter((card) => card.columnId !== currentColumnId)
    );
  }

  return (
    <button className={"remove-column-button"} onClick={removeColumn}>
      <DeleteIcon />
    </button>
  );
};

export default DeleteColumnButton;
