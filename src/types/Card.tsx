import { Dispatch, SetStateAction } from "react";

export type SetCards = Dispatch<SetStateAction<ICard[]>>;

export interface ICard {
  id: string;
  columnId: string;
  title: string;
}

export interface INewCardButton {
  columnId: string;
}

export interface ICards {
  card: ICard;
}

export interface IDeleteCardButton {
  currentCardId: string;
}

export interface ICardsContent {
  card: ICard;
}
