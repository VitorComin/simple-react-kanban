import React from "react";
import Columns from "./components/Columns/index";
// import { useTranslation } from "react-i18next";

function App() {
  // const { t, i18n } = useTranslation();

  return (
    <div className="kanban-container">
      <Columns />
      <Columns />
      <Columns />
      <Columns />
      <Columns />
      <Columns />
      <Columns />
      <Columns />
      <Columns />
      <Columns />
      <Columns />
    </div>
    // <div>
    //   <h1>{t("test")}</h1>
    //   <button onClick={() => i18n.changeLanguage("en")}>English</button>
    //   <button onClick={() => i18n.changeLanguage("pt")}>Português</button>
    // </div>
  );
}

export default App;
