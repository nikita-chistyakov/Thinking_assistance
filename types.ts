
export enum Sender {
  USER = 'USER',
  AI = 'AI',
}

export interface Message {
  id: string;
  text: string;
  sender: Sender;
}
