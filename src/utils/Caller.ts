import {
  type Abi,
  createPublicClient,
  http,
  encodeFunctionData,
  decodeFunctionResult,
  createWalletClient,
  custom,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { berachainTestnetbArtio } from "viem/chains";
import assert from "assert";
import { ChainId, RPCS } from "../constants";

const chains = {
  [ChainId.BERACHAIN_BARTIO]: berachainTestnetbArtio,
};

export class Caller {
  url: string;
  chainId: ChainId;

  private constructor(chainId?: ChainId) {
    this.url = RPCS[chainId ?? ChainId.BERACHAIN_BARTIO];
    this.chainId = chainId ?? ChainId.BERACHAIN_BARTIO;
  }

  static createCaller(chainId: ChainId) {
    return new Caller(chainId);
  }

  async ethCall<T>(abi: Abi, to: `0x${string}`, functionName: string, args?: any[]): Promise<T> {
    const client = createPublicClient({ transport: http(this.url) });
    const functionData = encodeFunctionData({ abi, functionName, args });

    try {
      const callResult = await client.call({
        data: functionData,
        to,
      });
      assert(typeof callResult.data !== "undefined", "caller: call result data is undefined");
      return decodeFunctionResult({
        abi,
        functionName,
        data: callResult.data,
      }) as T;
    } catch (error: any) {
      return Promise.reject(error);
    }
  }

  async submitTransaction(
    abi: Abi,
    to: `0x${string}`,
    functionName: string,
    args?: any[],
    value: bigint = BigInt(0),
    privateKey?: `0x${string}`,
    gas?: bigint,
    gasPrice?: bigint,
  ) {
    const provider = (window as any).ethereum;
    const client = !privateKey
      ? createWalletClient({ transport: custom(provider), chain: chains[this.chainId] })
      : createWalletClient({
          account: privateKeyToAccount(privateKey),
          transport: http(this.url),
          chain: chains[this.chainId],
        });
    const functionData = encodeFunctionData({ abi, functionName, args });

    try {
      const [account] = await client.getAddresses();
      const hash = await client.sendTransaction({
        account,
        to,
        data: functionData,
        value,
        gas,
        gasPrice,
      });
      return hash;
    } catch (error: any) {
      return Promise.reject(error);
    }
  }
}
