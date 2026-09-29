import { createRoot } from "react-dom/client";
import { App } from "./App";
import { ParticlesProvider } from "@tsparticles/react";
import { loadStarsPreset } from "@tsparticles/preset-stars";
import type { Engine } from "@tsparticles/engine";

import "./index.css";

// Inicializamos el preset de estrellas de manera global
const initOptions = async (engine: Engine) => {
  await loadStarsPreset(engine);
};

createRoot(document.getElementById("root")!).render(
  <ParticlesProvider init={initOptions}>
      <App />
  </ParticlesProvider>,
);