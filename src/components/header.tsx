import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full py-2">
      <div className="container mx-auto">
        <Link
          to="/"
          className="text-xl font-bold transition-opacity hover:opacity-85"
        >
          X-NBA.ADMIN
        </Link>
      </div>
    </header>
  );
}
