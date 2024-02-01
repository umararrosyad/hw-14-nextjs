import Books from "../../../database/models/books";
import jwt from "jsonwebtoken";


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
async function deleteBook(req, id) {
  try {
    // console.log(id);
    await Books.destroy({
      where: { id: Number(id) }
    });
  } catch (err) {
    console.error(err);
  }
}

async function edit(req, id) {
  try {
    const { title, author, publisher, year, pages } = req.body;
    // console.log({ title, author, publisher, year, pages } )
    const books = await Books.findByPk(id);
    const book = await books.update({
      title,
      author,
      publisher,
      year,
      pages
    });
    return book;
  } catch (err) {
    console.error(err);
  }
}

export default async function handler(req, res) {
  const {
    query: { id },
    method
  } = req;

  if (method === "GET") {
    const book = await Books.findByPk(id);
    return res.status(200).json(book);
  } else if (req.method === "DELETE") {
    authenticateTokenMiddleware(req, res, async() => {
      try {
        await deleteBook(req, id);
        return res.status(200).json("book deteted");
      } catch (error) {
        console.error(error);
      }
    });
    
  } else if (req.method === "PUT") {
    authenticateTokenMiddleware(req, res, async() => {
      try {
        const book = await edit(req, id);
        return res.status(200).json(book);
      } catch (error) {
        console.error(error);
      }
      
    });
  } else {
    res.setHeader("Allow", ["GET", "DELETE", "PUT"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
