import User from '../models/User.js';
interface User {
    _id: string;
    username: string;
    email: string;
    savedBooks: Array<any>;
    bookCount: number;
}
interface AddUserArgs {
    input: {
        username: string;
        email: string;
        password: string;
    };
}
interface LoginUserArgs {
    email: string;
    password: string;
}
interface SaveBookArgs {
    bookId: string;
    authors: string[];
    title: string;
    image: string;
    link: string;
}
interface RemoveBookArgs {
    bookId: string;
}
interface Context {
    user: User;
}
declare const resolvers: {
    Query: {
        me: (_parent: any, _args: any, context: Context) => Promise<User | null>;
    };
    Mutation: {
        addUser: (_parent: any, { input }: AddUserArgs) => Promise<{
            token: string;
            user: User;
        }>;
        login: (_parent: any, { email, password }: LoginUserArgs) => Promise<{
            token: string;
            user: User;
        }>;
        saveBook: (_parent: any, { input }: {
            input: SaveBookArgs;
        }, context: Context) => Promise<User | null>;
        removeBook: (_parent: any, { bookId }: RemoveBookArgs, context: Context) => Promise<User | null>;
    };
};
export default resolvers;
