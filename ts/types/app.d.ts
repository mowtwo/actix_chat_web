import { Directive } from './directives/index';
export declare const createApp: (initialData?: any) => {
    directive(name: string, def?: Directive<Element> | undefined): Directive<Element> | any;
    mount(el?: string | Element | null | undefined): any | undefined;
    unmount(): void;
};
