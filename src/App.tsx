// import React from "react";
import { useState } from "react";
import Columns from "./components/Columns/index";
// import { useTranslation } from "react-i18next";

function App() {
  const [columns, setColumns] = useState(["Coluna 1"]);
  // const { t, i18n } = useTranslation();

  return (
    <div className="kanban-container">
      {columns.map((columnTitle, index) => (
        <Columns
          title={columnTitle}
          key={index}
          index={index}
          setColumns={setColumns}
        />
      ))}
    </div>
    // <div>
    //   <h1>{t("test")}</h1>
    //   <button onClick={() => i18n.changeLanguage("en")}>English</button>
    //   <button onClick={() => i18n.changeLanguage("pt")}>Português</button>
    // </div>
  );
}

export default App;
