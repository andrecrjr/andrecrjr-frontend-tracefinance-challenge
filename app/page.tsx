import { Sidebar } from "@/components/Sidebar";
import { Content } from "@/components/Content";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <Sidebar />
      <Content />
    </div>
  );
}
