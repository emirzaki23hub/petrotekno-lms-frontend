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
