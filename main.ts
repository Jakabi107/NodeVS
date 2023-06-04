
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
    name?:string;
    value:number;
}


class VisualiseBase extends FormatBase {

    protected _rawData:DataInf[];

    constructor (designSetting:DesignSetting) {
        super(designSetting);
    }


    public toBar():void {
        const SYMBOL:string = "#";

        this._outData = this._rawData.map((valueInf):Line => {
            return valueInf.name ? {contents: [valueInf.name, Array(valueInf.value + 1).join(SYMBOL)]} : {contents: [Array(valueInf.value + 1).join(SYMBOL)]};
        })
    }

    public toText():void {
        this._outData = this._rawData.map((valueInf):Line => {
            return {contents: [valueInf.name , String(valueInf.value)]};
        })
    }


}


class FrequencyVisualise extends VisualiseBase {

    constructor (designSetting:DesignSetting, private _data:string[] | number[]) {
        super(designSetting);
        this._rawData = this.dictToDataInf(this.calculateFrequency());
    }

    
    private calculateFrequency():object{
        let dict:object = {}

        this._data.forEach(value => {
            let strValue = String(value);
            if (dict[value]) dict[value] ++;
            else dict[value] = 1;
        });

        return dict;
    }


    private dictToDataInf(dict:object):DataInf[]{
        let keys = Object.keys(dict);

        return keys.map(key =>{
            return {name:key, value:dict[key]};
        })
    }

}


var testData:number[] = [
    1,9,1,4,1,1,1,1,1,9
]

var base = new FrequencyVisualise({
    header:undefined,
    footer:undefined,
    lnend:undefined,
    lnstart:undefined,
    seperator:undefined
}, testData);

base.toBar()

base.printOut()