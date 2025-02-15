import React from "react";
import { DeleteIcon } from "../../assets/icons/Icons";
import { IColumns } from "types/Colums";

const Columns: React.FC<IColumns> = ({ title, index, setColumns }) => {
  function removeColumn() {
    setColumns((prevColumns) =>
      prevColumns?.filter((_, columnIndex) => columnIndex !== index)
    );
  }

  return (
    <div className={"columns-container"}>
      <div className={"columns-header"}>
        <span className={"columns-title"}>{title}</span>
        <div>
          <button className={"remove-column-button"} onClick={removeColumn}>
            <DeleteIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Columns;
