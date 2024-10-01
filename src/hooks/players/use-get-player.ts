import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

interface TeamProps {
  id: string;
  name: string;
  slug: string;
}
interface AverageProps {
  id: string;
  min: number;
  pts: number;
  reb: number;
  ast: number;
  stl: number;
  blk: number;
}
interface PlayerProps {
  id: string;
  name: string;
  age: number;
  position: string;
  league: string;
  team: TeamProps;
  height: number;
  weight: number;
  active: boolean;
  average: AverageProps;
}

export function useGetPlayer(id: string) {
  return useQuery<PlayerProps>({
    queryKey: ["player", id],
    queryFn: async () => {
      const response = await api.get<PlayerProps>(`/players/${id}`);

      return response.data;
    },
  });
}
