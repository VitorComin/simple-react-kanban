import { DeleteIcon } from "assets/icons/Icons";
import { IDeleteCardButton } from "types/Card";

const DeleteCardButton: React.FC<IDeleteCardButton> = ({
  setCards,
  currentCardId,
}) => {
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
