import type { Token } from "./entities/Token";

export const ETH_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
export const ETH_NAME = "Ether";
export const ETH_DECIMALS = 18;
export const ETH_SYMBOL = "ETH";
export const ETH_TOTAL_SUPPLY = BigInt(Number.POSITIVE_INFINITY);
export type SwapRoute = {
  from: Token | string;
  to: Token | string;
  stable: boolean;
  factory: string;
};
export type SwapRoutes = Array<SwapRoute>;

export enum ChainId {
  BERACHAIN_BARTIO = 80084,
}

export const RPCS = {
  [ChainId.BERACHAIN_BARTIO]: "https://bera-testnet.nodeinfra.com",
};

export const PROTOCOL_ROUTERS = {
  [ChainId.BERACHAIN_BARTIO]: "0x19042106AABFA3A2cDf46Ea160aA6fa9Db31c261",
};

export const AGGREGATOR_ROUTERS = {
  [ChainId.BERACHAIN_BARTIO]: "",
};
