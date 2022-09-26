// import connection from "../configs/connectDB";
import pool from "../configs/connectDB";
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
export {
  getHomepage,
  getDetailPage,
  createNewUser,
  deleteCurrentUser,
  editUser,
  updateUser,
};
