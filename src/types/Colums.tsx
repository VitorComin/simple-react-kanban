import { Dispatch, SetStateAction } from "react";

type SetColumns = Dispatch<SetStateAction<IColumn[]>>;

export interface IColumn {
  id: string;
  title: string;
}

export interface IColumns {
  column: IColumn;
  setColumns: SetColumns;
}

export interface INewColumnButton {
  setColumns: SetColumns;
}

export interface IDeleteColumnButton {
  setColumns: SetColumns;
  currentColumnId: string;
}
