var BaseVisual = /** @class */ (function () {
    function BaseVisual(_data) {
        this._data = _data;
        this._flatened = this.flat();
    }
    BaseVisual.prototype.flat = function () {
        var max = Math.max.apply(null, this._data);
        return this._data.map(function (element) { return element / max; });
    };
    BaseVisual.prototype.toRange = function (rangeValue) {
        return this._flatened.map(function (value) { return Math.floor(value * rangeValue); });
    };
    BaseVisual.prototype.toString = function (range) {
        var SYMBOL = "#";
        var arr = this.toRange(range);
        return arr.map(function (value) { return Array(value + 1).join(SYMBOL); });
    };
    BaseVisual.prototype.printOut = function () {
        var RANGE = 100;
        console.log("\n|" + this.toString(RANGE).join("\n|") + "\n");
    };
    return BaseVisual;
}());
var Base = /** @class */ (function () {
    function Base(_designSetting) {
        this._designSetting = _designSetting;
        this._STANDART = {
            header: "",
            footer: "",
            lnstart: "|",
            lnend: "",
            seperator: "|"
        };
        this.standartiseSettings();
    }
    //Note: point for implementing feature with formating header
    Base.prototype.standartiseSettings = function () {
        var _this = this;
        var keys = Object.keys(this._designSetting);
        keys.forEach(function (key) {
            if (!_this._designSetting[key])
                _this._designSetting[key] = _this._STANDART[key];
        });
    };
    Base.prototype.formatLine = function (ln) {
        return this._designSetting.lnstart + ln.contents.join(this._designSetting.seperator) + this._designSetting.lnend;
    };
    Base.prototype.formatAll = function (data) {
        var _this = this;
        var text = data.map(function (ln) { return (_this.formatLine(ln)); }).join("\n");
        return "".concat(this._designSetting.header, "\n").concat(text, "\n").concat(this._designSetting.footer);
    };
    Base.prototype.printOut = function () {
        console.log(this.formatAll(this._outData));
    };
    return Base;
}());
var testData = [
    1, 5, 9, 3
];
var test = new BaseVisual(testData);
test.printOut();
