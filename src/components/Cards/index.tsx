import { useSortable } from "@dnd-kit/sortable";
import DeleteCardButton from "components/DeleteCardButton";
import { useTranslation } from "react-i18next";
import { ICards } from "types/Card";
import { CSS } from "@dnd-kit/utilities";

const Cards: React.FC<ICards> = ({ card, setCards }) => {
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
    return <div ref={setNodeRef} style={style} className="cards-container" />;
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="cards-container"
      {...attributes}
      {...listeners}
    >
      <span>{t("new_card")}</span>
      <DeleteCardButton currentCardId={card.id} setCards={setCards} />
    </div>
  );
};

export default Cards;
