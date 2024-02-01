import User from "../../database/models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


async function getAll(){
    
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const newUser = await User.create({
        email,
        name,
        password: hashedPassword
      });
      return res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
    }
    // return res.status(201).json(newUser);
  } else if (req.method === "GET") {
    // Logika untuk mendapatkan semua buku
  } else {
    res.setHeader("Allow", ["POST", "GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
