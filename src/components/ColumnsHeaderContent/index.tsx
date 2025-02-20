import DeleteColumnButton from "components/DeleteColumnButton";
import EditColumnButton from "components/EditColumnButton";
import { useKanban } from "contexts/KanbanContext";
import { useRef, useState } from "react";
import { IColumnsHeaderContent } from "types/Columns";
import "react-toastify/dist/ReactToastify.css";
import { useToastMessages } from "utils/toastMessages";
import { checkEnterKeyAndBlurElement } from "utils/checkEnterKeyAndBlurElement";

const ColumnsHeaderContent: React.FC<IColumnsHeaderContent> = ({ column }) => {
  const { savedSuccessfullyMessage } = useToastMessages();
  const { setColumns } = useKanban();
  const [columnTitleReadOnly, setColumnTitleReadOnly] = useState(false);
  const columnTitleInputElementRef = useRef<HTMLInputElement | null>(null);
  const [newColumnTitle, setNewColumnTitle] = useState(column.title);

  function handleColumnTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewColumnTitle(e.target.value);
  }

  function handleColumnReadOnlyAndSaveEdit() {
    setColumnTitleReadOnly(true);

    if (titleHasChanged()) {
      setColumns((prevColumns) =>
        prevColumns.map((col) =>
          col.id === column.id ? { ...col, title: newColumnTitle } : col
        )
      );

      savedSuccessfullyMessage();
    }
  }

  function titleHasChanged() {
    return newColumnTitle !== column.title;
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
        value={newColumnTitle}
        ref={columnTitleInputElementRef}
        onChange={handleColumnTitleChange}
        onBlur={handleColumnReadOnlyAndSaveEdit}
        onKeyDown={checkEnterKeyAndBlurElement}
      />
      <div>
        <EditColumnButton onClick={setTitleEditableAndFocusIt} />
        <DeleteColumnButton currentColumnId={column.id} />
      </div>
    </>
  );
};

export default ColumnsHeaderContent;
