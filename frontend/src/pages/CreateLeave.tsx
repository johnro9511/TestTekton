import React, { useState } from "react";
import { createLeaveRequest } from "../api/leaverequests";

export default function CreateLeave() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await createLeaveRequest({ startDate, endDate, reason });
      setSuccess("Leave request created successfully");
      setStartDate("");
      setEndDate("");
      setReason("");
    } catch (err: any) {
      setError(err.response?.data?.error ?? "Error creating request");
    }
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded-lg mt-6">
      <h2 className="text-xl font-bold mb-4">Create Leave Request</h2>

      {error && <p className="text-red-600 mb-2">{error}</p>}
      {success && <p className="text-green-600 mb-2">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="date"
          className="w-full border rounded px-3 py-2"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />

        <input
          type="date"
          className="w-full border rounded px-3 py-2"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />

        <input
          placeholder="Reason"
          className="w-full border rounded px-3 py-2"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
