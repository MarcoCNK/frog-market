import User from "../models/user.models.js"

class UserRepository {
    static async register( new_user_object ) {
        const new_user = new User(new_user_object)
        return await new_user.save()
    }

    static async getByMail (email){
        return User.findOne(email)
    }

}

export default UserRepository