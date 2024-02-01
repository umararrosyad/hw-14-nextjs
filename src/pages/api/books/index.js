import Books from "../../../database/models/books";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
// import si from "../../../public";
import path from "path";

function authenticateTokenMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.status(401).json({ message: "Unauthorized" });

  try {
    const user = jwt.verify(token, "secret");
    req.userId = user.userId; // Menyimpan userId ke dalam request untuk penggunaan selanjutnya
    next(); // Lanjutkan ke handler API berikutnya
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
}

const multer = require("multer");
import { NextApiRequest, NextApiResponse } from "next";
export const config = {
  api: {
    bodyParser: false // Nonaktifkan bodyParser bawaan Next.js agar bisa menangani multipart/form-data
  }
};

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(process.cwd(), "public"));
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname); // Nama file yang disimpan
    }
  })
});

async function create(req) {
  try {
    const { title, author, publisher, year, pages } = req.body;
    // console.log( { title, author, publisher, year, pages })
    const book = await Books.create({
      title,
      author,
      publisher,
      year,
      pages,
      image: req.file.filename // Tambahkan path ke gambar yang diunggah ke data buku
    });
    return book;
  } catch (err) {
    console.error(err);
  }
}



export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      authenticateTokenMiddleware(req, res, () => {
        upload.single("uploads")(req, res, async function (err) {
          if (err instanceof multer.MulterError) {
            return res.status(500).json({ message: err });
          } else if (err) {
            return res.status(500).json({ message: err });
          }
          // console.log(req.file);
          const book = await create(req);
          res.json({ book });
        });
      });
      
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: "cant create books" });
    }
  }  else if (req.method === "GET") {
    try {
      const book = await Books.findAll();
      return res.status(200).json(book);
    } catch (error) {
      console.error(error);
    }
  }  else {
    res.setHeader("Allow", ["POST", "GET","DELETE", "PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
