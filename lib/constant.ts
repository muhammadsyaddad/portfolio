export type OutcomeParams = {
  outcomeText: string;
  projectTitle: string;
};

export type Project = {
  title: string;
  year: string;
  category: string;
  description: string;
  tech: string[];
  duration: string;
  role: string;
  challenge: string;
  solution?: string;
  outcome: string;
  link: string;
};

export type Projects = {
  [key: string]: Project; // key bisa "1", "2", dst
};