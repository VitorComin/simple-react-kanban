import { KanbanProvider } from "contexts/KanbanContext";
import i18n from "i18n";
import KanbanBoard from "pages/KanbanBoard";
import Flag from "react-flagkit";

function App() {
  return (
    <KanbanProvider>
      <div className="language-buttons-container">
        <Flag
          size={32}
          country="BR"
          onClick={() => i18n.changeLanguage("pt")}
        />
        <Flag
          size={32}
          country="US"
          onClick={() => i18n.changeLanguage("en")}
        />
      </div>
      <KanbanBoard />
    </KanbanProvider>
  );
}

export default App;
