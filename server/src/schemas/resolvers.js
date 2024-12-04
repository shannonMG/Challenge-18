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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import user model
const User_js_1 = __importDefault(require("../models/User.js"));
// import sign token function from auth
const auth_js_1 = require("../utils/auth.js");
const resolvers = {
    Query: {
        me: (_parent, _args, context) => __awaiter(void 0, void 0, void 0, function* () {
            if (context.user) {
                return yield User_js_1.default.findOne({ _id: context.user._id });
            }
            throw new auth_js_1.AuthenticationError('Not Authenticated');
        }),
    },
    Mutation: {
        addUser: (_parent_1, _a) => __awaiter(void 0, [_parent_1, _a], void 0, function* (_parent, { input }) {
            const user = yield User_js_1.default.create(Object.assign({}, input));
            const token = (0, auth_js_1.signToken)(user.username, user.email, user._id);
            return { token, user: user };
        }),
        login: (_parent_1, _a) => __awaiter(void 0, [_parent_1, _a], void 0, function* (_parent, { email, password }) {
            const user = yield User_js_1.default.findOne({ email });
            if (!user) {
                throw new auth_js_1.AuthenticationError('Cannot find this user');
            }
            const correctPw = yield user.isCorrectPassword(password);
            if (!correctPw) {
                throw new auth_js_1.AuthenticationError('Wrong password');
            }
            const token = (0, auth_js_1.signToken)(user.username, user.email, user._id);
            return { token, user: user };
        }),
        saveBook: (_parent_1, _a, context_1) => __awaiter(void 0, [_parent_1, _a, context_1], void 0, function* (_parent, { input }, context) {
            if (context.user) {
                const updatedUser = yield User_js_1.default.findOneAndUpdate({ _id: context.user._id }, {
                    $addToSet: {
                        savedBooks: input,
                    },
                    $inc: { bookCount: 1 },
                }, {
                    new: true,
                    runValidators: true,
                });
                return updatedUser;
            }
            throw new auth_js_1.AuthenticationError('Not authenticated');
        }),
        removeBook: (_parent_1, _a, context_1) => __awaiter(void 0, [_parent_1, _a, context_1], void 0, function* (_parent, { bookId }, context) {
            if (context.user) {
                const updatedUser = yield User_js_1.default.findOneAndUpdate({ _id: context.user._id }, { $pull: { savedBooks: { bookId } },
                    $inc: { bookCount: -1 },
                }, { new: true });
                return updatedUser;
            }
            throw new auth_js_1.AuthenticationError('Not authenticated');
        }),
    },
};
exports.default = resolvers;
