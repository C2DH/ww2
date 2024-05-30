import { Link, useLocation } from "react-router-dom";

export default function CustomLink(props) {
  const location = useLocation();

  return <Link {...props} state={{ from: location.pathname }} className="block"/>
}