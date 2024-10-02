import { Skeleton, Card, CircularProgress } from "@nextui-org/react";

export default function Loading() {
  return (
    <section>
      <Skeleton className="w-1/5 rounded-lg mb-5">
        <div className="h-4 w-1/5 rounded-lg bg-default-200"></div>
      </Skeleton>

      <Skeleton className="rounded-lg mb-5">
        <div className="h-14 rounded-lg bg-default-300"></div>
      </Skeleton>

      <div className="flex items-center justify-center h-dvh">
        <CircularProgress />
      </div>
    </section>
  );
}
