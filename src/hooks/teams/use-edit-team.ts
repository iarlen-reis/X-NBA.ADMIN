import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "sonner";

interface TeamProps {
  id: string;
  name: string;
  slug: string;
  city: string;
  stadium: string;
  country: string;
  league: string;
  coach: string;
}

export function useEditTeam() {
  return useMutation({
    mutationFn: (data: TeamProps) => {
      return api.put("/teams/" + data.id, data);
    },
    onSuccess: () => {
      toast.success("Time editado com sucesso!", {
        action: {
          label: "Fechar",
          onClick: () => toast.dismiss(),
        },
      });
    },
    onError: () => {
      toast.error("Ocorreu um erro ao editar o time.", {
        description: "Por favor, tente novamente.",
        action: {
          label: "Fechar",
          onClick: () => toast.dismiss(),
        },
      });
    },
  });
}
