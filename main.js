var DataVisual = /** @class */ (function () {
    function DataVisual(_data) {
        this._data = _data;
        this._flatened = this.flat();
    }
    DataVisual.prototype.flat = function () {
        var max = Math.max.apply(null, this._data);
        return this._data.map(function (element) { return element / max; });
    };
    DataVisual.prototype.toRange = function (rangeValue) {
        return this._flatened.map(function (value) { return Math.floor(value * rangeValue); });
    };
    DataVisual.prototype.toString = function (range) {
        var SYMBOL = "#";
        var arr = this.toRange(range);
        return arr.map(function (value) { return Array(value + 1).join(SYMBOL); });
    };
    DataVisual.prototype.printOut = function () {
        var RANGE = 100;
        console.log("\n|" + this.toString(RANGE).join("\n|") + "\n");
    };
    return DataVisual;
}());
var testData = [
    1, 5, 9, 3, 1, 99
];
var test = new DataVisual(testData);
test.printOut();
