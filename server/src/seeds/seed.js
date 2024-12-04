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
const connection_js_1 = __importDefault(require("../config/connection.js"));
const User_js_1 = __importDefault(require("../models/User.js"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// Seed data
const seedUser = {
    username: 'seededuser',
    email: 'seededuser@example.com',
    password: 'password123', // Plaintext password to hash
};
const seedDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Connect to MongoDB
        yield (0, connection_js_1.default)();
        console.log('✅ Connected to MongoDB');
        // Hash the password
        const saltRounds = 10;
        const hashedPassword = yield bcrypt_1.default.hash(seedUser.password, saltRounds);
        console.log('Hashed Password:', hashedPassword); // Log hash for debugging
        // Add hashed password to the seed user data
        const userToInsert = Object.assign(Object.assign({}, seedUser), { password: hashedPassword });
        // Check if the user already exists
        const existingUser = yield User_js_1.default.findOne({ email: seedUser.email });
        if (existingUser) {
            console.log('⚠️ User already exists, skipping seeding.');
        }
        else {
            // Insert the user into the database
            yield User_js_1.default.create(userToInsert);
            console.log('✅ Seeded user added to the database.');
        }
        // Close the connection
        console.log('🔌 Disconnected from MongoDB');
        process.exit(0); // Exit script successfully
    }
    catch (err) {
        console.error('❌ Error seeding the database:', err);
        process.exit(1); // Exit script with an error
    }
});
seedDatabase();
