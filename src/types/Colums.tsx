import { Dispatch, SetStateAction } from "react";

type SetColumns = Dispatch<SetStateAction<string[]>>;

export interface Column {
  title: string;
  index: number;
  setColumns: SetColumns;
}

export interface NewColumnButton {
  setColumns: SetColumns;
}

export interface DeleteColumnButton {
  setColumns: SetColumns;
  currentColumnIndex: number;
}
