import { Link } from "react-router";
import ReactMarkdown from "react-markdown";
import investigacion from "../markdown/Investigacion.md?raw";
import { StarParticles } from "../components/StarParticles";

export const Info = () => {
  return (
    <main className="flex-col bg-slate-900 p-10 pt-15 pb-30 text-gray-100 min-h-screen w-full relative">
      <Link
        className="text-white fixed top-2 right-2 p-2 text-center rounded-2xl bg-blue-800 hover:bg-blue-600 transition-colors duration-100"
        to="/"
      >
        Volver al simulador
      </Link>

      <div className="fixed flex items-center gap-2 bottom-5 right-2">
        <img className="h-20 rounded-full" src="/assets/SemilleroLogo.png" alt="SemilleroLogo" />
        <img
          className="h-20"
          src="/assets/EscudoMaria.png"
          alt="EscudoMaria"
        />
      </div>

      <StarParticles particles={30} />
      <article className="prose prose-invert prose-amber max-w-3xl w-full">
        <ReactMarkdown>{investigacion}</ReactMarkdown>
      </article>
    </main>
  );
};
