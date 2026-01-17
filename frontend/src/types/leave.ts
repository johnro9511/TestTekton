export type LeaveStatus = 0 | 1 | 2 ;

export interface LeaveRequest {
  id: number;
  employeeId: number;
  startDate: string;
  endDate: string;
  status: LeaveStatus;
  reason: string;
}