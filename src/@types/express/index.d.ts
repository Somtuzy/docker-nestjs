import { User } from './user/user.interface'; // Import your user interface or type

declare module 'express-serve-static-core' {
  interface Request {
    user?: User; // Define the user property in the Request object
  }
}
