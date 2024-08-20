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
import { registerUser } from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(
    upload.fields([
        { name: "avatar", maxCount: 1 },
        { name: "coverImage", maxCount: 1 }
    ]),
    registerUser
);

export default router;
