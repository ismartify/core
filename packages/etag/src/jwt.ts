import jwt from "jsonwebtoken";


const secret = "shhhhh";
const exp = Math.floor(Date.now() / 1000) + (60 * 60);
const playload = { foo: "bar", iat: Math.floor(Date.now() / 1000) - 30 }
const token = jwt.sign(playload, secret);
console.log(token);
