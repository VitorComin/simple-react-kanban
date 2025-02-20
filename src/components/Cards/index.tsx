import { ICards } from "types/Card";
import CardsContent from "components/CardsContent";
import CardDragAndDrop from "components/CardDragAndDrop";

const Cards: React.FC<ICards> = ({ card }) => {
  return (
    <CardDragAndDrop card={card}>
      <CardsContent card={card} />
    </CardDragAndDrop>
  );
};

export default Cards;
