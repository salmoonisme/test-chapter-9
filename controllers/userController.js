const { Users } = require("../models");
const bcrypt = require("bcryptjs");

class UserController {
  async register(req, res, next) {
    try {
      const { username, email, password } = req.body;
      const checkEmail = await Users.findOne({ where: { email } });
      if (checkEmail) {
        res.json({
          status: 200,
          error: error,
          message: "Email already exists",
        });
      }
      const hashPassword = await bcrypt.hash(password, 12);
      const createUser = await Users.create({
        username,
        email,
        password: hashPassword,
        status: "Inactive",
      });
      const checkUser = await Users.findOne({ where: { email } });
      const payload = {
        id: checkUser.id,
        email: checkUser.email,
        status: inactive,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET);
      const url = `http://localhost:${process.env.PORT}/api/user/verify/?token=${token}`;
      const msg = {
        from: `'Registration on Twitter <${process.env.EMAIL_TRANSPORTER}>'`,
        to: `${email}`,
        subject: "Invitation to Join Twitter",
        text: `Click this link to confirm your registration: "${url}"`,
      };
      const send = await transporter.sendMail(msg);
      res.json({
        status: res.status,
        message: "Registration complete please check your email",
      });
    } catch (error) {
      res.json({
        status: error.status,
        error: error.message,
      });
    }
  }
  async verify(req, res, next) {
    try {
      const decodedID = jwt.verify(req.query.token, process.env.JWT_SECRET);
      const verifyUser = await Users.update(
        {
          status: "Active",
        },
        { where: { id: decodedID.id } }
      );
      res.json({
        status: res.status,
        message: "User verified",
      });
    } catch (error) {
      res.json({
        status: error.status,
        error: error.message,
      });
    }
  }
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const checkEmail = await Users.findOne({ where: { email } });
      if (checkEmail.status !== "Active") {
        res.json({
          status: 401,
          message: "Please verify your email first",
        });
      }
      const passwordLogin = await bcrypt.compare(password, checkEmail.password);
      if (!passwordLogin) {
        res.json({
          status: 400,
          message: "Incorrect password",
        });
      }
      const checkUser = await Users.findOne({ where: { email } });
      const payload = {
        id: checkUser.id,
        email: checkUser.email,
        status: checkUser.status,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET);
      res.json({
        status: res.status,
        message: 'Login successful'
      })
    } catch (error) {
      res.json({
        status: error.status,
        error: error.message,
      });
    }
  }
  async tweet(req, res, next) {
    try {
      const { text, media } = req.body;
    } catch (error) {
      res.json({
        status: res.error,
        error: error.message
      })
    }
  }
}

module.exports = { UserController };
