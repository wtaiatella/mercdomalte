import { ReactNode } from "react";

export interface DataType {
  key: string;
  icon: ReactNode;
  title: string;
  name: string;
  size: number;
}

export interface FileType {
  id: string;
  icon: ReactNode;
  title: string;
  name: string;
  size: number;
}
