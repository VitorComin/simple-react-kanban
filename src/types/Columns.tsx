import { Dispatch, ReactNode, SetStateAction } from "react";

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

export interface IColumnsHeaderContent {
  column: IColumn;
}

export interface IColumnDragAndDrop {
  column: IColumn;
  children: ReactNode;
}
