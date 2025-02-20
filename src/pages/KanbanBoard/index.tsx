import { useEffect } from "react";
import NewColumnButton from "components/NewColumnButton";
import { DragOverlay } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import Columns from "components/Columns";
import Cards from "components/Cards";
import { useKanban } from "contexts/KanbanContext";
import { ToastContainer } from "react-toastify";
import KanbanDragAndDrop from "components/KanbanDragAndDrop";

const KanbanBoard: React.FC = () => {
  const { columns, columnsIds, activeColumn, activeCard } = useKanban();

  useEffect(() => {
    const handleVerticalAndHorizontalScroll = (event: WheelEvent) => {
      const target = event.target as HTMLElement;

      if (target.closest(".column-cards-list-container")) {
        const column = target.closest(
          ".column-cards-list-container"
        ) as HTMLElement;
        const columnIsWithVerticalOverflow =
          column.scrollHeight > column.clientHeight;

        if (columnIsWithVerticalOverflow) {
          return;
        }
      }

      event.preventDefault();
      const smoothFactor = 0.3;
      const delta = event.deltaY * smoothFactor;
      document.documentElement.scrollLeft += delta;
    };

    document.documentElement.addEventListener(
      "wheel",
      handleVerticalAndHorizontalScroll,
      {
        passive: false,
      }
    );

    return () => {
      document.documentElement.removeEventListener(
        "wheel",
        handleVerticalAndHorizontalScroll
      );
    };
  }, []);

  return (
    <KanbanDragAndDrop>
      <div className="kanban-container">
        <SortableContext items={columnsIds}>
          {columns.map((column) => (
            <Columns column={column} key={column.id} />
          ))}
        </SortableContext>
        <NewColumnButton />
      </div>
      {createPortal(
        <DragOverlay>
          {activeColumn && <Columns column={activeColumn} />}
          {activeCard && <Cards card={activeCard} />}
        </DragOverlay>,
        document.body
      )}
      <ToastContainer />
    </KanbanDragAndDrop>
  );
};

export default KanbanBoard;
