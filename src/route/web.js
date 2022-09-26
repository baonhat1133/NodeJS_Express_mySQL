import express from "express";
import {
  getHomepage,
  getDetailPage,
  createNewUser,
  deleteCurrentUser,
  editUser,
  updateUser,
} from "../controllers/homeController";
let router = express.Router();

const initWebRoute = (app) => {
  router.get("/", getHomepage);
  router.get("/detail/user/:userId", getDetailPage);
  //cùng tên với form method
  router.post("/create-new-user", createNewUser);
  router.post("/delete-user", deleteCurrentUser);
  router.get("/edit-user/:editId", editUser);
  router.post("/update-user", updateUser);
  return app.use("/", router);
};

export default initWebRoute;
