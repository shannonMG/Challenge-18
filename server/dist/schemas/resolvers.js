// import user model
import User from '../models/User.js';
// import sign token function from auth
import { signToken, AuthenticationError } from '../utils/auth.js';
const resolvers = {
    Query: {
        me: async (_parent, _args, context) => {
            if (context.user) {
                return await User.findOne({ _id: context.user._id });
            }
            throw new AuthenticationError('Not Authenticated');
        },
    },
    Mutation: {
        addUser: async (_parent, { input }) => {
            const user = await User.create({ ...input });
            const token = signToken(user.username, user.email, user._id);
            return { token, user: user };
        },
        login: async (_parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('Cannot find this user');
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Wrong password');
            }
            const token = signToken(user.username, user.email, user._id);
            return { token, user: user };
        },
        saveBook: async (_parent, { input }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate({ _id: context.user._id }, {
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
            throw new AuthenticationError('Not authenticated');
        },
        removeBook: async (_parent, { bookId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate({ _id: context.user._id }, { $pull: { savedBooks: { bookId } },
                    $inc: { bookCount: -1 },
                }, { new: true });
                return updatedUser;
            }
            throw new AuthenticationError('Not authenticated');
        },
    },
};
export default resolvers;
