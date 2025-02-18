import { createContext, useContext, useState } from "react";
import { ICard } from "types/Card";
import { IColumn } from "types/Columns";
import { IKanbanContext, IKanbanProviderProps } from "types/Kanban";

const KanbanContext = createContext<IKanbanContext | undefined>(undefined);

export const KanbanProvider = ({ children }: IKanbanProviderProps) => {
  const [columns, setColumns] = useState<IColumn[]>([]);
  const [cards, setCards] = useState<ICard[]>([]);

  return (
    <KanbanContext.Provider
      value={{
        cards,
        setCards,
        columns,
        setColumns,
      }}
    >
      {children}
    </KanbanContext.Provider>
  );
};

export const useKanban = (): IKanbanContext => {
  const context = useContext(KanbanContext);
  if (!context) {
    throw new Error("useKanban deve ser usado dentro de um KanbanProvider");
  }
  return context;
};
