import { ChainId, ETH_ADDRESS, PROTOCOL_ROUTERS, SwapRoutes } from "../constants";
import type { Token } from "../entities/Token";
import { protocolRouterAbi } from "../entities/abis";
import { Loader } from "../loader";
import { Caller } from "../utils/Caller";

export class ProtocolRouter {
    chainId: ChainId;
    address: `0x${string}`;

    constructor(chainId: ChainId = ChainId.BERACHAIN_BARTIO) {
        this.chainId = chainId;
        this.address = PROTOCOL_ROUTERS[chainId] as `0x${string}`;
    }

    async weth() {
        try {
            const caller = Caller.createCaller(this.chainId);
            const wethRes = await caller.ethCall<`0x${string}`>(protocolRouterAbi, this.address, "weth");
            const token = await Loader.loadToken(wethRes, this.chainId);
            return token;
        } catch (error: any) {
            return Promise.reject(error);
        }
    }

    async getReserves(
        tokenA: Token | `0x${string}`,
        tokenB: Token | `0x${string}`,
        stable: boolean,
        factory: `0x${string}`,
    ) {
        try {
            const caller = Caller.createCaller(this.chainId);

            if (typeof tokenA === "string") {
                tokenA = await Loader.loadToken(tokenA);
            }

            if (typeof tokenB === "string") {
                tokenB = await Loader.loadToken(tokenB);
            }

            const reserves = await caller.ethCall<[bigint, bigint]>(protocolRouterAbi, this.address, "getReserves", [
                tokenA.address,
                tokenB.address,
                stable,
                factory,
            ]);
            return reserves;
        } catch (error: any) {
            return Promise.reject(error);
        }
    }

    async quoteAddLiquidity(
        tokenA: Token | `0x${string}`,
        tokenB: Token | `0x${string}`,
        stable: boolean,
        factory: `0x${string}`,
        amountADesired: bigint,
        amountBDesired: bigint,
    ) {
        try {
            const caller = Caller.createCaller(this.chainId);

            if (typeof tokenA === "string") {
                tokenA = await Loader.loadToken(tokenA);
            }

            if (typeof tokenB === "string") {
                tokenB = await Loader.loadToken(tokenB);
            }

            const amounts = await caller.ethCall<[bigint, bigint, bigint]>(
                protocolRouterAbi,
                this.address,
                "quoteAddLiquidity",
                [tokenA.address, tokenB.address, stable, factory, amountADesired, amountBDesired],
            );

            return amounts;
        } catch (error: any) {
            return Promise.reject(error);
        }
    }

    async quoteRemoveLiquidity(
        tokenA: Token | `0x${string}`,
        tokenB: Token | `0x${string}`,
        stable: boolean,
        factory: `0x${string}`,
        liquidity: bigint,
    ) {
        try {
            const caller = Caller.createCaller(this.chainId);

            if (typeof tokenA === "string") {
                tokenA = await Loader.loadToken(tokenA);
            }

            if (typeof tokenB === "string") {
                tokenB = await Loader.loadToken(tokenB);
            }

            const amounts = await caller.ethCall<[bigint, bigint]>(
                protocolRouterAbi,
                this.address,
                "quoteRemoveLiquidity",
                [tokenA.address, tokenB.address, stable, factory, liquidity],
            );

            return amounts;
        } catch (error: any) {
            return Promise.reject(error);
        }
    }

    async addLiquidity(
        tokenA: Token | `0x${string}`,
        tokenB: Token | `0x${string}`,
        stable: boolean,
        amountADesired: bigint,
        amountBDesired: bigint,
        to: `0x${string}`,
        deadline = BigInt(108000),
        value?: bigint,
        privateKey?: `0x${string}`,
        gas?: bigint,
        gasPrice?: bigint,
    ) {
        try {
            const caller = Caller.createCaller(this.chainId);

            if (typeof tokenA === "string") {
                tokenA = await Loader.loadToken(tokenA);
            }

            if (typeof tokenB === "string") {
                tokenB = await Loader.loadToken(tokenB);
            }

            const txHash = await caller.submitTransaction(
                protocolRouterAbi,
                this.address,
                "addLiquidity",
                [
                    tokenA.address,
                    tokenB.address,
                    stable,
                    amountADesired,
                    amountBDesired,
                    BigInt(0),
                    BigInt(0),
                    to,
                    deadline,
                ],
                value,
                privateKey,
                gas,
                gasPrice,
            );
            return txHash;
        } catch (error: any) {
            return Promise.reject(error);
        }
    }

    async addLiquidityETH(
        token: Token | `0x${string}`,
        stable: boolean,
        amountTokenDesired: bigint,
        to: `0x${string}`,
        value: bigint,
        deadline = BigInt(108000),
        privateKey?: `0x${string}`,
        gas?: bigint,
        gasPrice?: bigint,
    ) {
        try {
            const caller = Caller.createCaller(this.chainId);

            if (typeof token === "string") {
                token = await Loader.loadToken(token);
            }

            const txHash = await caller.submitTransaction(
                protocolRouterAbi,
                this.address,
                "addLiquidityETH",
                [token.address, stable, amountTokenDesired, BigInt(0), BigInt(0), to, deadline],
                value,
                privateKey,
                gas,
                gasPrice,
            );
            return txHash;
        } catch (error: any) {
            return Promise.reject(error);
        }
    }

    async removeLiquidity(
        tokenA: Token | `0x${string}`,
        tokenB: Token | `0x${string}`,
        stable: boolean,
        liquidity: bigint,
        to: `0x${string}`,
        deadline = BigInt(108000),
        value?: bigint,
        privateKey?: `0x${string}`,
        gas?: bigint,
        gasPrice?: bigint,
    ) {
        try {
            const caller = Caller.createCaller(this.chainId);

            if (typeof tokenA === "string") {
                tokenA = await Loader.loadToken(tokenA);
            }

            if (typeof tokenB === "string") {
                tokenB = await Loader.loadToken(tokenB);
            }

            const txHash = await caller.submitTransaction(
                protocolRouterAbi,
                this.address,
                "removeLiquidity",
                [tokenA.address, tokenB.address, stable, liquidity, BigInt(0), BigInt(0), to, deadline],
                value,
                privateKey,
                gas,
                gasPrice,
            );
            return txHash;
        } catch (error: any) {
            return Promise.reject(error);
        }
    }

    async removeLiquidityETH(
        token: Token | `0x${string}`,
        stable: boolean,
        liquidity: bigint,
        to: `0x${string}`,
        deadline = BigInt(108000),
        value?: bigint,
        privateKey?: `0x${string}`,
        gas?: bigint,
        gasPrice?: bigint,
    ) {
        try {
            const caller = Caller.createCaller(this.chainId);

            if (typeof token === "string") {
                token = await Loader.loadToken(token);
            }

            const txHash = await caller.submitTransaction(
                protocolRouterAbi,
                this.address,
                "removeLiquidityETH",
                [token.address, stable, liquidity, BigInt(0), BigInt(0), to, deadline],
                value,
                privateKey,
                gas,
                gasPrice,
            );
            return txHash;
        } catch (error: any) {
            return Promise.reject(error);
        }
    }

    async removeLiquidityETHSupportingFeeOnTransferTokens(
        token: Token | `0x${string}`,
        stable: boolean,
        liquidity: bigint,
        to: `0x${string}`,
        deadline = BigInt(108000),
        value?: bigint,
        privateKey?: `0x${string}`,
        gas?: bigint,
        gasPrice?: bigint,
    ) {
        try {
            const caller = Caller.createCaller(this.chainId);

            if (typeof token === "string") {
                token = await Loader.loadToken(token);
            }

            const txHash = await caller.submitTransaction(
                protocolRouterAbi,
                this.address,
                "removeLiquidityETHSupportingFeeOnTransferTokens",
                [token.address, stable, liquidity, BigInt(0), BigInt(0), to, deadline],
                value,
                privateKey,
                gas,
                gasPrice,
            );
            return txHash;
        } catch (error: any) {
            return Promise.reject(error);
        }
    }

    async swap(
        swapRoutes: SwapRoutes,
        amountIn: bigint,
        to: `0x${string}`,
        deadline = BigInt(108000),
        feeOnTransferTokens: boolean = false,
        value?: bigint,
        privateKey?: `0x${string}`,
        gas?: bigint,
        gasPrice?: bigint,
    ) {
        try {
            let method: string;
            let args: any[];

            const routes = swapRoutes.map((swapRoute) => ({
                ...swapRoute,
                from: typeof swapRoute.from !== "string" ? swapRoute.from.address : swapRoute.from,
                to: typeof swapRoute.to !== "string" ? swapRoute.to.address : swapRoute.to,
            }));

            if (routes[0].from === ETH_ADDRESS) {
                const weth = await this.weth();
                routes[0].from = weth.address;
                method = feeOnTransferTokens
                    ? "swapExactETHForTokensSupportingFeeOnTransferTokens"
                    : "swapExactETHForTokens";
                args = [BigInt(0), routes, to, deadline];

                if (value !== amountIn) {
                    value = amountIn;
                }
            } else if (routes[routes.length - 1].to === ETH_ADDRESS) {
                const weth = await this.weth();
                routes[routes.length - 1].to = weth.address;
                method = feeOnTransferTokens
                    ? "swapExactTokensForETHSupportingFeeOnTransferTokens"
                    : "swapExactTokensForETH";
                args = [amountIn, BigInt(0), routes, to, deadline];
            } else {
                method = feeOnTransferTokens
                    ? "swapExactTokensForTokensSupportingFeeOnTransferTokens"
                    : "swapExactTokensForTokens";
                args = [amountIn, BigInt(0), routes, to, deadline];
            }

            const caller = Caller.createCaller(this.chainId);
            const txHash = await caller.submitTransaction(
                protocolRouterAbi,
                this.address,
                method,
                args,
                value,
                privateKey,
                gas,
                gasPrice,
            );
            return txHash;
        } catch (error: any) {
            return Promise.reject(error);
        }
    }
}
