const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name: { 
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
    },
    password:{
            type: String,
            required: true,
    },
    cpassword:{
        type: String,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now
    },
    messages:[{
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        message:{
            type:String,
            required:true
        },
    } 
],  

    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }]
})

UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12)
        this.cpassword = await bcrypt.hash(this.cpassword, 12)
    }
    next(); 
}  );



UserSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (err) {
        console.log(err);
    }
}   

UserSchema.methods.addMessage = async function (name, email, message) {
    try{
        this.messages.push({
            name,
            email,
            message
        });

        await this.save();
        return this.messages;
    }catch(err){
        console.log(err);
    }
    
}
    const User = mongoose.model('User', UserSchema);
    module.exports = User;

// Code snippet from c:\Users\chethan_kodenkiri\Documents\GenAIWebsite\Server\DB\Connection.js
// const mongoose = require('mongoose');

// const DB = process.env.DATABASE;

// mongoose.connect(DB).then(() => console.log('DB connection successful')).catch((err) => {