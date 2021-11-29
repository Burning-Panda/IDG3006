import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: String,
    email: { type: String, match: /[a-zA-Z\.]+@([sS][tT][uU][dD]\.)?([nN][oO]|[nN][tT][nN][uU]\.[nN][oO])/ },
    password: { type: String },
    active: { type: Boolean, default: false }
});


/*
Simple Email
[a-zA-Z.]+@+[a-zA-Z]+.+[a-zA-Z]

NTNU email RegEx
[a-zA-Z\.]+@([sS][tT][uU][dD]\.)?([nN][oO]|[nN][tT][nN][uU]\.[nN][oO])

RFC2822 Email verification
/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
*/

module.exports = model("user", userSchema)


