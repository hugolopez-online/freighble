import bcrypt from "bcryptjs";

const SALT = bcrypt.genSaltSync(6);

export { SALT };
