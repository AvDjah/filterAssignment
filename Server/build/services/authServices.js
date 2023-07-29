"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProfileService = exports.signupHandler = exports.getUserService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getUserService = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findFirst({
        where: {
            email: email
        }
    });
    console.log(user);
    return user;
});
exports.getUserService = getUserService;
const signupHandler = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const userCreate = yield prisma.user.create({
        data: {
            name: user.name,
            email: user.email,
            password: user.password,
            picture: user.picture
        }
    });
    console.log(userCreate);
});
exports.signupHandler = signupHandler;
const userProfileService = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findFirst({
        where: {
            email: token
        }
    });
    if (user === null) {
        return { result: "Fail" };
    }
    else {
        return {
            result: "Success",
            name: user.name,
            email: user.email,
            id: user.id,
            picture: user.picture
        };
    }
});
exports.userProfileService = userProfileService;
