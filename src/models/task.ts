export interface Task {
  id: string;
  name: string;
  createdDate: Date;  
  startDate: Date;  
  endDate: Date;
  interval: Int32Array,
  done: boolean;
}
