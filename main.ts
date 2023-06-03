
class DataVisual {

    private _flatened:number[]

    constructor(private _data:number[]){
        this._flatened = this.flat();
    }


    private flat():number[] {
        let max = Math.max.apply(null, this._data);

        return this._data.map(element => {return element/max});
    }

    
    private toRange(rangeValue:number):number[] {
        return this._flatened.map(value => {return Math.floor( value * rangeValue )});
    }


    private toString(range:number):string[] {
        const SYMBOL:string = "#";
        let arr:number[] = this.toRange(range);

        return arr.map(value => {return Array(value + 1).join(SYMBOL)});
    }


    public printOut():void {
        const RANGE:number = 100; 

        console.log("\n|" + this.toString(RANGE).join("\n|") + "\n");
    }

}


var testData = [
    1,5,9,3,1,99
]

var test = new DataVisual(testData);

test.printOut();

