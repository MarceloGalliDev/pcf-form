export type Item = {
  id: number;
  inputOne: string;
  inputTwo: number;
};

export type Delete = {
  onDelete: () => void;
}