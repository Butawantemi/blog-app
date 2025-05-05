import dotenv from "dotenv";

dotenv.config();

interface Config {
  port: number;
  dotEnv: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 4000,
  dotEnv: process.env.NODE_ENV || "Development",
};

export default config;
