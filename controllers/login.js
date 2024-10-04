const db = require("../routes/db-config");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      status: "error",
      error: "Please enter your email and password",
    });
  }

  db.query("SELECT * FROM users WHERE email = ?", [email], async (error, result) => {
    if (error) throw error;

    if (result.length === 0) {
      return res.json({
        status: "error",
        error: "Email not found",
      });
    }

    const user = result[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({
        status: "error",
        error: "Invalid password",
      });
    }

    return res.json({
      status: "success",
      success: "Login successful",
    });
  });
};

module.exports = login;
