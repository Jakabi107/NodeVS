
interface DesignSetting {
    header:string | undefined;
    footer:string | undefined;
    lnstart:string | undefined;
    lnend:string | undefined;
    seperator:string | undefined;
}

interface Line {
    contents:string[];
}

class FormatBase {

    protected _outData:Line[] = [{contents:["Hello","world"]}];
    
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

        let keys = Object.keys(this._designSetting)
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

interface DataInf{
    name?:string | number;
    value:number;
}


class VisualiseBase extends FormatBase {


    constructor (designSetting:DesignSetting) {
        super(designSetting);
    }


    public toBar(values:DataInf[]):void {
        const SYMBOL:string = "#";

        this._outData = values.map((valueInf):Line => { 
            return {contents: [Array(valueInf.value + 1).join(SYMBOL)]}
        })
    }


}


var testData:DataInf[] = [
    1,9,11,4
].map(value => ({value: value}))

var base = new VisualiseBase({
    header:undefined,
    footer:undefined,
    lnend:undefined,
    lnstart:undefined,
    seperator:undefined
});

base.toBar(testData);
base.printOut();

