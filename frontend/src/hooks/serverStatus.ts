import { useQuery } from "@tanstack/react-query";

async function checkServer() {
const response = await fetch(`${import.meta.env.VITE_API_URL ?? 'http://localhost:5254'}/api/todo`);  
if (!response.ok) throw new Error("Server offline");
  return true;
}

export function useServerStatus() {
const { isLoading, isError } = useQuery({
  queryKey: ["server-status"],
  queryFn: checkServer,
  retry: false,
  refetchInterval: 10000,
  refetchIntervalInBackground: true,
  retryOnMount: false,
});

  const status = isLoading ? 0 : isError ? 1 : 2;
  return { status };
}