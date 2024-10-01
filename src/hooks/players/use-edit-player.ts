import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "sonner";

interface PlayerProps {
  id: string;
  name: string;
  age: number;
  height: number;
  weight: number;
  position: string;
  league: string;
  team_id: string;
}

export function useEditPlayer() {
  return useMutation({
    mutationFn: (data: PlayerProps) => {
      return api.put("/players/" + data.id, data);
    },
    onSuccess: () => {
      toast.success("Jogador editado com sucesso!", {
        action: {
          label: "Fechar",
          onClick: () => toast.dismiss(),
        },
      });
    },
    onError: () => {
      toast.error("Ocorreu um erro ao editar o jogador.", {
        description: "Por favor, tente novamente.",
        action: {
          label: "Fechar",
          onClick: () => toast.dismiss(),
        },
      });
    },
  });
}
