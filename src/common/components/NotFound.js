import { Link } from "react-router-dom";
import notfound from "../../assets/images/notfound.svg";
export function NotFound() {
  return (
    <div className="text-white min-h-screen flex flex-col  items-center md:justify-center">
      <img src={notfound} alt="404 not found" className="h-[30%] w-[30%]" />
      <p className="m-4">Page you were looking for is not found</p>
      <Link to="/">
        <p className="p-4 m-4 bg-blue-light rounded">Go Back to Homepage</p>
      </Link>
    </div>
  );
}
