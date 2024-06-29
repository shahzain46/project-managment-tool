const { DOMAIN_URL } = process.env;
const jwt = require('jsonwebtoken');
const bcryptService = require('../services/bcrypt');
const mailer = require('../services/mailer');
const { User, UserWorkspaces } = require('../models');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const invitedUser = await UserWorkspaces.find({ where: { email } });

    const user = await User.create({ name, email, password });
    const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: 10800 });

    if (invitedUser) {
      await UserWorkspaces.update({ isAccepted: true, userId: user.id }, { where: { email } });
      await user.update({ isActivated: true, isVerified: true }, { where: { id: user.id } });
    }

    if (!invitedUser) {
      const emailToken = jwt.sign({ id: user.id }, 'emailSecret', { expiresIn: '1d' });

      const url = `${DOMAIN_URL}/dashboard/confirmation/${emailToken}`;

      await mailer({
        to: user.email,
        from: 'support@taska.space',
        subject: 'Confirm your email',
        html: `<a href="${url}">${url}</a>`,
      });
    }

    return res.status(200).json({ token, user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    try {
      const user = await User.scope('withPassword').findOne({ where: { email } });

      if (!user) {
        return res.status(400).json({ message: 'Email or password is wrong' });
      }

      if (bcryptService.comparePassword(password, user.password)) {
        const token = jwt.sign({ id: user.id }, 'secret');

        delete user.dataValues.password;

        return res.status(200).json({ token, user });
      }

      return res.status(400).json({ message: 'Email or password is wrong' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  return res.status(400).json({ message: 'Email or password is wrong' });
};

exports.validate = async (req, res) => {
  const { token } = req;

  try {
    jwt.verify(token, 'secret');

    return res.status(200).json({ valid: true });
  } catch (e) {
    return res.status(401).json({ valid: false, message: 'Invalid token' });
  }
};

exports.confirmation = async (req, res) => {
  try {
    const { token } = req.body;

    const decoded = jwt.verify(token, 'emailSecret');

    if (!decoded) {
      return res.status(400).json({ message: 'Invalid token or its expired.' });
    }

    await User.update({ isVerified: true }, { where: { id: decoded.id } });

    return res.status(200).json();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.resend = async (req, res) => {
  try {
    const { user: { id } } = req;

    const user = await User.findById(id);

    const emailToken = jwt.sign({ id: user.id }, 'emailSecret', { expiresIn: '1d' });

    const url = `${DOMAIN_URL}/dashboard/confirmation/${emailToken}`;

    await mailer({
      to: user.email,
      from: 'support@taska.space',
      subject: 'Confirm your email',
      html: `<a href="${url}">${url}</a>`,
    });

    return res.status(200).json();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
