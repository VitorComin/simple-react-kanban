import React from "react";
import { DeleteIcon } from "../../assets/icons/Icons";

const Columns: React.FC = () => {
  return (
    <div className={"columns-container"}>
      <div className={"columns-header"}>
        <span className={"columns-title"}>Titulo</span>
        <div>
          <span>
            <DeleteIcon />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Columns;
