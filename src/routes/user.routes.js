// import { Router } from "express";
// import { registerUser } from "../controllers/user.controllers.js";
// import {upload} from "../middlewares/multer.middleware.js"

// const router = Router();
// router.route("/register").post(
//     upload.fields([
//         {
//             name: "avatar",
//             maxCount: 1
//         },
//         {
//             name: "covreImage",
//             maxCount: 1
//         }
//     ]),
//     registerUser
// )


// export default router;


import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
//register user
router.route("/register").post(
    upload.fields([
        { name: "avatar", maxCount: 1 },
        { name: "coverImage", maxCount: 1 }
    ]),
    registerUser
);

// login user
router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(verifyJWT,logoutUser);

export default router;
