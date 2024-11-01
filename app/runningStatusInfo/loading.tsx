import { CircularProgress } from "@nextui-org/react";

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <CircularProgress
      aria-label="Loading..."
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    />
  );
}
