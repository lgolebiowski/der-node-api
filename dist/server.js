"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var router_1 = __importDefault(require("./router"));
var auth_1 = require("./auth/auth");
var app = (0, express_1["default"])();
app.use(express_1["default"].static("static"));
app.use("/api", auth_1.protect, router_1["default"]);
app.get("/", function (req, res) {
    res.sendFile(path_1["default"].resolve("pages/index.html"));
});
exports["default"] = app;
//# sourceMappingURL=server.js.map