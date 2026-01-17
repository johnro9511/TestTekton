/* 0 = pendig | 1 = approved | 2 = rejected */
export type LeaveStatus = 0 | 1 | 2 ;

/* 0 = employee | 1 = manager */
export type Role = "Employee" | "Manager";

export interface LeaveRequest {
  id: number;
  employeeId: number;
  employeeName: string;
  startDate: string;
  endDate: string;
  status: LeaveStatus;
  reason: string;
  role: Role;
}