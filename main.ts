
class BaseVisual {

    private _flatened:number[]

    constructor(private _data:number[] | string[]){
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

interface DesignSetting {
    header?:string;
    footer?:string;
    lnstart?:string;
    lnend?:string;
    seperator?:string;
}

interface Line {
    contents:string[];
}

class Base {

    protected _outData:Line[];


    private _STANDART:DesignSetting = {
        header:"",
        footer:"",
        lnstart:"|",
        lnend:"",
        seperator:"|"
    }


    constructor (private _designSetting:DesignSetting){
        this.standartiseSettings();
    }

    //Note: point for implementing feature with formating header
    private standartiseSettings():void{

        let keys = Object.keys(this._designSetting);
        keys.forEach(key => {
            if (!this._designSetting[key]) this._designSetting[key] = this._STANDART[key];
        });

    }


    private formatLine(ln:Line):string{
        return this._designSetting.lnstart + ln.contents.join(this._designSetting.seperator) + this._designSetting.lnend;
    }

    
    private formatAll(data:Line[]):string{
        let text:string = data.map(ln => (this.formatLine(ln))).join("\n");

        return `${this._designSetting.header}\n${text}\n${this._designSetting.footer}`;
    }



    public printOut():void {
        console.log(this.formatAll(this._outData))
    }

}


var testData = [
    1,5,9,3
]

var test = new BaseVisual(testData);

test.printOut();

