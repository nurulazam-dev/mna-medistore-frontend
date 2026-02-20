export interface ICategoryType {
  id?: string;
  name: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;

  medicines?: any[];
  _count?: {
    medicines: number;
  };
}
