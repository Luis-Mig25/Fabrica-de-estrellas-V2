import clsx from "clsx";
import { StarParticles } from "../components/StarParticles";
import { Sparkles, Telescope } from "lucide-react";
import { StarInteriorParticles } from "../components/StarInteriorParticles";
import { useState } from "react";
import { Link } from "react-router";

const STAR_COLORS = [
  { name: "Enana Roja", minTemp: 2000, maxTemp: 3700, color: "#ff3b1d" },
  { name: "Enana Naranja", minTemp: 3700, maxTemp: 5200, color: "#ff8e3c" },
  { name: "Amarilla (Sol)", minTemp: 5200, maxTemp: 6000, color: "#ffe875" },
  { name: "Blanco-Amarilla", minTemp: 6000, maxTemp: 7500, color: "#f3f6ff" },
  { name: "Blanca", minTemp: 7500, maxTemp: 10000, color: "#cadcff" },
  { name: "Azul-Blanca", minTemp: 10000, maxTemp: 30000, color: "#a0c0ff" },
  { name: "Gigante Azul", minTemp: 30000, maxTemp: 50000, color: "#5599ff" },
];

const TELESCOPES = [
  {
    id: "human",
    name: "Ojo Humano",
    spectrum: "Visible",
    img: "/assets/ojo-humano.svg",
  },
  {
    id: "jwst",
    name: "James Webb",
    spectrum: "Infrarrojo",
    img: "/assets/james-webb.svg",
  },
  {
    id: "hubble",
    name: "Hubble",
    spectrum: "Ultravioleta",
    img: "/assets/hubble.svg",
  },
  {
    id: "chandra",
    name: "Chandra",
    spectrum: "Rayos X",
    img: "/assets/chandra.svg",
  },
];

const SPECTRUM_POSITIONS: Record<string, { label: string; percent: string }> = {
  jwst: { label: "Infrarrojo", percent: "30%" },
  human: { label: "Visible", percent: "50%" },
  hubble: { label: "Ultravioleta", percent: "70%" },
  chandra: { label: "Rayos X", percent: "88%" },
};

export const SimulationPanel = () => {
  const [starTemp, setStarTemp] = useState(5200);
  const [distancia, setDistancia] = useState(0);
  const [telescope, setTelescope] = useState("human");

  const getBaseStarProps = (temp: number) => {
    const colorReal = STAR_COLORS.find(
      (color) => temp >= color.minTemp && temp <= color.maxTemp,
    );
    return {
      colorReal: colorReal ? colorReal.color : "#ffe875",
      tipo: colorReal?.name,
    };
  };

  const baseColor = getBaseStarProps(starTemp).colorReal;
  const tipoStar = getBaseStarProps(starTemp).tipo;

  const getTelescopeVisuals = (
    temp: number,
    baseHex: string,
    currentTelescope: string,
  ) => {
    switch (currentTelescope) {
      case "jwst":
        return {
          displayColor: temp < 6000 ? "#ffffff" : "#ff4500",
          filter: "saturate(1.5) contrast(1.2)",
          opacity: temp > 30000 ? 3 : 1, // Las gigantes azules casi no emiten IR
          spikes: 6, // El Webb tiene 6 picos
          starsVisible: 600,
        };
      case "hubble": // Ultravioleta: Estrellas calientes brillan extremo. Mapeo a púrpuras/azules.
        return {
          displayColor: temp > 10000 ? "#ffffff" : "#6b21a8", // Lo caliente es blanco en UV
          filter: "hue-rotate(-45deg) saturate(2)",
          opacity: temp < 4000 ? 1 : 4, // Las enanas rojas casi no se ven en UV
          spikes: 4, // El Hubble tiene 4 picos
          starsVisible: 400,
        };
      case "chandra": // Rayos X: Solo se ve el plasma extremo y coronas muy calientes.
        return {
          displayColor: temp > 20000 ? "#B992F0" : "#7F00FF", // Cian brillante para lo más caliente
          filter: "contrast(2)",
          opacity: temp < 10000 ? 0.8 : 1.3, // Casi invisible a menos que sea muy masiva
          spikes: 0, // Los detectores de Rayos X no suelen generar flares de lente cruzados
          starsVisible: 250,
        };
      default: // Ojo Humano / Visible
        return {
          displayColor: baseHex,
          filter: "none",
          opacity: 1,
          spikes: 4, // Flare estándar de 4 puntas
          starsVisible: 150,
        };
    }
  };

  const optics = getTelescopeVisuals(starTemp, baseColor, telescope);
  const displayColor = optics.displayColor;

  const MIN_SCALE = 0.05;
  const MAX_SCALE = 1.5;
  const distRatio = distancia / 100;
  const starScale = MAX_SCALE - distRatio * (MAX_SCALE - MIN_SCALE);
  const flareOpacity = Math.max(0, (distancia - 80) / 20) * optics.opacity;

  return (
    <main
      className={clsx(
        "grid gap-3 p-2 bg-slate-900 text-gray-300 font-mono text-2xl h-screen w-full",
        "grid-cols-1 grid-rows-[300px_auto] [grid-template-areas:'main''side']",
        "md:grid-cols-[300px_1fr_1fr] md:grid-rows-1 md:[grid-template-areas:'side_main_main']",
      )}
    >
      <aside className="[grid-area:side] z-10 bg-slate-800 overflow-y-auto scrollbar-thumb-slate-700 scrollbar-track-transparent border border-slate-700 rounded-2xl p-4 flex flex-col gap-6 w-full overflow-hidden">
        <header className="flex flex-col items-center gap-1">
          <Sparkles
            className="w-10 h-10 transition-colors duration-500"
            style={{ color: displayColor }}
          />
          <h1 className="font-black capitalize text-center text-xl">
            Fábrica de estrellas
          </h1>
        </header>

        <div className="w-full flex flex-col gap-2">
          <span className="text-sm text-slate-400 font-bold text-center flex items-center justify-center gap-2">
            <Telescope size={16} /> Lente / Espectro
          </span>
          <div className="grid grid-cols-2 gap-2">
            {TELESCOPES.map((tel) => (
              <button
                key={tel.id}
                onClick={() => setTelescope(tel.id)}
                className={clsx(
                  "flex flex-col items-center justify-center p-2 rounded-lg text-xs font-bold transition-all border",
                  telescope === tel.id
                    ? "bg-slate-700 border-amber-400 text-white shadow-[0_0_10px_rgba(251,191,36,0.3)]"
                    : "bg-slate-900 border-slate-700 text-slate-500 hover:border-slate-500",
                )}
              >
                <img
                  className="text-white"
                  color="white"
                  src={tel.img}
                  alt={tel.name}
                />
                {tel.name}
                <span className="text-[10px] font-normal opacity-70">
                  {tel.spectrum}
                </span>
              </button>
            ))}
          </div>
          {/* Barra del espectro */}
          <div className="w-full flex flex-col gap-1.5 mt-2 p-2 bg-slate-900/60 rounded-xl border border-slate-700/50">
            <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold px-1">
              <span>Ondas Largas</span>
              <span className="text-amber-400">
                {SPECTRUM_POSITIONS[telescope]?.label}
              </span>
              <span>Ondas Cortas</span>
            </div>

            <div
              className="relative h-3 w-full rounded-full overflow-visible"
              style={{
                background:
                  "linear-gradient(90deg, #7f1d1d 0%, #ef4444 20%, #f59e0b 40%, #22c55e 55%, #3b82f6 70%, #9333ea 85%, #312e81 100%)",
              }}
            >
              {/* Marcador del Telescopio Seleccionado */}
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-white border-2 border-slate-900 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-500 ease-out z-10"
                style={{ left: SPECTRUM_POSITIONS[telescope]?.percent }}
              />
            </div>

            {/* Marcas de referencia */}
            <div className="flex justify-between text-[8px] text-slate-500 px-0.5 pt-0.5">
              <span>IR</span>
              <span>Vis</span>
              <span>UV</span>
              <span>Rx</span>
            </div>
          </div>
        </div>

        <div className="w-full gap-8 flex flex-col px-2 mt-4 border-t border-slate-700 pt-6">
          <label className="flex flex-col gap-1 w-full items-center">
            <span className="text-sm text-slate-400 font-bold block text-center">
              Temperatura
            </span>
            <input
              type="range"
              min={2000}
              max={50000}
              step={100}
              value={starTemp}
              onChange={(e) => setStarTemp(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
            <span
              key={starTemp}
              className="text-3xl font-black tracking-wider block mt-2 transition-colors duration-500"
              style={{ color: baseColor }}
            >
              {starTemp} <span className="text-md text-slate-500">K</span>
            </span>
            <p key={tipoStar} className="text-sm text-slate-400">
              Tipo: {tipoStar}
            </p>
          </label>

          <label className="flex flex-col gap-1 w-full items-center">
            <span className="text-sm text-slate-400 font-bold block text-center">
              Distancia
            </span>
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={distancia}
              onChange={(e) => setDistancia(Number(e.target.value))}
              className="w-full accent-blue-800 cursor-pointer"
            />
            <span key={distancia}>{distancia} u.A</span>
          </label>

          <h3 className="text-[20px] text-center">
            ¿Quieres conocer mas sobre nuestra investigación?
          </h3>
          <Link
            className="text-white  text-center rounded-2xl bg-blue-800 hover:bg-blue-600 transition-colors duration-100"
            to={"about"}
          >
            Conoce más
          </Link>
        </div>
      </aside>

      <section className="[grid-area:main] bg-slate-950 relative border place-content-center place-items-center border-slate-500/30 rounded-2xl overflow-hidden flex items-center justify-center">
        <StarParticles
          key={optics.starsVisible}
          particles={optics?.starsVisible}
        />

        {/* ESTRELLA */}
        <div
          className="relative h-48 w-48 group transition-all duration-700 ease-out z-10"
          style={{
            transform: `scale(${starScale})`,
            opacity: optics.opacity, // Desvanece la estrella si el telescopio no puede ver esta temperatura
            filter: optics.filter, // Aplica los ajustes de contraste/saturación del espectro
          }}
        >
          <div
            className="absolute inset-0 rounded-full blur-3xl opacity-75 animate-pulse transition-colors duration-700"
            style={{ backgroundColor: displayColor }}
          ></div>
          <div
            className="flex rounded-full z-20 overflow-hidden h-full w-full relative shadow-xl transition-colors duration-700"
            style={{ backgroundColor: displayColor }}
          >
            <StarInteriorParticles />
          </div>
        </div>

        <div
          className="absolute inset-0 pointer-events-none flex items-center justify-center mix-blend-screen transition-all duration-700 z-20"
          style={{ opacity: flareOpacity }}
        >
          {/* Rayos base (Siempre presentes si hay spikes) */}
          {optics.spikes > 0 && (
            <>
              <div
                className="absolute h-0.5 w-[80vw] max-w-300 blur-[1px] transition-colors"
                style={{
                  background: `linear-gradient(90deg, transparent 0%, ${displayColor} 50%, transparent 100%)`,
                }}
              />
              <div
                className="absolute h-2 w-[40vw] max-w-150 blur-[6px] transition-colors"
                style={{
                  background: `linear-gradient(90deg, transparent 0%, ${displayColor} 50%, transparent 100%)`,
                }}
              />
              <div
                className="absolute h-0.5 w-[80vw] max-w-300 blur-[1px] rotate-90 transition-colors opacity-30"
                style={{
                  background: `linear-gradient(90deg, transparent 0%, ${displayColor} 50%, transparent 100%)`,
                }}
              />
            </>
          )}

          {/* Rayos diagonales (Visibles en Hubble (4 leves) o JWST (6 marcados)) */}
          {optics.spikes === 4 && (
            <>
              <div
                className="absolute h-0.5 w-[40vw] max-w-125 blur-[1px] rotate-45 opacity-30 transition-colors"
                style={{
                  background: `linear-gradient(90deg, transparent 0%, ${displayColor} 50%, transparent 100%)`,
                }}
              />
              <div
                className="absolute h-0.5 w-[40vw] max-w-125 blur-[1px] -rotate-45 opacity-30 transition-colors"
                style={{
                  background: `linear-gradient(90deg, transparent 0%, ${displayColor} 50%, transparent 100%)`,
                }}
              />
            </>
          )}

          {/* Picos extras de Webb (Geometría hexagonal) */}
          {optics.spikes === 6 && (
            <>
              <div
                className="absolute h-0.5 w-[60vw] max-w-200 blur-[1px] rotate-30 opacity-80 transition-colors"
                style={{
                  background: `linear-gradient(90deg, transparent 0%, ${displayColor} 50%, transparent 100%)`,
                }}
              />
              <div
                className="absolute h-0.5 w-[60vw] max-w-200 blur-[1px] -rotate-30 opacity-80 transition-colors"
                style={{
                  background: `linear-gradient(90deg, transparent 0%, ${displayColor} 50%, transparent 100%)`,
                }}
              />
            </>
          )}

          <div
            className="absolute w-96 h-96 rounded-full blur-3xl opacity-40 transition-colors"
            style={{ backgroundColor: displayColor }}
          />
        </div>
      </section>
    </main>
  );
};
