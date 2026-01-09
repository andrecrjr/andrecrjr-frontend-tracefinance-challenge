import { Content } from "@/components/Content";
import { Suspense } from "react";

import { LoadingPage } from "@/components/LoadingPage";

export default function Home() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Content />
    </Suspense>
  );
}
