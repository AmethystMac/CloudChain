import jwt from "jsonwebtoken";

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    if(token) {
        jwt.verify(token, "aReallyStrongSecretKey", (err, decodedToken) => {
            if(err) {
                console.log(err);
                return res.json({ "status": "failed" });
            }

            res.locals.username = decodedToken.username;
            next();

        });

    } else {
        return res.json({ "status": "failed" });
    }
}

export default requireAuth;