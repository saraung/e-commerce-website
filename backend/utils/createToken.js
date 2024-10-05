import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "30d" });

  res.cookie('jwt', token, {
    httpOnly: true,                // Cookie is inaccessible via JavaScript
    secure: true,                 // Change to true in production for HTTPS
    sameSite: 'None',              // Ensure to use 'None' for cross-origin requests
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days expiration
  });

  return token;
};

export default generateToken;





// import jwt from 'jsonwebtoken'

// const generateToken=(res,userId)=>{
//     const token =jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"30d"});

//     res.cookie('jwt',token,
//         {   httpOnly: true,
//             secure:process.env.NODE_ENV || "development",
//             sameSite:"strict",
//             maxAge:30*24*60*60*1000
//         }
//     )

//     return token;
// }

// export default generateToken;