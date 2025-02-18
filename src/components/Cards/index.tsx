import DeleteCardButton from "components/DeleteCardButton";
import { useTranslation } from "react-i18next";
import { ICards } from "types/Card";

const Cards: React.FC<ICards> = ({ card, setCards }) => {
  const { t } = useTranslation();

  return (
    <div className="cards-container">
      <span>{t("new_card")}</span>
      <DeleteCardButton currentCardId={card.id} setCards={setCards} />
    </div>
  );
};

export default Cards;
