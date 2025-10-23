import userModel from "../models/users.model.js";

// sign up or register function
export async function register(req, res) {

    // destructuring from the req body
    const { username, email, password } = req.body;

    try {
        // key validation
        if (!username, !email, !password) return res.status(400).json({message: "check all fields like username, email, password are coming or not"});
        
        // field validation
        if (username.length < 5) return res.status(400).json({message: "username must be 5 characters"});
        if (email) {
            let test = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            if (!test) return res.status(400).json({message: 'Invalid email format'});
        }
        if (password) {
            let test = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/.test(password);
            if (!test) return res.status(400).json({message: 'Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be 8-16 characters long.'})
        }

        // check email is already is in the db or not
        let checkUser = await userModel.find({email: email});
        if (checkUser) return res.status(400).json({message: 'User already exist, try with another email'});

        // if a user is new
        const newUser = new userModel({
            username,
            email,
            password
        })

        // save the new user
        await newUser.save();
        return res.status(201).json({message: 'user has been registered successfully'}); 
    
    }
    catch(error) {
        return res.status(500).json({error: error.message});
    }
    
}

export async function login(req, res) {

    // destructuring from the req body
    const { email, password } = req.body;

    try {
        // key validation
        if (!email, !password) return res.status(400).json({message: "check all fields like email and password are coming or not"});

        // find the user using email
        let getUser = await userModel.find({email: email});
        if (!getUser) return res.status(400).json({message: 'user is not registered'});

        return res.status(200).json({user: getUser});
    }
    catch(error) {
        return res.status(500).json({error: error.message});
    }
}