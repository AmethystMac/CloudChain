import express from "express";
import aws from "aws-sdk"
import cors from "cors";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import requireAuth from "./middleware/authMiddleware.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

aws.config.update({region: "ap-south-1"});
const dynamodb = new aws.DynamoDB({apiVersion: "2012-08-10"});

const maxAge = 60 * 60 * 24;

const createToken = (username) => {
    return jwt.sign({ username }, "aReallyStrongSecretKey", {
        expiresIn: maxAge
    });
}

app
    .get("/api", (req, res) => {
        return res.json([{ "name": "mac" }, { "name": "hehe"}]);
    })

    .get("/api/current-user", requireAuth, async (req, res) => {
        return res.json({ "status": "success", "response": res.locals.username });
    
    })

    .post("/api/verify-user", async (req, res) => {
        const username = req.body.username;
        const  password = req.body.password;

        const item = {
            TableName: "CloudChain-UserData",
            Key: {
              "username": {S: username},
            }
        };

        dynamodb.getItem(item, async (err, data) => {
            if(err) {
                return res.json({ "status": "failed" });

            } else {
                if(data.Item) { 
                    try {
                        const auth = await bcrypt.compare(password, data.Item.password.S);
                        
                        if(auth) {
                            const token = createToken(username);
                            
                            res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
                            return res.json({ "status": "success" });
                        }

                    } catch(err) {
                        console.log(err);
                    }

                } else {
                    return res.json({ "status": "failed" });

                }
            }
        })
    })

    .post("/api/create-user", async (req, res) => {
        const username = req.body.username;

        const salt = await bcrypt.genSalt();
        const password = await bcrypt.hash(req.body.password, salt);

        const getItem = {
            TableName: "CloudChain-UserData",
            Key: {
              "username": {S: username},
            }
        };

        const item = {
            TableName: "CloudChain-UserData",
            Item: {
              "username": {S: username},
              "password": {S: password}
            }
        };

        dynamodb.getItem(getItem, (err, data) => {
            if(err) {
                return res.json({ "status": "failed" });

            } else {
                if(!data.Item) {
                    dynamodb.putItem(item, (err, data) => {
                        if(err) {
                            return res.json({ "status": "failed" });
    
                        } else {
                            return res.json({ "status": "success" });

                        }
                    })

                } else {
                    return res.json({ "status": "failed" });

                }
                
            }
        })
    })

app.listen(3000, () => {
    console.log("Server is listening to requests from port 3000...");
});