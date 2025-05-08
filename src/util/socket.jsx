import { io } from "socket.io-client";
import { API_URL } from "../endpoints";

const socket = io(API_URL, {
  reconnectionAttempts: 10,  // Número máximo de intentos de reconexión
  reconnectionDelay: 1000,   // Tiempo entre intentos de reconexión
  timeout: 20000,            // Tiempo máximo para conectar
  autoConnect: false,        // Control manual de conexión
});

// Conectar manualmente cuando se requiera
socket.connect();

export default socket;
