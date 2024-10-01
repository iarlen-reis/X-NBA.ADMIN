import { api } from "@/lib/api";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeletePlayer() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      return await api.delete("/players/" + id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["player"],
      });

      queryClient.invalidateQueries({
        queryKey: ["players"],
      });

      toast.success("Jogador alterado com sucesso!", {
        action: {
          label: "Fechar",
          onClick: () => toast.dismiss(),
        },
      });
    },
    onError: () => {
      toast.error("Ocorreu um erro ao desativar o jogador.", {
        description: "Por favor, tente novamente.",
        action: {
          label: "Fechar",
          onClick: () => toast.dismiss(),
        },
      });
    },
  });
}
