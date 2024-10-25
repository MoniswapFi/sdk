import { ChainId } from "../constants";
import { Token } from "./Token";

const ETH_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
const ETH_NAME = "Ether";
const ETH_DECIMALS = 18;
const ETH_SYMBOL = "ETH";
const ETH_TOTAL_SUPPLY = BigInt(Number.POSITIVE_INFINITY);

export const ETHER: (chainId?: ChainId) => Token = (chainId = ChainId.BERACHAIN_BARTIO) => {
    return new Token(ETH_ADDRESS, ETH_NAME, ETH_DECIMALS, ETH_SYMBOL, ETH_TOTAL_SUPPLY, chainId);
};
