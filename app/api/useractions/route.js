import Razorpay from "razorpay";
import dbConnect from "@/utils/dbConnect";
import Payment from "@/models/Payment";

export async function POST(req) {
  try {
    const body = await req.json();
    const { amount, to_username, paymentForm } = body;

    await dbConnect();

    const instance = new Razorpay({
      key_id: process.env.KEY_ID,
      key_secret: process.env.KEY_SECRET,
    });

    const options = {
      amount: Number.parseInt(amount) * 100,
      currency: "INR",
    };

    const order = await instance.orders.create(options);

    await Payment.create({
      name: paymentForm?.name || to_username,
      to_user: to_username,
      oid: order.id,
      message: paymentForm?.message || `my contribution for your project`,
      amount: order.amount / 100,
    });

    return Response.json(order);
  } catch (error) {
    console.error("Error in payment route:", error.message, error.stack);
    return new Response(JSON.stringify({ error: error.message || 'Failed to create order' }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
