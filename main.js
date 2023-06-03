var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var FormatBase = /** @class */ (function () {
    function FormatBase(_designSetting) {
        this._designSetting = _designSetting;
        this._outData = [{ contents: ["Hello", "world"] }];
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
    FormatBase.prototype.standartiseSettings = function () {
        var _this = this;
        var keys = Object.keys(this._designSetting);
        keys.forEach(function (key) {
            if (!_this._designSetting[key])
                _this._designSetting[key] = _this._STANDART[key];
        });
    };
    FormatBase.prototype.formatLine = function (ln) {
        return this._designSetting.lnstart + ln.contents.join(this._designSetting.seperator) + this._designSetting.lnend;
    };
    FormatBase.prototype.formatAll = function (data) {
        var _this = this;
        var text = data.map(function (ln) { return (_this.formatLine(ln)); }).join("\n");
        return "".concat(this._designSetting.header, "\n").concat(text, "\n").concat(this._designSetting.footer);
    };
    FormatBase.prototype.printOut = function () {
        console.log(this.formatAll(this._outData));
    };
    return FormatBase;
}());
var VisualiseBase = /** @class */ (function (_super) {
    __extends(VisualiseBase, _super);
    function VisualiseBase(designSetting) {
        return _super.call(this, designSetting) || this;
    }
    VisualiseBase.prototype.toBar = function (values) {
        var SYMBOL = "#";
        this._outData = values.map(function (value) {
            return { contents: [Array(value + 1).join(SYMBOL)] };
        });
    };
    return VisualiseBase;
}(FormatBase));
var testData = [
    1, 5, 9, 3
];
var base = new VisualiseBase({
    header: undefined,
    footer: undefined,
    lnend: undefined,
    lnstart: undefined,
    seperator: undefined
});
base.toBar(testData);
base.printOut();
