import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

interface TeamProps {
  id: string;
  name: string;
  slug: string;
}

interface PlayerProps {
  id: string;
  name: string;
  age: number;
  position: string;
  league: string;
  team: TeamProps;
  active: boolean;
}

export function useGetAllPlayers() {
  return useQuery<PlayerProps[]>({
    queryKey: ["players"],
    queryFn: async () => {
      const response = await api.get<PlayerProps[]>("/players");

      return response.data;
    },
  });
}
