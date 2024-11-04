import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { sendToken } from "../utils/jwtToken.js";

export const register = catchAsyncError(async (req, res, next) => {
  const { name, email, phone, password, role } = req.body;

  if (!name || !email || !phone || !password || !role) {
    return next(new ErrorHandler("Please Fillup the full form!"));
  }
  const isEmail = await User.findOne({ email });
  if (isEmail) {
    return next(new ErrorHandler("Email already exists!"));
  }
  const user = await User.create({
    name,
    email,
    password,
    phone,
    role,
  });
  sendToken(user, 200, res, "User Registered Successfully");
});

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return next(new ErrorHandler("Please provide all information", 400));
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid Username Or password", 400));
  }

  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Password Doesnt match", 400));
  }

  if (user.role !== role) {
    return next(new ErrorHandler("User with this role not found", 400));
  }
  sendToken(user, 200, res, "User Logged in successfully");
});

export const logout = catchAsyncError(async (req, res, next) => {
  res
    .status(201)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "User logged out successfully!",
    });
});

export const getUser = catchAsyncError((req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});
/*{
  "name":"hplaptop",
  "phone":10987654532,
  "email":"hp@yahoo.com",
  "password":"hphphp",
  "role":"Employer"
}*/