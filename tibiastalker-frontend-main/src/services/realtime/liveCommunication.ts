import * as signalR from "@microsoft/signalr";
import { characterTrackUrl } from "../../constants/api";

export const connection = new signalR.HubConnectionBuilder()
  .withUrl(characterTrackUrl, {
    skipNegotiation: true,
    transport: signalR.HttpTransportType.WebSockets,
    logger: signalR.LogLevel.Information,
  })
  .withAutomaticReconnect() // Bonus: reconnexion automatique
  .build();

connection.onclose((event) => {
  console.log("SignalR connection closed:", event);
});

export async function startConnection() {
  if (connection.state === signalR.HubConnectionState.Connected) {
    return;
  }

  try {
    await connection.start();
    console.log("SignalR Connected.");
  } catch (err) {
    console.error("Error starting SignalR:", err);
  }
}
