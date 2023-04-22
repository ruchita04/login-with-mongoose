import express from "express";
import {
  authenticateUser,
  authorizeUser,
  signIn,
  signUp,
  userSoftDelete,
  upload,
  userUpdateRole,
} from "../controllers/authenticationController.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.delete(
  "/softUserDelete/:id",
  authenticateUser,
  authorizeUser("admin"),
  userSoftDelete
);
router.patch(
  "/assignRole/:id",
  authenticateUser,
  authorizeUser("admin"),
  userUpdateRole
);

router.post("/upload", upload);

export default router;
