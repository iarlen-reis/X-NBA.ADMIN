import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

interface TeamProps {
  id: string;
  name: string;
  slug: string;
  league: string;
  coach: string;
  city: string;
  stadium: string;
  country: string;
}

export function useGetTeam(id: string) {
  return useQuery<TeamProps>({
    queryKey: ["team", id],
    queryFn: async () => {
      const response = await api.get<TeamProps>("/teams/" + id);

      return response.data;
    },
  });
}
