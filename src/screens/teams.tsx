import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllTeams } from "@/hooks/teams/use-get-all-teams";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";

export default function Teams() {
  const { data: teams } = useGetAllTeams();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-medium">Gerencie os times</h1>
      <ul className="flex items-center justify-end gap-3">
        <li>
          <Link
            to="/teams/new"
            className="flex w-fit items-center gap-2 rounded bg-zinc-900 px-4 py-2 transition-opacity hover:opacity-85"
          >
            <IoMdAdd className="h-4 w-4 text-white" />
            <span className="text-sm text-white">Novo time</span>
          </Link>
        </li>
      </ul>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[180px]">ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>League</TableHead>
            <TableHead>Coach</TableHead>
            <TableHead className="text-right">Editar</TableHead>
            <TableHead className="text-right">Deletar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teams &&
            teams.map((team) => (
              <TableRow key={team.id}>
                <TableCell className="font-medium">{team.id}</TableCell>
                <TableCell>
                  <Link
                    to={`/teams/${team.id}`}
                    className="transition-opacity hover:opacity-85"
                  >
                    {team.name}
                  </Link>
                </TableCell>
                <TableCell>{team.league}</TableCell>
                <TableCell>{team.coach}</TableCell>
                <TableCell className="text-right">editar</TableCell>
                <TableCell className="text-right">deletar</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
