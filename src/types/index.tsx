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
