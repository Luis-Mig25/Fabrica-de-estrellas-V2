import { Link } from "react-router";

export const Info = () => {
  return (
    <main className="flex-col bg-slate-900 text-gray-100 min-h-screen w-full relative">
      <Link
        className="text-white  text-center rounded-2xl bg-blue-800 hover:bg-blue-600 transition-colors duration-100"
        to="/"
      >
        Volver al simulador
      </Link>
    </main>
  );
};
