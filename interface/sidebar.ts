export interface SubMenuItem {
    name: string;
    href: string;
}

export interface MenuItem {
    name: string;
    icon: React.ElementType;
    href?: string;
    subItems?: SubMenuItem[];
}

export interface MenuGroup {
    title: string;
    items: MenuItem[];
}
