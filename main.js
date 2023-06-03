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
;
var VisualiseBase = /** @class */ (function (_super) {
    __extends(VisualiseBase, _super);
    function VisualiseBase(designSetting) {
        return _super.call(this, designSetting) || this;
    }
    VisualiseBase.prototype.toBar = function (values) {
        var SYMBOL = "#";
        this._outData = values.map(function (valueInf) {
            return { contents: [Array(valueInf.value + 1).join(SYMBOL)] };
        });
    };
    return VisualiseBase;
}(FormatBase));
var testData = [
    1, 9, 11, 4
].map(function (value) { return ({ value: value }); });
var base = new VisualiseBase({
    header: undefined,
    footer: undefined,
    lnend: undefined,
    lnstart: undefined,
    seperator: undefined
});
base.toBar(testData);
base.printOut();
