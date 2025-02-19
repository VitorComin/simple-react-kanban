import DeleteColumnButton from "components/DeleteColumnButton";
import EditColumnButton from "components/EditColumnButton";
import { useKanban } from "contexts/KanbanContext";
import { useRef, useState } from "react";
import { IColumnsHeaderContent } from "types/Columns";
import "react-toastify/dist/ReactToastify.css";
import { useToastMessages } from "utils/toastMessages";

const ColumnsHeaderContent: React.FC<IColumnsHeaderContent> = ({ column }) => {
  const { savedSuccessfullyMessage } = useToastMessages();
  const { setColumns } = useKanban();
  const [columnTitleReadOnly, setColumnTitleReadOnly] = useState(false);
  const columnTitleInputElementRef = useRef<HTMLInputElement | null>(null);
  const [newTitle, setNewTitle] = useState(column.title);

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewTitle(e.target.value);
  }

  function handleColumnReadOnlyAndSaveEdit() {
    setColumnTitleReadOnly(true);

    if (titleHasChanged()) {
      setColumns((prevColumns) =>
        prevColumns.map((col) =>
          col.id === column.id ? { ...col, title: newTitle } : col
        )
      );

      savedSuccessfullyMessage();
    }
  }

  function titleHasChanged() {
    return newTitle !== column.title;
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
