import { sign, verify } from "jsonwebtoken";
export const getUserId = (req: {
  headers: { authorization: string };
}): number => {
  const token = req.headers.authorization.split(" ")[1];
  const res =  verify(
    token,
    process.env.JWT_AUTH_SECRET 
  )
  return res['userId']
};
export const getToken = (id: number) => 
  sign(
    {
      userId: id,
    },
    process.env.JWT_AUTH_SECRET,
    { expiresIn: "1d" }
  );
export const validateEmail = (mail: string) => {
  if (
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      mail
    )
  ) {
    return true;
  }
  return false;
};  
