import { DarkAddIcon } from "assets/icons/Icons";
import { useTranslation } from "react-i18next";
import { INewCardButton } from "types/Card";

const NewCardButton: React.FC<INewCardButton> = ({ setCards, columnId }) => {
  const { t } = useTranslation();

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
