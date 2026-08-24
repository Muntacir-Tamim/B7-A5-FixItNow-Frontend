"use client";

export default function TodayDate() {
  return (
    <>
      {new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      })}
    </>
  );
}
