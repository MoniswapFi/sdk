import { ChainId, ETH_ADDRESS } from "./constants";
import { ETHER } from "./entities/Ether";
import { Token } from "./entities/Token";
import { erc20Abi } from "./entities/abis";
import { Caller } from "./utils/Caller";

export class Loader {
    static async loadToken(address: `0x${string}`, chainId = ChainId.BERACHAIN_BARTIO) {
        try {
            if (address === ETH_ADDRESS) return ETHER(chainId);

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
}
