import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDeletePlayer } from "@/hooks/players/use-delete-player";
import { useGetAllPlayers } from "@/hooks/players/use-get-all-players";
import { convertStatus } from "@/utils/convert-status";

import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";

export default function Players() {
  const { data: players } = useGetAllPlayers();
  const { mutate: deletePlayer } = useDeletePlayer();

  const onDelete = (id: string) => {
    deletePlayer(id);
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-medium">Gerencie os jogadores</h1>
      <ul className="flex items-center justify-end gap-3">
        <li>
          <Link
            to="/players/new"
            className="flex w-fit items-center gap-2 rounded bg-zinc-900 px-4 py-2 transition-opacity hover:opacity-85"
          >
            <IoMdAdd className="h-4 w-4 text-white" />
            <span className="text-sm text-white">Novo jogador</span>
          </Link>
        </li>
      </ul>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[180px]">ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Ativo</TableHead>
            <TableHead>Idade</TableHead>
            <TableHead>Posição</TableHead>
            <TableHead>League</TableHead>
            <TableHead>Equipe</TableHead>
            <TableHead className="text-right">Editar</TableHead>
            <TableHead className="text-right">Deletar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {players &&
            players.map((player) => (
              <TableRow key={player.id}>
                <TableCell className="font-medium">{player.id}</TableCell>
                <TableCell>
                  <Link
                    to={`/players/${player.id}`}
                    className="transition-opacity hover:opacity-85"
                  >
                    {player.name}
                  </Link>
                </TableCell>
                <TableCell>{convertStatus(player.active)}</TableCell>
                <TableCell>{player.age}</TableCell>
                <TableCell>{player.position}</TableCell>
                <TableCell>{player.league}</TableCell>
                <TableCell>{player.team.name}</TableCell>
                <TableCell className="text-right">
                  <Link
                    to={`/players/${player.id}/edit`}
                    className="transition-opacity hover:opacity-85"
                  >
                    editar
                  </Link>
                </TableCell>
                <TableCell className="text-right">
                  <button
                    onClick={() => onDelete(player.id)}
                    className="transition-opacity hover:opacity-85"
                  >
                    {player.active ? "desativar" : "ativar"}
                  </button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
