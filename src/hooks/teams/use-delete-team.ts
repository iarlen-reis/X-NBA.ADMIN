import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api";
import { toast } from "sonner";

export function useDeleteTeam() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (id: string) => {
      return api.delete("/teams/" + id);
    },
    onSuccess: () => {
      navigate("/teams");

      toast.success("Time excluido com sucesso!", {
        action: {
          label: "Fechar",
          onClick: () => toast.dismiss(),
        },
      });
    },
    onError: () => {
      toast.error("Ocorreu um erro ao excluir o time.", {
        description: "Por favor, tente novamente.",
        action: {
          label: "Fechar",
          onClick: () => toast.dismiss(),
        },
      });
    },
  });
}
