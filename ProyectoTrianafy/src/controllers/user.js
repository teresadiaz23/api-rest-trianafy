import { toDto, UserRepository } from "../models/user.js";

const UserController = {
    allUsers: async (req, res) => {
        try{
            const result = await UserRepository.findAll();
            if(Array.isArray(result) && result.length > 0){
                res.json(result);
            }
            else{
                res.sendStatus(404);
            }
        }
        catch (error) {
            res.sendStatus(400);
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
            res.sendStatus(400);
        }
        
    }
}


export {
    UserController
}