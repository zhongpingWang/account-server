import  mongoose from 'mongoose'
import baseModel from "./base.js"

const Schema = mongoose.Schema;

class userInfo extends baseModel {

    constructor(props) {
        super(props)
        this.model = mongoose.model('userInfo', new Schema({
            account: String,
            userName: String,
            passWord: String,
            email: String,
            phone: String,
            mobile: String,
            age: Number,
            sex: Number,
            desction: String,
            depId: String,
            avatar: String,
            authId: String,
            address: String,
            posi: String,
            registerDate: {
                type: Number,
                default: +new Date()
            }
        }));
    }

}

const userInfoIns = new userInfo();

export default userInfoIns;