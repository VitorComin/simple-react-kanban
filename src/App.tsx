import { KanbanProvider } from "contexts/KanbanContext";
import KanbanBoard from "pages/KanbanBoard";

function App() {
  return (
    <KanbanProvider>
      <KanbanBoard />
    </KanbanProvider>
    // <div>
    //   <h1>{t("test")}</h1>
    //   <button onClick={() => i18n.changeLanguage("en")}>English</button>
    //   <button onClick={() => i18n.changeLanguage("pt")}>Português</button>
    // </div>
  );
}

export default App;
