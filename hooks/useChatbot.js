import { useState, useEffect } from "react";

export function useChatbot() {
  const [model, setModel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Evita que se ejecute en el servidor
    if (typeof window === "undefined") return;

    let isMounted = true; // Evita errores de estado en desmontaje

    async function loadModel() {
      console.log("Cargando modelo de IA...");
      try {
        const { default: tf } = await import("@tensorflow/tfjs");
        const { default: use } = await import("@tensorflow-models/universal-sentence-encoder");

        const loadedModel = await use.load();
        if (isMounted) {
          setModel(loadedModel);
          setIsLoading(false);
          console.log("Modelo cargado exitosamente");
        }
      } catch (error) {
        console.error("Error cargando TensorFlow.js:", error);
      }
    }

    loadModel();

    return () => {
      isMounted = false; // Limpieza para evitar errores de memoria
    };
  }, []);

  return { model, isLoading };
}
