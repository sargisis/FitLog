import {body} from 'express-validator';

 const registerValidation = [
    body('username', 'Name must be at least 3 characters long').isLength({min: 5}),
    body('password', 'Password must be at least 5 characters long').isLength({min: 5}),
];

export default registerValidation;