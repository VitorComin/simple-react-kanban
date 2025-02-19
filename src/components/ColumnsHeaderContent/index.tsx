import DeleteColumnButton from "components/DeleteColumnButton";
import EditColumnButton from "components/EditColumnButton";
import { useKanban } from "contexts/KanbanContext";
import { useRef, useState } from "react";
import { IColumnsHeaderContent } from "types/Columns";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

const ColumnsHeaderContent: React.FC<IColumnsHeaderContent> = ({ column }) => {
  const { t } = useTranslation();
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

    //Colocar em um util a parte
    toast.success(t("saved_successfully"), {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
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
