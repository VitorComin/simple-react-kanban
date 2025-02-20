import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useKanban } from "contexts/KanbanContext";
import { IKanbanDragAndDrop } from "types/Kanban";

const KanbanDragAndDrop: React.FC<IKanbanDragAndDrop> = ({ children }) => {
  const { setActiveColumn, setActiveCard, setColumns, setCards } = useKanban();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === "Card") {
      setActiveCard(event.active.data.current.card);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveCard(null);
    setActiveColumn(null);

    const { active, over } = event;

    if (!over) return;

    const isActiveAColumn = active.data.current?.type === "Column";

    if (!isActiveAColumn) return;

    const activeColumnId = active.id as string;
    const overColumnId = over.id as string;

    if (activeColumnId === overColumnId) {
      return;
    } else {
      setColumns((prevColumns) => {
        const activeColumnIndex = prevColumns.findIndex(
          (column) => column.id === activeColumnId
        );

        const overColumnIndex = prevColumns.findIndex(
          (column) => column.id === overColumnId
        );

        return arrayMove(prevColumns, activeColumnIndex, overColumnIndex);
      });
    }
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;

    if (!over) return;

    const activeCardId = active.id as string;
    const overId = over.id as string;

    if (activeCardId === overId) return;

    const isActiveACard = active.data.current?.type === "Card";
    const isOverACard = active.data.current?.type === "Card";

    if (!isActiveACard) return;

    if (isActiveACard && isOverACard) {
      setTimeout(
        () =>
          setCards((prevCards) => {
            const activeIndex = prevCards.findIndex(
              (card) => card.id === activeCardId
            );
            const overIndex = prevCards.findIndex((card) => card.id === overId);

            if (overIndex < 0) return prevCards;

            if (prevCards[overIndex].columnId) {
              const switchingCardColumn =
                prevCards[overIndex]?.columnId !==
                prevCards[activeIndex]?.columnId;

              if (switchingCardColumn) {
                prevCards[activeIndex].columnId = prevCards[overIndex].columnId;

                const adjustedNewColumnOverIndex =
                  overIndex === 0 ? overIndex : overIndex - 1;

                return arrayMove(
                  prevCards,
                  activeIndex,
                  adjustedNewColumnOverIndex
                );
              }
            }

            return arrayMove(prevCards, activeIndex, overIndex);
          }),
        0
      );
    }

    const isOverAColumn = over.data.current?.type === "Column";

    if (isActiveACard && isOverAColumn) {
      setTimeout(
        () =>
          setCards((prevCards) => {
            const activeIndex = prevCards.findIndex(
              (card) => card.id === activeCardId
            );

            if (activeIndex === -1) return prevCards;

            prevCards[activeIndex].columnId = overId;

            return arrayMove(prevCards, activeIndex, activeIndex);
          }),
        0
      );
    }
  }

  return (
    <DndContext
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      sensors={sensors}
    >
      {children}
    </DndContext>
  );
};

export default KanbanDragAndDrop;
