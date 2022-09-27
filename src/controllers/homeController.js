// import connection from "../configs/connectDB";
import pool from "../configs/connectDB";
import multer from "multer";
let getHomepage = async (req, res) => {
  const [rows, fields] = await pool.execute("SELECT * FROM `users`");
  //   console.log("text:<<<<<<<", await pool.execute("SELECT * FROM `users`"));

  return res.render("index.ejs", { dataUser: rows, test: "okela" });
};

let getDetailPage = async (req, res) => {
  let id = req.params.userId;
  let [rows, fields] = await pool.execute("SELECT * FROM users WHERE id=?", [
    id,
  ]);
  return res.send(JSON.stringify(rows));
};

let createNewUser = async (req, res) => {
  //let [rows, fields] = await
  let { firstName, lastName, email, address } = req.body;
  await pool.execute(
    "INSERT INTO users (firstName, lastName, email, address) VALUES (?,?,?,?); ",
    [firstName, lastName, email, address]
  );
  return res.redirect("/"); // sau khi thêm nó redirect về /
};

let deleteCurrentUser = async (req, res) => {
  await pool.execute("DELETE FROM users WHERE id=?", [req.body.del_id]);
  return res.redirect("/");
};

let editUser = async (req, res) => {
  let id = req.params.editId;
  let [user, ...rest] = await pool.execute("SELECT * FROM users WHERE id=?", [
    id,
  ]);
  console.log(user);
  return res.render("update.ejs", { userEdit: user });
};
let updateUser = async (req, res) => {
  let { firstName, lastName, email, address, id } = req.body;
  await pool.execute(
    "UPDATE users SET firstName=?, lastName=?, email=?, address=? WHERE id=?",
    [firstName, lastName, email, address, id]
  );
  return res.redirect("/");
};
let uploadFile = (req, res) => {
  return res.render("uploadFile.ejs");
};
const upload = multer().single("mySingle");

let uploadSingle = (req, res) => {
  upload(req, res, function (err) {
    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    } else if (!req.file) {
      return res.send("Please select an image to upload");
    } else if (err instanceof multer.MulterError) {
      return res.send(err);
    } else if (err) {
      return res.send(err);
    }
  });
  return res.send(
    `upload success this image: <hr/><img src="/fileUpload/${req.file.filename}" width="300px" height="300px" alt="okela" /><br/> <a href="/upload-file">UPLOAD FILE ANOTHERS</a>`
  );
};

const uploadMul = multer().array("multiple_images");
var htmls = "";

let uploadMultiple = (req, res) => {
  let htmls = "";
  if (req.files !== []) {
    htmls = req.files.map((file) => {
      return `<img src="/fileUpload/${file.filename}" width="300" />`;
    });
  }
  uploadMul(req, res, function (err) {
    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    }
    let result = "You have uploaded these images: <hr />";
    const files = req.files;
    let index, len;

    // Loop through all the uploaded images and display them on frontend
    for (index = 0, len = files.length; index < len; ++index) {
      result += `<img src="${files[index].path}" width="300px" height="300px" style="margin-right: 20px;">`;
    }
    result += '<hr/><a href="./">Upload more images</a>';
  });
  console.log(htmls.join(""));
  return res.send(
    `upload success this image: <hr/> ${htmls.join(
      ""
    )} <br/><a href="/upload-file">UPLOAD FILE ANOTHERS</a>`
  );
};
export {
  getHomepage,
  getDetailPage,
  createNewUser,
  deleteCurrentUser,
  editUser,
  updateUser,
  uploadSingle,
  uploadMultiple,
  uploadFile,
};
