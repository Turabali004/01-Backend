import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"


const registerUser = asyncHandler( async (req,res) => {
    const {fullName, email, password, username} = req.body
    console.log("email:" , email);
    console.log(req.body);
    
     if(
        [fullName, email, password, username].some((field) => field?.trim() === "")
     ){
        throw new ApiErrorError(400, "All fields are required")
     }

     const existedUser = User.findOne({
        $or: [{email}, {username}]
     })
     if(existedUser) {
        throw new ApiError(400, "Email or username already exists")
     }

     const avtarLocalPath = req.files?.avatar[0]?.path;
     const covrImageLocalPath = req.files?.covreImage[0]?.path;

     if(!avtarLocalPath){
        throw new ApiError(400, "Avatar is required")
     }

     const avtar = await uploadOnCloudinary(avtarLocalPath);
     const coverImage = await uploadOnCloudinary(covrImageLocalPath);

     if(!avtar){
        throw new ApiError(400, "Avatar file is required")
     }


     const user = await User.create({
        fullName,
        avatar: avtar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
     })

     const createUser = await User.findById(user._id).select(
        "-password -refreshToken"
     )

     if(!createUser){
        throw new ApiError(500, "Internal server error")
     }

     return res.status(201).json(new ApiResponse(200, createUser, "User registered successfully"))
     
})


export { registerUser };                                                                        