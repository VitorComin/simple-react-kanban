import React from "react";
import { IColumns } from "types/Columns";
import { SortableContext } from "@dnd-kit/sortable";
import NewTaskButton from "components/NewTaskButton";
import Cards from "components/Cards";
import { useKanban } from "contexts/KanbanContext";
import ColumnDragAndDrop from "components/ColumnDragAndDrop";

const Columns: React.FC<IColumns> = ({ column }) => {
  const { cards, cardsIds } = useKanban();

  return (
    <ColumnDragAndDrop column={column}>
      <SortableContext items={cardsIds}>
        {cards
          .filter((card) => card.columnId === column.id)
          ?.map((card) => <Cards card={card} key={card.id} />)}
      </SortableContext>
      <NewTaskButton columnId={column.id} />
    </ColumnDragAndDrop>
  );
};

export default Columns;
