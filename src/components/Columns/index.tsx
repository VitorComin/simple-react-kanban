import React, { useEffect, useMemo } from "react";
import { IColumns } from "types/Columns";
import DeleteColumnButton from "components/DeleteColumnButton";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import NewTaskButton from "components/NewTaskButton";
import Cards from "components/Cards";
import { useKanban } from "contexts/KanbanContext";
import ColumnsHeaderContent from "components/ColumnsHeaderContent";

const Columns: React.FC<IColumns> = ({ column }) => {
  const { cards } = useKanban();

  const cardsIds = useMemo(() => {
    return cards.map((card) => card.id);
  }, [cards]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    resizeObserverConfig: {
      disabled: true,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      const target = event.target as HTMLElement;
      const column = target.closest(".columns-container") as HTMLElement | null;

      if (column) {
        const isScrollable = column.scrollHeight > column.clientHeight;
        const canScrollUp = column.scrollTop > 0;
        const canScrollDown =
          column.scrollTop + column.clientHeight < column.scrollHeight;

        if (isScrollable && (canScrollUp || canScrollDown)) {
          return;
        }
      }

      event.preventDefault();
      const smoothFactor = 0.3;
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

  if (isDragging) {
    return (
      <div
        className={"column-container-while-dragging"}
        ref={setNodeRef}
        style={style}
      ></div>
    );
  }

  return (
    <div className={"columns-container"} ref={setNodeRef} style={style}>
      <div className={"columns-header"} {...attributes} {...listeners}>
        <ColumnsHeaderContent column={column} />
      </div>
      <SortableContext items={cardsIds}>
        {cards
          .filter((card) => card.columnId === column.id)
          ?.map((card) => <Cards card={card} key={card.id} />)}
      </SortableContext>
      <NewTaskButton columnId={column.id} />
    </div>
  );
};

export default Columns;
