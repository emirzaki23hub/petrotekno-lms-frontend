export interface NavItem {
  title: string;
  href: string;
  icon: any;
  color?: string;
  isChidren?: boolean;
  children?: NavItem[];
}

export type Webinar = {
  title: string;
  start_date: string;
  end_date: string;
  image_url: string;
  zoom_url: string;
};

export type Elearning = {
  title: string;
  slug: string;
  session_total: number;
  image_url: string;
  sessions: {
    data: Session[]; // Array of Session objects
  };
};

export type Session = {
  id: number;
  title: string;
  type: string; // "VIDEO", "PDF", etc.
  file_url: string; // URL to the file or resource
  read_at: string | null; // Date when the session was read, or null if not yet read
  video_url: string | null;
};

interface AgendaItem {
  time: string;
  activity: string;
}

export interface Agenda {
  [x: string]: any;
  date: string;
  agenda: AgendaItem[];
}

export interface Company {
  name: string;
  subdomain: string;
  logo_url: string;
}

export interface Training {
  id: number;
  module: number;
  periode: string;
  title: string;
  start_date: string;
}

export interface Module {
  id: number;
  title: string;
  subtitle: string;
  date: string;
  progress: number;
}

export interface BaseSection {
  title: string;
  type: string;
}

export interface PDFSection extends BaseSection {
  type: "PDF";
  link: string;
}

export interface QuizChoice {
  choice: string;
  answer: boolean;
}

export interface QuizQuestion {
  question: string;
  choices: QuizChoice[];
}

export interface QuizSection extends BaseSection {
  type: "QUIZ";
  data: QuizQuestion[];
}

export interface JobCardListItem {
  choice: string;
  actual?: number; // `actual` is optional because it only appears in `result` type lists
}

export interface JobCardTask {
  type: "list" | "result";
  task: string;
  list: JobCardListItem[];
}

export interface JobCardSection extends BaseSection {
  type: "JOB_CARD";
  data: JobCardTask[];
}

export interface TestSection extends BaseSection {
  type: "TEST";
  data: QuizQuestion[];
}

export type Section = PDFSection | QuizSection | JobCardSection | TestSection;
