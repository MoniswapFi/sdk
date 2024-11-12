import { ChainId, ETH_ADDRESS, ETH_DECIMALS, ETH_NAME, ETH_SYMBOL, ETH_TOTAL_SUPPLY } from "../constants";
import { Token } from "./Token";

export const ETHER: (chainId?: ChainId) => Token = (chainId = ChainId.BERACHAIN_BARTIO) => {
  return new Token(ETH_ADDRESS, ETH_NAME, ETH_DECIMALS, ETH_SYMBOL, ETH_TOTAL_SUPPLY, chainId);
};
