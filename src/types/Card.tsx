import { Dispatch, SetStateAction } from "react";

type SetCards = Dispatch<SetStateAction<ICard[]>>;

export interface ICard {
  id: string;
  columnId: string;
  title: string;
}

export interface INewCardButton {
  setCards: SetCards;
  columnId: string;
}

export interface ICards {
  card: ICard;
  setCards: SetCards;
}
