import DeleteColumnButton from "components/DeleteColumnButton";
import EditColumnButton from "components/EditColumnButton";
import { useKanban } from "contexts/KanbanContext";
import { useRef, useState } from "react";
import { IColumnsHeaderContent } from "types/Columns";

const ColumnsHeaderContent: React.FC<IColumnsHeaderContent> = ({ column }) => {
  const { setColumns } = useKanban();
  const [columnTitleReadOnly, setColumnTitleReadOnly] = useState(false);
  const columnTitleInputElementRef = useRef<HTMLInputElement | null>(null);
  const [newTitle, setNewTitle] = useState(column.title);

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewTitle(e.target.value);
  }

  function handleColumnReadOnlyAndSaveEdit() {
    setColumnTitleReadOnly(true);

    setColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.id === column.id ? { ...col, title: newTitle } : col
      )
    );
  }

  function setTitleEditableAndFocusIt() {
    setColumnTitleReadOnly(false);

    if (columnTitleInputElementRef.current) {
      columnTitleInputElementRef.current.focus();
    }
  }

  return (
    <>
      <input
        className="columns-title-input"
        readOnly={columnTitleReadOnly}
        value={newTitle}
        ref={columnTitleInputElementRef}
        onChange={handleTitleChange}
        onBlur={handleColumnReadOnlyAndSaveEdit}
      />

      <div>
        <EditColumnButton onClick={setTitleEditableAndFocusIt} />
        <DeleteColumnButton currentColumnId={column.id} />
      </div>
    </>
  );
};

export default ColumnsHeaderContent;
