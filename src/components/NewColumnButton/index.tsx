import { AddIcon } from "assets/icons/Icons";
import { useTranslation } from "react-i18next";
import { INewColumnButton } from "types/Colums";

const NewColumnButton: React.FC<INewColumnButton> = ({ setColumns }) => {
  const { t } = useTranslation();

  function addColumn() {
    setColumns((prevColumns) => [...prevColumns, t("new_column")]);
  }

  return (
    <button className="add-column-button" onClick={addColumn}>
      <AddIcon />
      <span>{t("add_column")}</span>
    </button>
  );
};

export default NewColumnButton;
