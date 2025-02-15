import { Dispatch, SetStateAction } from "react";

export interface IColumns {
  title: string;
  index: number;
  setColumns: Dispatch<SetStateAction<string[]>>;
}
