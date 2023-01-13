"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.protect = exports.hashPassword = exports.comparePassword = exports.createJwtToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var createJwtToken = function (user) {
    var token = jsonwebtoken_1["default"].sign({
        id: user.id,
        username: user.username
    }, process.env.JWT_SECRET);
    return token;
};
exports.createJwtToken = createJwtToken;
var comparePassword = function (password, hash) {
    return bcrypt_1["default"].compare(password, hash);
};
exports.comparePassword = comparePassword;
var hashPassword = function (password) {
    bcrypt_1["default"].hash(password, 6);
};
exports.hashPassword = hashPassword;
var protect = function (req, res, next) {
    var bearer = req.header.authorization;
    if (!bearer) {
        res.status(401);
        res.json({ message: "Check your credentials" });
        return;
    }
    var _a = bearer.split(""), token = _a[1];
    if (!token) {
        res.status(401);
        res.json({ message: "Check your credentials" });
        return;
    }
    try {
        var user = jsonwebtoken_1["default"].verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    }
    catch (error) {
        console.error;
        res.status(401);
        res.json({ message: "Check your credentials" });
        return;
    }
};
exports.protect = protect;
//# sourceMappingURL=auth.js.map