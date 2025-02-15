import { Dispatch, SetStateAction } from "react";

type SetColumns = Dispatch<SetStateAction<string[]>>;

export interface IColumns {
  title: string;
  index: number;
  setColumns: SetColumns;
}

export interface INewColumnButton {
  setColumns: SetColumns;
}

export interface IDeleteColumnButton {
  setColumns: SetColumns;
  currentColumnIndex: number;
}
