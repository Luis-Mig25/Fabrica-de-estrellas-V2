import Particles from "@tsparticles/react";
import type { ISourceOptions } from "@tsparticles/engine";
import { useMemo } from "react";

export const StarInteriorParticles = ({ id = "Star-Interior" }) => {
  const options: ISourceOptions = useMemo(
    () => ({
      fpsLimit: 60,
      fullScreen: { enable: false },
      background: {
        color: { value: "transparent" },
      },
      particles: {
        // 1. TRANSICIÓN SUAVE DE COLOR
        color: {
          value: "#ff0055", // Color base inicial
          animation: {
            enable: true,
            speed: 10, // Velocidad de cambio de color (más bajo = transición más lenta)
            sync: false, // false: cada burbuja cambia en un tiempo ligeramente distinto
          },
        },
        // 2. FORMA Y TAMAÑO (Burbujas grandes)
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 10, max: 30 }, // Tamaños amplios para simular las gotas
          animation: {
            enable: true,
            speed: 1.5, // Hace que las gotas se encojan y crezcan suavemente
            sync: false,
          },
        },
        // 3. OPACIDAD Y MEZCLA
        opacity: {
          value: { min: 0.3, max: 0.6 }, // Transparencia para que se traslapen y parezcan fluidas
          animation: {
            enable: true,
            speed: 0.5,
            sync: false,
          },
        },
        // 4. MOVIMIENTO LENTO Y ORGÁNICO
        move: {
          enable: true,
          speed: { min: 0.2, max: 0.6 }, // Movimiento muy fluido y paulatino
          direction: "none",
          random: true,
          straight: false,
          outModes: {
            default: "bounce", // Rebotan suavemente en las paredes de la estrella
          },
        },
        number: {
          value: 12, // Pocas partículas para no saturar el espacio
        },
      },
    }),
    []
  );

  return (
    <Particles
      id={id}
      options={options}
      className="absolute inset-0 z-0 w-full h-full pointer-events-none blur-sm"
    />
  );
};