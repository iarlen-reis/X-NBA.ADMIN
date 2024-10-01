import { Button } from "@/components/ui/button";
import Navigation from "@/components/navigation";
import { Link, useParams } from "react-router-dom";
import { useGetPlayer } from "@/hooks/players/use-get-player";

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
import { useDeletePlayer } from "@/hooks/players/use-delete-player";

export default function PlayerDetail() {
  const params = useParams();

  const {
    data: player,
    isPending,
    refetch,
  } = useGetPlayer(params.id as string);
  const { mutate: deletePlayer } = useDeletePlayer();

  const onDelete = () => {
    deletePlayer(player!.id);
    refetch();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-center">
        <Navigation
          link="/players"
          linkText="Jogadores"
          currentText={player?.name || ""}
        />
      </div>

      {!isPending && player && (
        <>
          <div className="flex flex-col items-center justify-center gap-1">
            <h1 className="text-xl font-medium">{player.name}</h1>
            <div className="flex flex-col items-center justify-center">
              <span className="text-sm uppercase text-zinc-700">
                {player.team.name}
              </span>
              <span className="text-sm uppercase text-zinc-700">
                {player.league}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <img
              alt=""
              className="w-[400px] rounded"
              src="https://p2.trrsf.com/image/fget/cf/774/0/images.terra.com/2024/08/19/1841284709-damiris-fever.png"
            />
          </div>
          <div className="flex flex-col items-center justify-center gap-2">
            <h2 className="text-lg font-medium">Informações</h2>
            <ul className="grid grid-cols-2 gap-x-10">
              <li>
                <span className="font-medium">Posição:</span> {player.position}
              </li>
              <li>
                <span className="font-medium">Peso:</span> {player.weight} kg
              </li>
              <li>
                <span className="font-medium">Idade:</span> {player.age} anos
              </li>
              <li>
                <span className="font-medium">Altura:</span> {player.height} m
              </li>
            </ul>
          </div>

          {player.average && (
            <div className="flex flex-col items-center justify-center gap-2">
              <h2 className="text-lg font-medium">Medias por partida</h2>
              <ul className="grid grid-cols-3 gap-x-10">
                <li>
                  <span className="mr-2 font-medium">Minutos:</span>
                  {player.average.min}
                </li>
                <li>
                  <span className="mr-2 font-medium">Pontos:</span>
                  {player.average.pts}
                </li>
                <li>
                  <span className="mr-2 font-medium">Rebotes:</span>
                  {player.average.reb}
                </li>
                <li>
                  <span className="mr-2 font-medium">Assistências:</span>
                  {player.average.ast}
                </li>
                <li>
                  <span className="mr-2 font-medium">Roubos:</span>
                  {player.average.stl}
                </li>
                <li>
                  <span className="mr-2 font-medium">Bloqueios:</span>
                  {player.average.blk}
                </li>
              </ul>
            </div>
          )}
          <div className="flex items-center justify-center gap-4">
            <Button asChild variant="outline">
              <Link to={`/players/${player.id}/edit`}>Editar</Link>
            </Button>

            {player.active ? (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Desativar</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Se confirmar, o jogador{" "}
                      <span className="font-bold">{player.name}</span> sera
                      desativado.
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
            ) : (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button>Ativar</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Se confirmar, o jogador{" "}
                      <span className="font-bold">{player.name}</span> sera
                      ativado.
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
            )}
          </div>
        </>
      )}
    </div>
  );
}
