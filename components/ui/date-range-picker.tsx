import React from "react"

export function DatePickerWithRange({
  date,
  setDate,
}: {
  date: any
  setDate: (date: any) => void
}) {
  return (
    <input
      type="text"
      placeholder="Select date range"
      value={date || ""}
      onChange={e => setDate(e.target.value)}
    />
  );
}