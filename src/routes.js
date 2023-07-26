/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable quotes */
const { addBook, getAllBooks } = require("./handler");

const routes = [
  {
    method: "POST",
    path: "/books",
    handler: addBook,
  },
  {
    method: "GET",
    path: "/books",
    handler: getAllBooks,
  },
  {
    method: "*",
    path: "/books",
    handler: (req, h) =>
      "halaman ini tidak dapat diakses dengan method tersebut",
  },
  {
    method: "*",
    path: "/{any*}",
    handler: (req, h) => "halaman tidak ditemukan",
  },
];

module.exports = routes;
