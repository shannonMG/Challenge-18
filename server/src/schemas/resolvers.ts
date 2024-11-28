
// import user model
import User from '../models/User.js';
// import sign token function from auth
import { signToken, AuthenticationError } from '../utils/auth.js';
//import {Types} from 'mongoose'


interface User {
  _id: string;
  username: string; 
  email: string;
  savedBooks:Array<any>;
  bookCount: number;
}
interface AddUserArgs {
  input:{
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


const resolvers ={
  Query: {
 

     me: async (_parent:any, _args: any, context: Context): Promise<User|null> => {
      if (context.user) {
        return await User.findOne({_id: context.user._id});
      }

      throw new AuthenticationError('Not Authenticated');
     },

  },

  Mutation: {

    addUser: async (_parent: any, { input }: AddUserArgs): Promise<{token: string; user: User}>=>{
      const user=await User.create({...input});
      const token=signToken(user.username, user.email, user._id);
      return { token, user: user as User};
    }, 

    login: async (_parent: any, { email, password }: LoginUserArgs): Promise<{ token: string; user: User }> => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Cannot find this user');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Wrong password');
      }
      const token = signToken(user.username, user.email, user._id);
      return { token, user: user as User };
    },

    saveBook: async (_parent: any, { input }: {input:SaveBookArgs}, context: Context): Promise<User | null> => {
      if (context.user) {
        const updatedUser= await User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $addToSet:  {
            savedBooks: input,
          },

          $inc: {bookCount: 1}, 
        }, 
          {
            new: true,
            runValidators: true,
          }
        );

        return updatedUser as User; 
      }
      throw new AuthenticationError('Not authenticated');
    },

    removeBook: async (_parent: any, { bookId }: RemoveBookArgs, context: Context): Promise<User | null> => {
      if (context.user) {
        const updatedUser= await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: {bookId} },
        
            $inc: { bookCount: -1}, 
        },

          { new: true }
        );

        return updatedUser as User; 
      }
      throw new AuthenticationError ('Not authenticated');
    },



  }, 
};

export default resolvers; 
