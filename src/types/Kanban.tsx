import { ReactNode } from "react";
import { ICard, SetCards } from "./Card";
import { IColumn, SetColumns } from "./Columns";

export interface IKanbanContext {
  cards: ICard[];
  setCards: SetCards;
  columns: IColumn[];
  setColumns: SetColumns;
  cardsIds: string[];
  columnsIds: string[];
}

export interface IKanbanProviderProps {
  children: ReactNode;
}
