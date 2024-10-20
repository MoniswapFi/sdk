export class AggregatorAdapter {
    private _name: string;
    private _maintainerRole: `0x${string}`;
    private _swapGasEstimate: bigint;

    constructor(name: string, maintainerRole: `0x${string}`, swapGasEstimate: bigint) {
        this._name = name;
        this._maintainerRole = maintainerRole;
        this._swapGasEstimate = swapGasEstimate;
    }

    public get name() {
        return this._name;
    }

    public get maintainerRole() {
        return this._maintainerRole;
    }

    public get swapGasEstimate() {
        return this._swapGasEstimate;
    }
}
