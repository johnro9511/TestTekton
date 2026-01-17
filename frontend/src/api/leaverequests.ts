import api from "./axios.ts";
import { LeaveRequest, LeaveStatus } from "../types/leave";

export async function getLeaveRequests(): Promise<LeaveRequest[]> {
  const response = await api.get<LeaveRequest[]>("/leaverequests");
  return response.data;
}

export async function createLeaveRequest(data: {
  startDate: string;
  endDate: string;
  reason: string;
}) {
  return api.post("/leaverequests", data);
}

export async function updateLeaveStatus(
  id: number,
  status: LeaveStatus
) {
  return api.put(`/leaverequests/${id}`, { status });
}

export async function deleteLeaveRequest(id: number) {
  return api.delete(`/leaverequests/${id}`);
}
