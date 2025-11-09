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

export interface UpcomingTraining {
  id: number;
  title: string;
  participant_id: number;
  uuid_training_class: string;
  uuid_training_class_session: string;
  uuid_section: string;
  start_date: string;
}

export interface Training {
  id: string;
  title: string;
  start_date: string;
  progress_module: number;
  score: number;
  days: number;
  training: {
    data: {
      id: string;
      title: string;
      image_url: string;
      module_total: number;
    };
  };
}

type ModuleData = {
  id: string;
  title: string;
  subtitle: string;
  url_download_zip: string | null;
};

type SessionData = {
  id: string;
  class_date: string;
  score: number | null;
  progress_session: number;
  module: {
    data: ModuleData;
  };
};

export type TrainingProgramData = {
  id: string;
  title: string;
  start_date: string;
  progress_module: number;
  score: number;
  days: number;
  total_retry: number;
  total_max: number;
  training: {
    data: {
      id: string;
      title: string;
      image_url: string;
      module_total: number;
    };
  };
  sessions: {
    data: SessionData[];
  };
};

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

// export interface QuizChoice {
//   choice: string;
//   answer: boolean;
// }

// export interface QuizQuestion {
//   question: string;
//   choices: QuizChoice[];
// }

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

interface SectionData {
  id: string;
  title: string;
  type: "QUIZ" | "PDF" | "VIDEO";
  video_url: string | null;
  file_url: string;
  materials: {
    data: any[]; // Adjust based on the actual data structure
  };
  documents: {
    data: any[]; // Adjust based on the actual data structure
  };
  job_cards: {
    data: any[]; // Adjust based on the actual data structure
  };
}

// Define the type for the module data
interface ModuleDatas {
  id: string;
  title: string;
  subtitle: string;
  url_download_zip: string | null;
  sections: {
    data: SectionData[];
  };
}

// Define the type for the session data
export interface TrainingSessionData {
  id: string;
  class_date: string; // ISO date string
  score: number | null;
  progress_session: number;
  module: {
    data: ModuleDatas;
  };
}

interface Answer {
  id: string;
  answer: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  file_url: string | null;
  participant_answer: string | null;
  correct_answer: string | null;
  answers: {
    data: Answer[];
  };
}

export interface Stats {
  totalEarningHour: number;
  moduleComplete: number;
  webminarComplete: number;
  elearningComplete: number;
  certificationComplete: number;
}

export interface TrainingStats {
  category: string;
  session: number;
  percentage: number;
}

export interface LatestPerfomance {
  id: string;
  title: string;
  date: string;
}

export interface Score {
  label: string;
  value: number;
}

export interface ModuleScore {
  title: string;
  theory_percent: number;
  practical_percent: number;
}

export interface Certification {
  title: string;
  icon_url: string;
  download_url: string;
}
