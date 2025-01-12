export interface OrderProps {
  id: string;
  table: number;
  name: string;
  status: boolean;
  draft: boolean;
  created_at: Date;
  updated_at: Date;
}
