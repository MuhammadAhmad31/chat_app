export interface User {
  filter(arg0: (user: any) => boolean): unknown;
  id?: number;
  name: string;
}