export type StandardCategory =
  | "All"
  | "School"
  | "High School"
  | "Higher Secondary"
  | "Engineering"
  | "Competitive";

export interface TuitionStandard {
  id: string;
  category: "School" | "High School" | "Higher Secondary" | "Engineering" | "Competitive";
  title: string;
  grade: string;
  boards: string;
  badge: string;
  popular?: boolean;
  topics: string[];
  schedule?: string;
  batchType?: string;
}
