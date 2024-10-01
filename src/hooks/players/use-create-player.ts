import { api } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

interface PlayerProps {
  name: string;
  age: number;
  height: number;
  weight: number;
  position: string;
  league: string;
  team_id: string;
}

export function useCreatePlayer() {
  return useMutation({
    mutationFn: async (data: PlayerProps) => {
      const response = await api.post("/players", data);

      return response.data;
    },
    onSuccess: () => {
      toast.success("Jogador criado com sucesso!", {
        action: {
          label: "Fechar",
          onClick: () => toast.dismiss(),
        },
      });
    },
    onError: () => {
      toast.error("Ocorreu um erro ao criar o jogador.", {
        description: "Por favor, tente novamente.",
        action: {
          label: "Fechar",
          onClick: () => toast.dismiss(),
        },
      });
    },
  });
}
