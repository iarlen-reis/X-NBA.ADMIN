import { TiArrowBackOutline } from "react-icons/ti";
import { Link } from "react-router-dom";

interface NavigationProps {
  link: string;
  linkText: string;
  currentText: string;
}

export default function Navigation({
  link,
  linkText,
  currentText,
}: NavigationProps) {
  return (
    <nav>
      <ul className="flex items-center gap-2">
        <li>
          <Link to={`${link}`} className="transition-opacity hover:opacity-85">
            {linkText}
          </Link>
        </li>
        <li>
          <TiArrowBackOutline />
        </li>
        <li className="font-semibold capitalize">{currentText}</li>
      </ul>
    </nav>
  );
}
