export interface NavItem {
  title: string;
  href: string;
  icon: any;
  color?: string;
  isChidren?: boolean;
  children?: NavItem[];
}
