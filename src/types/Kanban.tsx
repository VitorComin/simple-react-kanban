import { Dispatch, ReactNode, SetStateAction } from "react";
import { ICard, SetCards } from "./Card";
import { IColumn, SetColumns } from "./Columns";

export interface IKanbanContext {
  cards: ICard[];
  setCards: SetCards;
  columns: IColumn[];
  setColumns: SetColumns;
  cardsIds: string[];
  columnsIds: string[];
  activeColumn: IColumn | null;
  setActiveColumn: Dispatch<SetStateAction<IColumn | null>>;
  activeCard: ICard | null;
  setActiveCard: Dispatch<SetStateAction<ICard | null>>;
}

export interface IKanbanProviderProps {
  children: ReactNode;
}

export interface IKanbanDragAndDrop {
  children: ReactNode;
}
