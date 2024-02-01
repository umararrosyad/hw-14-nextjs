import User from "../../database/models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

async function register(req) {
  try {
    const { email, password } = req.body;
    // console.log("ini console" )

    // console.log({ email, password } )

    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user.id }, "secret");
    return token;
  } catch (error) {
    console.error(error);
  }
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const token = await register(req);
      return res.json({ token });
    } catch (error) {
      console.log(err);
      res.status(400).json({ message: "Invalid credentials" });
    }
  } else if (req.method === "GET") {
    // Logika untuk mendapatkan semua buku
  } else {
    res.setHeader("Allow", ["POST", "GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
