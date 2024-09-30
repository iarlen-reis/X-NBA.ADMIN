import { Link, useParams } from "react-router-dom";
import { useGetTeam } from "@/hooks/teams/use-get-team";
import Navigation from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { useDeleteTeam } from "@/hooks/teams/use-delete-team";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function TeamDetail() {
  const params = useParams();
  const { data: team } = useGetTeam(params.id as string);
  const { mutate: deleteTeam } = useDeleteTeam();

  const onDelete = () => {
    deleteTeam(team!.id);
  };

  return (
    <div className="flex flex-col gap-6">
      <Navigation
        link="/teams"
        linkText="Times"
        currentText={team?.name || "Não encontrado"}
      />
      {team && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col items-center justify-center gap-1">
            <h1 className="text-2xl font-medium">{team.name}</h1>
            <span className="text-sm uppercase text-zinc-700">{team.slug}</span>
          </div>
          <div className="flex items-center justify-center">
            <ul className="grid grid-cols-2 gap-x-10 text-center">
              <li className="text-sm">
                <span className="font-medium">City:</span> {team.city}
              </li>
              <li className="text-sm">
                <span className="font-medium">Country:</span> {team.country}
              </li>
              <li className="text-sm">
                <span className="font-medium">Stadium:</span> {team.stadium}
              </li>
              <li className="text-sm">
                <span className="font-medium">Coach:</span> {team.coach}
              </li>
            </ul>
          </div>
          <div className="flex items-center justify-center gap-4">
            <Button variant="outline" asChild>
              <Link to={`/teams/${team.id}/edit`}>Editar</Link>
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Deletar</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Se confirmar, o time{" "}
                    <span className="font-bold">{team.name}</span> sera
                    excluido.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={onDelete}>
                    Confirmar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      )}
    </div>
  );
}
