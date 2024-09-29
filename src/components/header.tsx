import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full py-2">
      <div className="container mx-auto flex items-center justify-between">
        <Link
          to="/"
          className="text-xl font-bold transition-opacity hover:opacity-85"
        >
          X-NBA.ADMIN
        </Link>
        <nav>
          <ul className="flex items-center gap-3">
            <li className="transition-opacity hover:opacity-85">
              <Link to="/teams">Times</Link>
            </li>
            <li className="transition-opacity hover:opacity-85">
              <Link to="/players">Jogadores</Link>
            </li>
            <li className="transition-opacity hover:opacity-85">
              <Link to="/matches">Partidas</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
