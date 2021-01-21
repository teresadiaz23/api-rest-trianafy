import { UserRepository } from "../models/user.js";

const UserController = {
    allUsers: async (req, res) => {
        const result = await UserRepository.findAll();
        if(Array.isArray(result) && result.length > 0){
            res.json(result);
        }
        else{
            res.sendStatus(404);
        }
    }
}


export {
    UserController
}