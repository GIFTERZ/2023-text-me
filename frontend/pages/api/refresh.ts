import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  accessToken: string;
  refreshToken: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  res.status(200).json({
    accessToken: "at",
    refreshToken: "rt",
  });
}
