export type Category = {
  id: number;
  name: string;
}[];
export type Quiz = {
  id: number;
  questions: {
    question: string;
    firstOption: string;
    secondOption: string;
    thirdOption: string;
    answer: string;
  }[];
};
