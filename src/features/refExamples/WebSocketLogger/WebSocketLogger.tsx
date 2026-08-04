import { useEffect, useRef, useState } from "react";
import styles from "./WebSocketLogger.module.css";

export const WebSocketLogger = () => {
  const wsRef = useRef<WebSocket | null>(null);

  const [logs, setLogs] = useState<{ id: string; time: string; msg: string }[]>(
    [],
  );
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const ws = new WebSocket("wss://echo.websocket.org");
    wsRef.current = ws;

    ws.onopen = () => {
      setIsConnected(true);
      console.log("Соединение установлено");
    };
    ws.onclose = () => {
      setIsConnected(false);
      console.log("Соединение закрыто");
    };

    ws.onmessage = (event) => {
      const incomingText = event.data;
      console.log("Новое сообщение от сервера:", incomingText);

      setLogs((prev) => [
        {
          id: crypto.randomUUID(),
          time: new Date().toLocaleTimeString(),
          msg: `Входящее (Эхо): "${incomingText}"`,
        },
        ...prev,
      ]);
    };

    return () => {
      if (wsRef.current) {
        wsRef.current?.close();
        wsRef.current = null;
      }
    };
  }, []);

  const sendMessage = (text: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(text);

      setLogs((prev) => [
        {
          id: crypto.randomUUID(),
          time: new Date().toLocaleTimeString(),
          msg: `Отправлено: "${text}"`,
        },
        ...prev,
      ]);
    }
  };

  return (
    <div className={styles.container}>
      <h3>WebSocket Logger</h3>
      <div className={styles.terminal}>
        {logs.length === 0 && (
          <div className={styles.terminalLine}>
            # Ожидание подключения к wss://echo.websocket.org...
          </div>
        )}
        {logs.map((log) => (
          <div key={log.id} className={styles.terminalLine}>
            <span className={styles.timestamp}>[{log.time}]</span>
            <span>{log.msg}</span>
          </div>
        ))}
      </div>

      <div className={styles.controls}>
        <button onClick={() => sendMessage("Привет!")}>
          Отправить сообщение
        </button>
        <button onClick={() => wsRef.current?.close()}>
          Закрыть Соединение
        </button>

        <div
          className={`${styles.statusIndicator} ${isConnected ? styles.online : ""}`}
        >
          <div className={styles.dot} />
          {isConnected ? "Connected" : "Disconnected"}
        </div>
      </div>
    </div>
  );
};
