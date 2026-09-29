import Particles from "@tsparticles/react";
import type { ISourceOptions } from "@tsparticles/engine";
import { useMemo } from "react";

export const StarParticles = ({
  id = "estrellas",
  particles = 150,
}: {
  id?: string ;
  particles?: number;
}) => {
  // 2. Configuramos las opciones
  const options: ISourceOptions = useMemo(
    () => ({
      preset: "stars",
      fpsLimit: 60,
      fullScreen: { enable: false },
      background: {
        color: { value: "transparent" },
      },
      particles: {
        size: {
          value: { min: 0.2, max: 1 },
        },
        move: {
          speed: 0.01,
        },
        number: {
          value: particles,
          density: { enable: true, width: 500 },
        },
      },
    }),
    [],
  );

  return (
    <Particles
      id={id}
      options={options}
      className="absolute inset-0 z-0 w-full h-full pointer-events-none"
    />
  );
};
