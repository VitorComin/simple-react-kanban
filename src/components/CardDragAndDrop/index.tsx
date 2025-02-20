import { useSortable } from "@dnd-kit/sortable";
import { ICardDragAndDrop } from "types/Card";
import { CSS } from "@dnd-kit/utilities";

const CardDragAndDrop: React.FC<ICardDragAndDrop> = ({ children, card }) => {
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
      {children}
    </div>
  );
};

export default CardDragAndDrop;
