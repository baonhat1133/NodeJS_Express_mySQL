import express from "express";
const configViewEngine = (app) => {
  //khi chạy server, nó sẽ tự tìm đến thư mục public, chèn css: /css/style.css
  app.use(express.static("./src/public")); // những file public cho phép truy cập được vào
  app.set("view engine", "ejs"); // cấu hình v e là ejs
  app.set("views", "./src/views"); //cho express biết vị trí file ejs
};

export default configViewEngine;
