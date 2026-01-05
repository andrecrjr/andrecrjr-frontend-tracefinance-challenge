import { Sidebar } from "@/components/Sidebar";
import { Content } from "@/components/Content";

export default function Home() {
  return (
    <div className="flex min-h-screen bg-zinc-50 font-sans dark:bg-zinc-900">
      <Sidebar />
      <Content />
    </div>
  );
}
