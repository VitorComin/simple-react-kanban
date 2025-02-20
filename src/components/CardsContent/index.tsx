import DeleteCardButton from "components/DeleteCardButton";
import EditCardButton from "components/EditCardButton";
import { useKanban } from "contexts/KanbanContext";
import { useRef, useState } from "react";
import { ICardsContent } from "types/Card";
import { checkEnterKeyAndBlurElement } from "utils/checkEnterKeyAndBlurElement";
import { useToastMessages } from "utils/toastMessages";

const CardsContent: React.FC<ICardsContent> = ({ card }) => {
  const { setCards } = useKanban();
  const { savedSuccessfullyMessage } = useToastMessages();
  const [cardTitleReadOnly, setCardTitleReadOnly] = useState(true);
  const [newCardTitle, setNewCardTitle] = useState(card.title);
  const cardTitleInputElementRef = useRef<HTMLInputElement | null>(null);

  function handleCardTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewCardTitle(e.target.value);
  }

  function handleColumnReadOnlyAndSaveEdit() {
    setCardTitleReadOnly(true);

    if (cardTitleHasChanged()) {
      setCards((prevCards) =>
        prevCards.map((cardItem) =>
          cardItem.id === card.id
            ? { ...cardItem, title: newCardTitle }
            : cardItem
        )
      );

      savedSuccessfullyMessage();
    }
  }

  function cardTitleHasChanged() {
    return newCardTitle !== card.title;
  }

  function setCardTitleEditableAndFocusIt() {
    setCardTitleReadOnly(false);

    if (cardTitleInputElementRef.current) {
      cardTitleInputElementRef.current.focus();
    }
  }

  return (
    <>
      <input
        className="card-title-input"
        readOnly={cardTitleReadOnly}
        value={newCardTitle}
        ref={cardTitleInputElementRef}
        onChange={handleCardTitleChange}
        onBlur={handleColumnReadOnlyAndSaveEdit}
        onKeyDown={checkEnterKeyAndBlurElement}
      />
      <div>
        <EditCardButton onClick={setCardTitleEditableAndFocusIt} />
        <DeleteCardButton currentCardId={card.id} />
      </div>
    </>
  );
};

export default CardsContent;
