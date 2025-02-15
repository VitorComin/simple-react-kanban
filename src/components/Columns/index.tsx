import React from "react";
import { IColumns } from "types/Colums";
import DeleteColumnButton from "components/DeleteColumnButton";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Columns: React.FC<IColumns> = ({ column, setColumns }) => {
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
        <span className={"columns-title"}>{column.title}</span>
        <div>
          <DeleteColumnButton
            setColumns={setColumns}
            currentColumnId={column.id}
          />
        </div>
      </div>
    </div>
  );
};

export default Columns;
