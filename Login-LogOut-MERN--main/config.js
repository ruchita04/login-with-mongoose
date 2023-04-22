import dotenv from "dotenv";
// import bcrypt from "bcryptjs";

dotenv.config({
  path: "./config.env",
});

// async function cryp() {
//   const encrypt = await bcrypt.hash("shubham", 12);
//   console.log(encrypt);
// }
// cryp();

//password

//$2a$12$vMt5zH6xNxCCuAHI3/yYFOoOHD6Swq7gxaOT.Jg29p.jXfiBqnvsK
//$2a$12$O6MteSAISZZCaEirBQD/Luvt31x1WX5f/s4Xc2eZd3brSKFcspqNy

// 2a == bcrypt algorithem
// 12 == cost factor
// after third $ first 22 charcter == salt
