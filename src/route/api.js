import express from "express";
import {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
} from "../controllers/APIController";
let router = express.Router();

const initAPIRoute = (app) => {
  //Chuẩn REST API, CRUD = post/get/put/delete
  router.get("/users", getAllUsers);
  router.post("/create-users", createNewUser);
  router.put("/update-users", updateUser);
  router.delete("/delete-users/:id", deleteUser);
  return app.use("/api/v1/", router);
};

export default initAPIRoute;
