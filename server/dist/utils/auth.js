import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import dotenv from 'dotenv';
dotenv.config();
export const authenticateToken = ({ req }) => {
    let token = req.body.token || req.query.token || req.headers.authorization; //looks for the token in 3 different places
    if (req.headers.authorization) {
        token = token.split(' ').pop().trim(); //extracting the token if the Authorization header exitsts. 
    }
    if (!token) { //if there is no token, return request (no authentication happens)
        return req;
    }
    try {
        const { data } = jwt.verify(token, process.env.JWT_SECRET_KEY || '', { maxAge: '2hr' }); //verifies token for a max of 2hrs if token is vaild, decodes the payload and extracts a variable called data 
        req.user = data; //atteches decoded payload (data) to the request object as req.user 
    }
    catch (err) { //if verification fails, catch an error : invalid token
        console.log('Invalid token');
    }
    return req; ///modified request object for use with GraphQL
};
export const signToken = (username, email, _id) => {
    const payload = { username, email, _id };
    const secretKey = process.env.JWT_SECRET_KEY;
    return jwt.sign({ data: payload }, secretKey, { expiresIn: '2h' });
};
export class AuthenticationError extends GraphQLError {
    constructor(message) {
        super(message, undefined, undefined, undefined, ['UNAUTHENTICATED']);
        Object.defineProperty(this, 'name', { value: 'AuthenticationError' });
    }
}
;
