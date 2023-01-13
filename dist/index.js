"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var server_1 = __importDefault(require("./server"));
var port = 5001;
server_1["default"].listen(port, function () {
    console.log("Example app listening at http://localhost:".concat(port));
});
//# sourceMappingURL=index.js.map