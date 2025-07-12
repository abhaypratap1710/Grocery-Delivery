import jwt from "jsonwebtoken";

// Seller Login: /api/seller/login
export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email);
    console.log(password);

    if (
      password === process.env.SELLER_PASSWORD &&
      email === process.env.SELLER_EMAIL
    ) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });

      res.cookie('sellerToken', token, {
        httpOnly: true, // Prevent JavaScript from accessing the cookie
        secure: process.env.NODE_ENV === 'production', // Use secure cookie in production
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict', // CSRF protection
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
      });

      return res.json({
        success: true,
        message: 'Seller logged in successfully',
      });
    } else {
      return res.json({ success: false, message: 'Invalid Credentials' });
    }
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: 'Internal Server Error' });
  }
};

// Seller Auth Check: /api/seller/is-auth
export const isSellerAuth = async (req, res) => {
  try {
    return res.json({ success: true });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};

// Seller Logout: /api/seller/logout
export const sellerlogout = async (req, res) => {
  try {
    res.clearCookie('sellerToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    });

    return res.json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};
