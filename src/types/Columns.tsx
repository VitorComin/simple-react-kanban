import { Dispatch, SetStateAction } from "react";

export type SetColumns = Dispatch<SetStateAction<IColumn[]>>;

export interface IColumn {
  id: string;
  title: string;
}

export interface IColumns {
  column: IColumn;
}

export interface IDeleteColumnButton {
  currentColumnId: string;
}
