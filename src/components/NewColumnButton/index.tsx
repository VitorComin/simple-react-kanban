import { WhiteAddIcon } from "assets/icons/Icons";
import { useKanban } from "contexts/KanbanContext";
import { useTranslation } from "react-i18next";

const NewColumnButton: React.FC = () => {
  const { t } = useTranslation();
  const { setColumns } = useKanban();

  function addColumn() {
    setColumns((prevColumns) => [
      ...prevColumns,
      { id: crypto.randomUUID(), title: t("new_column") },
    ]);
  }

  return (
    <button className="add-column-button" onClick={addColumn}>
      <WhiteAddIcon />
      <span>{t("add_column")}</span>
    </button>
  );
};

export default NewColumnButton;
