import { ChainId } from "../constants";
import { Caller } from "../utils/Caller";
import { erc20Abi } from "./abis";

export class Token {
    private _name: string;
    private _decimals: number;
    private _symbol: string;
    private _totalSupply: bigint;
    private _chainId: ChainId;
    private _address: `0x${string}`;

    constructor(
        address: `0x${string}`,
        name: string,
        decimals: number,
        symbol: string,
        totalSupply: bigint,
        chainId?: ChainId,
    ) {
        this._name = name;
        this._decimals = decimals;
        this._symbol = symbol;
        this._totalSupply = totalSupply;
        this._chainId = chainId ?? ChainId.BERACHAIN_BARTIO;
        this._address = address;
    }

    public get name() {
        return this._name;
    }

    public get decimals() {
        return this._decimals;
    }

    public get symbol() {
        return this._symbol;
    }

    public get totalSupply() {
        return this._totalSupply;
    }

    public get chainId() {
        return this._chainId;
    }

    public get address() {
        return this._address;
    }

    async approve(
        spender: `0x${string}`,
        amount: bigint,
        value: bigint = BigInt(0),
        privateKey?: `0x${string}`,
        gas?: bigint,
        gasPrice?: bigint,
    ) {
        try {
            const caller = Caller.createCaller(this.chainId);
            const approvalHash = await caller.submitTransaction(
                erc20Abi,
                this.address,
                "approve",
                [spender, amount],
                value,
                privateKey,
                gas,
                gasPrice,
            );
            return approvalHash;
        } catch (error: any) {
            return Promise.reject(error);
        }
    }

    async balanceOf(account: `0x${string}`) {
        try {
            const caller = Caller.createCaller(this.chainId);
            const balance = await caller.ethCall<bigint>(erc20Abi, this.address, "balanceOf", [account]);
            return balance;
        } catch (error: any) {
            return Promise.reject(error);
        }
    }

    async transfer(
        recipient: `0x${string}`,
        amount: bigint,
        value: bigint = BigInt(0),
        privateKey?: `0x${string}`,
        gas?: bigint,
        gasPrice?: bigint,
    ) {
        try {
            const caller = Caller.createCaller(this.chainId);
            const transferHash = await caller.submitTransaction(
                erc20Abi,
                this.address,
                "transfer",
                [recipient, amount],
                value,
                privateKey,
                gas,
                gasPrice,
            );
            return transferHash;
        } catch (error: any) {
            return Promise.reject(error);
        }
    }

    async transferFrom(
        from: `0x${string}`,
        recipient: `0x${string}`,
        amount: bigint,
        value: bigint = BigInt(0),
        privateKey?: `0x${string}`,
        gas?: bigint,
        gasPrice?: bigint,
    ) {
        try {
            const caller = Caller.createCaller(this.chainId);
            const transferHash = await caller.submitTransaction(
                erc20Abi,
                this.address,
                "transfer",
                [from, recipient, amount],
                value,
                privateKey,
                gas,
                gasPrice,
            );

            return transferHash;
        } catch (error: any) {
            return Promise.reject(error);
        }
    }

    async allowance(owner: `0x${string}`, spender: `0x${string}`) {
        try {
            const caller = Caller.createCaller(this.chainId);
            const allowed = await caller.ethCall<bigint>(erc20Abi, this.address, "allowance", [owner, spender]);
            return allowed;
        } catch (error: any) {
            return Promise.reject(error);
        }
    }

    toJSON() {
        return {
            name: this.name,
            address: this.address,
            decimals: this.decimals,
            symbol: this.symbol,
            totalSupply: this.totalSupply,
            chainId: this.chainId,
        };
    }
}
