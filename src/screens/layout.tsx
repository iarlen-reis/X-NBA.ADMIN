import Header from "@/components/header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const queryClient = new QueryClient();

  return (
    <div className="container mx-auto flex flex-col gap-6">
      <QueryClientProvider client={queryClient}>
        <Header />
        <Outlet />
      </QueryClientProvider>
    </div>
  );
}
