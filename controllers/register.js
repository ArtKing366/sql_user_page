const db = require("../routes/db-config");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { email, password: Npassword } = req.body;

  if (!email || !Npassword) {
    return res.json({
      status: "error",
      error: "Enter your email and password",
    });
  }

  try {
    db.query("SELECT email FROM users WHERE email = ?", [email], async (error, result) => {
      if (error) throw error;
      
      if (result[0]) {
        return res.json({
          status: "error",
          error: "Email has already been registered",
        });
      } else {
        const hashedPassword = await bcrypt.hash(Npassword, 8);

        db.query(
          "INSERT INTO users SET ? ",
          { email: email, password: hashedPassword },
          (error, results) => {
            if (error) throw error;
            return res.json({
              status: "success",
              success: "You have been registered",
            });
          }
        );
      }
    });
  } catch (err) {
    console.error("Error during registration:", err);
    res.json({
      status: "error",
      error: "Server error",
    });
  }
};

module.exports = register;
