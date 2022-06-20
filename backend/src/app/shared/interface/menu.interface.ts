export interface Menu {
    title: string;
    path?: string;
    icon?: string;
    active?: boolean;
    type?: string;
    children?:Menu[];
}