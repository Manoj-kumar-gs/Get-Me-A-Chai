import Razorpay from "razorpay";
import dbConnect from "@/utils/dbConnect";
import Payment from "@/models/Payment";
import User from "@/models/User";

export async function POST(req) {
  try {
    const body = await req.json();
    const { amount, to_username, paymentForm } = body;

    await dbConnect();

    const user = await User.findOne({ username: to_username });

    if (!user?.razorpayKeyId || !user?.razorpayKeySecret) {
      return new Response(
        JSON.stringify({ error: "User hasn't configured Razorpay" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const instance = new Razorpay({
      key_id: user.razorpayKeyId,
      key_secret: user.razorpayKeySecret,
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
