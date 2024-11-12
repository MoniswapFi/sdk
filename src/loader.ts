import assert from "assert";
import { ChainId, ETH_ADDRESS } from "./constants";
import { ETHER } from "./entities/Ether";
import { Token } from "./entities/Token";
import { erc20Abi } from "./entities/abis";
import { Caller } from "./utils/Caller";
import { zeroAddress } from "viem";
import { AggregatorAdapter } from "./entities/AggregatorAdapter";

export class Loader {
  static async loadToken(address: `0x${string}`, chainId = ChainId.BERACHAIN_BARTIO) {
    try {
      if (address.toLowerCase() === ETH_ADDRESS.toLowerCase()) return ETHER(chainId);

      const caller = Caller.createCaller(chainId);
      const name = await caller.ethCall<string>(erc20Abi, address, "name");
      const symbol = await caller.ethCall<string>(erc20Abi, address, "symbol");
      const decimals = await caller.ethCall<number>(erc20Abi, address, "decimals");
      const totalSupply = await caller.ethCall<bigint>(erc20Abi, address, "totalSupply");

      const token = new Token(address, name, decimals, symbol, totalSupply, chainId);

      return token;
    } catch (error: any) {
      return Promise.reject(error);
    }
  }

  static async loadAggregatorAdapter(address: `0x${string}`, chainId = ChainId.BERACHAIN_BARTIO) {
    try {
      assert.ok(address !== zeroAddress, "error: zero_address");
      assert.ok(address.toLowerCase() !== ETH_ADDRESS.toLowerCase(), "error: ether");

      const caller = Caller.createCaller(chainId);
      const name = await caller.ethCall<string>([], address, "name");
      const maintainerRole = await caller.ethCall<`0x${string}`>([], address, "maintainerRole");
      const swapGasEstimate = await caller.ethCall<bigint>([], address, "swapGasEstimate");

      return new AggregatorAdapter(name, maintainerRole, swapGasEstimate);
    } catch (error: any) {
      return Promise.reject(error);
    }
  }
}
