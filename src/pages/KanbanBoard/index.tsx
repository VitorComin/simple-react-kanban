import { useEffect, useMemo, useState } from "react";
import NewColumnButton from "components/NewColumnButton";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { IColumn } from "types/Colums";
import { createPortal } from "react-dom";
import Columns from "components/Columns";
import { ICard } from "types/Card";
import Cards from "components/Cards";

const KanbanBoard: React.FC = () => {
  const [columns, setColumns] = useState<IColumn[]>([]);
  const [cards, setCards] = useState<ICard[]>([]);
  const [activeColumn, setActiveColumn] = useState<IColumn | null>(null);
  const [activeCard, setActiveCard] = useState<ICard | null>(null);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      const target = event.target as HTMLElement;

      if (target.closest(".columns-container")) {
        const column = target.closest(".columns-container") as HTMLElement;

        if (column.scrollHeight > column.clientHeight) {
          return;
        }
      }

      event.preventDefault();

      const smoothFactor = 0.001;
      const delta = event.deltaY * smoothFactor;

      document.documentElement.scrollLeft += delta;
    };

    document.documentElement.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    return () => {
      document.documentElement.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const columnsIds = useMemo(
    () => columns.map((column) => column.id),
    [columns]
  );
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

    const isActiveATask = active.data.current?.type === "Card";
    const isOverATask = active.data.current?.type === "Card";

    if (!isActiveATask) return;

    if (isActiveATask && isOverATask) {
      setCards((prevCards) => {
        const activeIndex = prevCards.findIndex(
          (card) => card.id === activeCardId
        );
        const overIndex = prevCards.findIndex((card) => card.id === overId);

        if (prevCards[overIndex]?.columnId) {
          prevCards[activeIndex].columnId = prevCards[overIndex].columnId;
        }

        return arrayMove(prevCards, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    if (isActiveATask && isOverAColumn) {
      setCards((prevCards) => {
        const activeIndex = prevCards.findIndex(
          (card) => card.id === activeCardId
        );

        prevCards[activeIndex].columnId = overId;

        return arrayMove(prevCards, activeIndex, activeIndex);
      });
    }
  }

  return (
    <DndContext
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      sensors={sensors}
    >
      <div className="kanban-container">
        <SortableContext items={columnsIds}>
          {columns.map((column) => (
            <Columns
              column={column}
              key={column.id}
              setColumns={setColumns}
              cards={cards}
              setCards={setCards}
            />
          ))}
        </SortableContext>
        <NewColumnButton setColumns={setColumns} />
      </div>
      {createPortal(
        <DragOverlay>
          {activeColumn && (
            <Columns
              column={activeColumn}
              setColumns={setColumns}
              cards={cards}
              setCards={setCards}
            />
          )}
          {activeCard && <Cards card={activeCard} setCards={setCards} />}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
};

export default KanbanBoard;
