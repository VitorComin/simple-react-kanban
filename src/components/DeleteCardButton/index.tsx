import { DeleteIcon } from "assets/icons/Icons";
import { useKanban } from "contexts/KanbanContext";
import { IDeleteCardButton } from "types/Card";

const DeleteCardButton: React.FC<IDeleteCardButton> = ({ currentCardId }) => {
  const { setCards } = useKanban();

  function removeCard() {
    setCards((prevCards) =>
      prevCards?.filter((card) => card.id !== currentCardId)
    );
  }

  return (
    <button className={"remove-card-button"} onClick={removeCard}>
      <DeleteIcon />
    </button>
  );
};

export default DeleteCardButton;
