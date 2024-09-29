import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { toast } from "sonner";

interface TeamProps {
  name: string;
  slug: string;
  city: string;
  stadium: string;
  country: string;
  league: string;
  coach: string;
}

export function useCreateTeam() {
  return useMutation({
    mutationFn: (data: TeamProps) => {
      return api.post("/teams", data);
    },
    onSuccess: () => {
      toast.success("Time criado com sucesso!", {
        action: {
          label: "Fechar",
          onClick: () => toast.dismiss(),
        },
      });
    },
    onError: () => {
      toast.error("Ocorreu um erro ao criar o time.", {
        description: "Por favor, tente novamente.",
        action: {
          label: "Fechar",
          onClick: () => toast.dismiss(),
        },
      });
    },
  });
}
