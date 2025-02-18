import { Dispatch, SetStateAction } from "react";
import { ICard, SetCards } from "./Card";

type SetColumns = Dispatch<SetStateAction<IColumn[]>>;

export interface IColumn {
  id: string;
  title: string;
}

export interface IColumns {
  column: IColumn;
  setColumns: SetColumns;
  cards: ICard[];
  setCards: SetCards;
}

export interface INewColumnButton {
  setColumns: SetColumns;
}

export interface IDeleteColumnButton {
  setColumns: SetColumns;
  setCards: SetCards;
  currentColumnId: string;
}
