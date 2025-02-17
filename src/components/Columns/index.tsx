import React, { useState } from "react";
import { IColumns } from "types/Colums";
import DeleteColumnButton from "components/DeleteColumnButton";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import NewTaskButton from "components/NewTaskButton";
import { ICard } from "types/Card";
import Cards from "components/Cards";

const Columns: React.FC<IColumns> = ({ column, setColumns }) => {
  const [cards, setCards] = useState<ICard[]>([]);
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
      {cards.map((card) => (
        <Cards card={card} setCards={setCards} />
      ))}
      <NewTaskButton columnId={column.id} setCards={setCards} />
    </div>
  );
};

export default Columns;
