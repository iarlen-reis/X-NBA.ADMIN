import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

interface TeamProps {
  id: string;
  name: string;
  league: string;
  coach: string;
}

export function useGetAllTeams() {
  return useQuery<TeamProps[]>({
    queryKey: ["teams"],
    queryFn: async () => {
      const response = await api.get<TeamProps[]>("/teams");

      return response.data;
    },
  });
}
