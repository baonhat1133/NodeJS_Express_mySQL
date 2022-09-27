import express from "express";
import {
  getHomepage,
  getDetailPage,
  createNewUser,
  deleteCurrentUser,
  editUser,
  updateUser,
  uploadSingle,
  uploadMultiple,
  uploadFile,
} from "../controllers/homeController";
import multer from "multer";
let router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "D:/CODE_FS/On_NodeJS/src/public/fileUpload");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname);
  },
});
const imageFilter = function (req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  fileFilter: imageFilter,
}).single("mySingle");
const uploadMul = multer({
  storage: storage,
  fileFilter: imageFilter,
}).array("multiple_images");

const initWebRoute = (app) => {
  router.get("/", getHomepage);
  router.get("/detail/user/:userId", getDetailPage);
  //cùng tên với form method
  router.post("/create-new-user", createNewUser);
  router.post("/delete-user", deleteCurrentUser);
  router.get("/edit-user/:editId", editUser);
  router.post("/update-user", updateUser);

  //upload file
  router.get("/upload-file", uploadFile);
  router.post("/upload-single", upload, uploadSingle);
  router.post("/upload-multiple", uploadMul, uploadMultiple);
  return app.use("/", router);
};

export default initWebRoute;
