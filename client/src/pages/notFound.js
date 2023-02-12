import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className="flex flex-col gap-5 items-center justify-center mt-52 text-3xl font-black text-center">
      <h1 className="text-error">404 Error!</h1>
      <p className="text-4xl">¯\_(ツ)_/¯</p>
      <p className="">The page your looking for does not exist.</p>
      <Link
        to="/templates"
        className="font-light text-2xl underline hover:text-gray-600"
      >
        Go back home
      </Link>
    </div>
  );
};
