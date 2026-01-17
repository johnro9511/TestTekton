import React, { useEffect, useState } from "react";
import { getLeaveRequests, updateLeaveStatus } from "../api/leaverequests";
import { LeaveRequest } from "../types/leave";
import { AuthProvider, useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const [requests, setRequests] = useState<LeaveRequest[]>([]);
  const [error, setError] = useState("");
  const { user } = useAuth();
  /* console.log("Emp DSH: "+ user?.name); */

  const statusClasses: Record<number, string> = {
    0: "bg-yellow-100 text-yellow-700",
    1: "bg-green-100 text-green-700",
    2: "bg-red-100 text-red-700",
  };

  const statusText: Record<number, string> = {
    0: "Pending",
    1: "Approved",
    2: "Rejected",
  };

  async function loadData() {
    try {
      setRequests(await getLeaveRequests());
    } catch {
      setError("Error loading leave requests");
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Leave Requests</h2>

      {error && <p className="text-red-600">{error}</p>}
      {requests.length === 0 && <p className="text-gray-500">No leave requests</p>}

      <div className="space-y-4">
        {requests.map((r) => (
          <div
            key={r.id}
            className="border rounded-lg p-4 shadow-sm bg-white"
          >
            <div className="flex justify-between">
              <div>
                <p className="font-semibold">
                  {r.employeeName}
                </p>
              </div>
              <div>
                <p className="font-semibold">
                  {r.startDate.slice(0, 10)} → {r.endDate.slice(0, 10)}
                </p>
                <p className="text-sm text-gray-600">{r.reason}</p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-sm font-medium
                  ${statusClasses[r.status]}
                `}
              >
                {statusText[r.status]}
              </span>
            </div>
            {user?.role === "Manager" && r.status === 0 && (
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => updateLeaveStatus(r.id, 1).then(loadData)}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Approve
                </button>

                <button
                  onClick={() => updateLeaveStatus(r.id, 2).then(loadData)}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
