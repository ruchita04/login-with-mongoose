import User from "../models/userModule.js";
import catchErrorApi from "../utils/catchErrorApi.js";
import { filterResponse } from "../utils/utils.js";
import jwt from "jsonwebtoken";
import Image from "../models/imageModel.js";
import AbstractApplicationError from "../utils/AbstractApplicationError.js";
import multer from "multer";

const signUp = catchErrorApi(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  });

  const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
    expiresIn: process.env.SECRET_EXPIRY,
  });

  const finalResult = filterResponse(user, "name", "email", "_id");

  res.status(201).json({
    status: "success",
    token,
    data: finalResult,
  });
});

const signIn = catchErrorApi(async (req, res, next) => {
  const { email, password } = req.body;

  if (!password || !email)
    return next(
      new AbstractApplicationError("credential is not provided", 400)
    );

  const user = await User.findOne({ email });

  if (!user || !(await user.validatePassword(password, user.password))) {
    return next(new AbstractApplicationError("Credentials are not vaild", 401));
  }

  if (user.active !== true) {
    return next(new AbstractApplicationError("This user has been bannd", 401));
  }

  const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
    expiresIn: process.env.SECRET_EXPIRY,
  });

  res.status(201).json({
    status: "success",
    token,
  });
});

const authenticateUser = catchErrorApi(async (req, res, next) => {
  let token = "";
  if (req.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) return next(new AbstractApplicationError("Not authorized", 401));

  const varifyToken = await jwt.verify(token, process.env.SECRET_KEY);

  const user = await User.findById(varifyToken.id);

  if (!user) {
    return next(new AbstractApplicationError("User Does Not exist", 401));
  }

  if (!user.tokenPasswordValidation(varifyToken.iat)) {
    return next(
      new AbstractApplicationError("Password has been changed, Relogin", 401)
    );
  }

  if (user.active !== true) {
    return next(
      new AbstractApplicationError("This user has not been authorized", 401)
    );
  }

  req.user = user;
  next();
});

const authorizeUser = (...roles) =>
  catchErrorApi(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AbstractApplicationError("No access to perform this task", 403)
      );
    }

    next();
  });

const userUpdateRole = catchErrorApi(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(201).json({
    status: "success",
    user,
  });
});

const userSoftDelete = catchErrorApi(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { active: false },
    {
      new: true,
    }
  );
  res.status(200).json({
    status: "success",
  });
});

// const storage = catchErrorApi(
//   multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, "../uploads");
//     },
//     filename: (req, file, cb) => {
//       console.log(file);
//       cb(null, file.originalname + "-" + Date.now());
//     },
//   })
// );

// const upload = multer({ storage: storage });

const upload = catchErrorApi(
  multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "D:/Programm/digikull/Backend/modelAtlas/envExpress/uploads");
      },
      filename: (req, file, cb) => {
        cb(null, file.fieldname + Date.now() + ".jpg");
      },
    }),
  }).single("images")
);

export {
  signUp,
  signIn,
  authenticateUser,
  authorizeUser,
  userUpdateRole,
  userSoftDelete,
  upload,
};
