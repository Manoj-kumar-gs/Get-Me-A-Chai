import dbConnect from "@/utils/dbConnect";
import Payment from "@/models/Payment";

export async function GET(req) {
  try {
    await dbConnect();
    const payments = await Payment.find({
      done: true
    }).sort({ amount: -1 });

    return Response.json(payments, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error fetching payments:", err.message);
    return new Response(
      JSON.stringify({ error: "Failed to fetch payments" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
