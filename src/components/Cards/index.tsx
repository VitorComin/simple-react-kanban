import { useTranslation } from "react-i18next";
import { ICards } from "types/Card";

const Cards: React.FC<ICards> = ({ card, setCards }) => {
  const { t } = useTranslation();

  return <div className="cards-container">{t("new_card")}</div>;
};

export default Cards;
