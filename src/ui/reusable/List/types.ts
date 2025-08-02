import { IFormattedStripeProduct } from "@/lib/types/stripe";

export interface IListProps {
  initialData: IFormattedStripeProduct[];
  phrase?: string;
  limit?: number;
  isFetchMoreDisabled?: boolean;
  hasMore?: boolean;
  nextPage?: string | null;
}
