export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;

  children?: NavigationItem[];
}
export const NavigationItems: NavigationItem[] = [
  {
    id: 'navigation',
    title: 'Pages',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/auth/dashboard',
        icon: 'feather icon-home',
        classes: 'nav-item'
      },
      {
        id: 'bom',
        title: 'BOM',
        type: 'item',
        url: '/auth/bom',
        icon: 'feather icon-box',
        classes: 'nav-item'
      },
      {
        id: 'product-master',
        title: 'Product Master',
        type: 'item',
        url: '/auth/product-master',
        icon: 'feather icon-box',
        classes: 'nav-item'
      },
      {
        id: 'purchase-order',
        title: 'Purchase Order',
        type: 'item',
        url: '/auth/purchase-order',
        icon: 'feather icon-box',
        classes: 'nav-item'
      },
      {
        id: 'supplier-master',
        title: 'Supplier Master',
        type: 'item',
        url: '/auth/supplier-master',
        icon: 'feather icon-box',
        classes: 'nav-item'
      },
      {
        id: 'location-master',
        title: 'Location Master',
        type: 'item',
        url: '/auth/location-master',
        icon: 'feather icon-box',
        classes: 'nav-item'
      },
    ]
  }
];
