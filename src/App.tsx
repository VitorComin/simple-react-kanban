import { useMemo, useState } from "react";
import Columns from "./components/Columns/index";
import NewColumnButton from "components/NewColumnButton";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { IColumn } from "types/Colums";
import { createPortal } from "react-dom";

function App() {
  const [columns, setColumns] = useState<IColumn[]>([]);
  const [activeColumn, setActiveColumn] = useState<IColumn | null>(null);
  const columnsIds = useMemo(
    () => columns.map((column) => column.id),
    [columns]
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 50,
      },
    })
  );

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
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

  return (
    <DndContext
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      sensors={sensors}
    >
      <div className="kanban-container">
        <SortableContext items={columnsIds}>
          {columns.map((column) => (
            <Columns column={column} key={column.id} setColumns={setColumns} />
          ))}
        </SortableContext>
        <NewColumnButton setColumns={setColumns} />
      </div>
      {createPortal(
        <DragOverlay>
          {activeColumn && (
            <Columns column={activeColumn} setColumns={setColumns} />
          )}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
    // <div>
    //   <h1>{t("test")}</h1>
    //   <button onClick={() => i18n.changeLanguage("en")}>English</button>
    //   <button onClick={() => i18n.changeLanguage("pt")}>Português</button>
    // </div>
  );
}

export default App;
