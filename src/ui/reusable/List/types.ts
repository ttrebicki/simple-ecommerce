import { IProduct } from "@/lib/types/product";

export interface IListProps {
  initialData: IProduct[];
  phrase?: string;
  limit?: number;
  isFetchMoreDisabled?: boolean;
}
