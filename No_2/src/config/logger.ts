import fs from "fs";
import path from "path";
import pino, { Logger } from "pino";
import dotenv from "dotenv";

dotenv.config();

const logDir: string = process.env.LOG_DIR ?? path.join(process.cwd(), "logs");

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// 오늘 날짜 (YYYY-MM-DD)
const today: string = new Date().toISOString().slice(0, 10);
const logFile: string = path.join(logDir, `app-${today}.log`);

const transport = pino.transport({
  targets: [
    // 파일 로그
    {
      target: "pino-pretty",
      options: {
        destination: logFile,
        colorize: false,
        translateTime: "SYS:yyyy-mm-dd HH:MM:ss.l",
        singleLine: true,
      },
    },
    // 콘솔 로그
    {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "SYS:yyyy-mm-dd HH:MM:ss.l",
        singleLine: true,
      },
    },
  ],
});

// Logger 타입 명시 (중요)
const logger: Logger = pino(
  {
    level: process.env.LOG_LEVEL || "info",
  },
  transport,
);

export default logger;
