import { useSortable } from "@dnd-kit/sortable";
import DeleteCardButton from "components/DeleteCardButton";
import { useTranslation } from "react-i18next";
import { ICards } from "types/Card";
import { CSS } from "@dnd-kit/utilities";
import EditCardButton from "components/EditCardButton";
import CardsContent from "components/CardsContent";

const Cards: React.FC<ICards> = ({ card }) => {
  const { t } = useTranslation();

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: card.id,
    data: {
      type: "Card",
      card,
    },
    resizeObserverConfig: {
      disabled: true,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="cards-container-while-dragging"
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="cards-container"
      {...attributes}
      {...listeners}
    >
      <CardsContent card={card} />
    </div>
  );
};

export default Cards;
