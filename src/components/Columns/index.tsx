import React from "react";
import { IColumns } from "types/Colums";
import DeleteColumnButton from "components/DeleteColumnButton";

const Columns: React.FC<IColumns> = ({ title, index, setColumns }) => {
  return (
    <div className={"columns-container"}>
      <div className={"columns-header"}>
        <span className={"columns-title"}>{title}</span>
        <div>
          <DeleteColumnButton
            setColumns={setColumns}
            currentColumnIndex={index}
          />
        </div>
      </div>
    </div>
  );
};

export default Columns;
