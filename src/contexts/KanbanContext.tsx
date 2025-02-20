import { createContext, useContext, useMemo, useState } from "react";
import { ICard } from "types/Card";
import { IColumn } from "types/Columns";
import { IKanbanContext, IKanbanProviderProps } from "types/Kanban";

const KanbanContext = createContext<IKanbanContext | undefined>(undefined);

export const KanbanProvider = ({ children }: IKanbanProviderProps) => {
  const [columns, setColumns] = useState<IColumn[]>([]);
  const [cards, setCards] = useState<ICard[]>([]);
  const cardsIds = useMemo(() => {
    return cards.map((card) => card.id);
  }, [cards]);
  const columnsIds = useMemo(
    () => columns.map((column) => column.id),
    [columns]
  );

  return (
    <KanbanContext.Provider
      value={{
        cards,
        setCards,
        columns,
        setColumns,
        cardsIds,
        columnsIds,
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
