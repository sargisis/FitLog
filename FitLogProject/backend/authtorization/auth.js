import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import User from '../models/User.js'
import SECRET_KEY from '../SECRET_KEY/prev.js';

export const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    const user = await User.create({
      username: req.body.username,
      passwordHash: hash,
    });

    const token = jwt.sign({ _id: user._id }, SECRET_KEY, { expiresIn: '30d' });

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });

  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Registration error', err });
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    const isValidPass = await bcrypt.compare(req.body.password, user.passwordHash);

    if (!isValidPass) {
      return res.status(400).json({
        message: 'Invalid login or password',
      });
    }

    const token = jwt.sign({ _id: user._id }, SECRET_KEY, { expiresIn: '30d' });

    const { passwordHash, ...userData } = user._doc;
    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Login error', err });
  }
};


export const resetPassword = async (req , res) => {
    try {
        const {username , oldPassword , newPassword} = req.body; 
        
        if (!username || !oldPassword || !newPassword)
        {
           return res.status(500).json({message: 'All fields are required'});
        }
        
        const user = await User.findOne({username})
        
        if (!user)
        {
            return res.status(500).json({message: "User not found"})
        }

        if (!user.passwordHash)
        {
            return res.status(500).json({message: 'Password hash missing in user data'})
        }

        const isMatch = await bcrypt.compare(oldPassword , user.passwordHash);

        if (!isMatch)
        {
            return res.status(500).json({message: "Old password is incorrect"})
        }

        const salt = await bcrypt.genSalt(10);
        const newHash = await bcrypt.hash(newPassword , salt)

        user.passwordHash = newHash;
        await user.save();
        res.json({message: "Password is sucsessfuly update"})
    }catch(err) 
    {
        console.error('Reset password error' , err);
        res.status(500).json({message: 'Reset password error' , err});
    }
}
  
