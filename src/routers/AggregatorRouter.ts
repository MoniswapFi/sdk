import { AGGREGATOR_ROUTERS, ChainId } from "../constants";
import { AggregatorAdapter } from "../entities/AggregatorAdapter";
import { Token } from "../entities/Token";
import { aggregatorRouterAbi } from "../entities/abis";
import { Loader } from "../loader";
import { Caller } from "../utils/Caller";

interface Query {
  adapter: AggregatorAdapter;
}

export class AggregatorRouter {
  chainId: ChainId;
  address: `0x${string}`;

  constructor(chainId: ChainId = ChainId.BERACHAIN_BARTIO) {
    this.chainId = chainId;
    this.address = AGGREGATOR_ROUTERS[this.chainId] as `0x${string}`;
  }

  async weth() {
    try {
      const caller = Caller.createCaller(this.chainId);
      const wethRes = await caller.ethCall<`0x${string}`>(aggregatorRouterAbi, this.address, "WETH");
      const token = await Loader.loadToken(wethRes, this.chainId);
      return token;
    } catch (error: any) {
      return Promise.reject(error);
    }
  }

  query(tokenA: Token | `0x${string}`, tokenB: Token | `0x${string}`) {}
}
