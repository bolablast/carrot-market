import { NextApiRequest, NextApiResponse } from "next";
import client from "src/libs/server/client";
import withHandler from "src/libs/server/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { phone, email } = req.body;
  const user = phone ? { phone: +phone } : { email };
  const token = await client.token.create({
    data: {
      payload: Math.floor(100000 + Math.random() * 900000) + "",
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: "Anonymous",
            ...user,
          },
        },
      },
    },
  });
  console.log("토큰은", token);
  return res.status(200).end();
}

export default withHandler("POST", handler);
