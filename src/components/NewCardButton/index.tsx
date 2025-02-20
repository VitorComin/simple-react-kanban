import { DarkAddIcon } from "assets/icons/Icons";
import { useKanban } from "contexts/KanbanContext";
import { useTranslation } from "react-i18next";
import { INewCardButton } from "types/Card";

const NewCardButton: React.FC<INewCardButton> = ({ columnId }) => {
  const { t } = useTranslation();
  const { setCards } = useKanban();

  function addCard() {
    setCards((prevCard) => [
      ...prevCard,
      { id: crypto.randomUUID(), title: t("new_card"), columnId: columnId },
    ]);
  }

  return (
    <button className="add-card-button" onClick={addCard}>
      <DarkAddIcon />
      <span>{t("add_card")}</span>
    </button>
  );
};

export default NewCardButton;
