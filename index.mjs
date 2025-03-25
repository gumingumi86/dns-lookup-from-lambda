import dns from "dns/promises";
import dotenv from "dotenv";
dotenv.config();

const LOOKUPED_END_POINT = process.env.LOOKUPED_END_POINT;

export const handler = async (event) => {
  try {
    const domain = LOOKUPED_END_POINT;

    console.log(`Running DNS lookup for: ${domain}`);

    const result = await dns.lookup(domain);

    console.log("DNS lookup result:", result);

    return {
      statusCode: 200,
      body: JSON.stringify({ address: result.address, family: result.family }),
    };
  } catch (error) {
    console.error("Error executing DNS lookup:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error", details: error.message }),
    };
  }
};
