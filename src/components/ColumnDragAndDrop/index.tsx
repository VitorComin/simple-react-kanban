import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ColumnsHeaderContent from "components/ColumnsHeaderContent";
import { IColumnDragAndDrop } from "types/Columns";

const ColumnDragAndDrop: React.FC<IColumnDragAndDrop> = ({
  children,
  column,
}) => {
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
        <ColumnsHeaderContent column={column} />
      </div>
      {children}
    </div>
  );
};

export default ColumnDragAndDrop;
