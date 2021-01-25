import { toDto, UserRepository } from "../models/user.js";

const UserController = {
    allUsers: async (req, res) => {
        const result = await UserRepository.findAll();
        if(Array.isArray(result) && result.length > 0){
            res.json(result);
        }
        else{
            res.sendStatus(404);
        }
    },

    userById: async (req, res) => {
        try{
            const user = await UserRepository.findById(req.params.id);
            if(user != undefined){
                res.json(toDto(user));
            }
            else{
                res.sendStatus(404);
            }
        }
        catch (error) {
            res.status(404).send(error);
        }
        
    }
}


export {
    UserController
}