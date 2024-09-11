import UpDateForm from "@/app/cartModify/components/upDateForm";
import { Suspense } from "react";
export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Suspense fallback={<p>Loading...</p>}>
        <UpDateForm />
      </Suspense>
    </main>
  );
}
