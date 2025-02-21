import dynamic from "next/dynamic";

// Cargamos el chatbot solo en el cliente
const Chatbot = dynamic(() => import("./Chatbot"), { ssr: false });

export default function ChatbotWrapper() {
  return <Chatbot />;
}
