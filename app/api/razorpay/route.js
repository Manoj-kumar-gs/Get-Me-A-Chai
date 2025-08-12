import { NextResponse} from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Razorpay from "razorpay";
import dbConnect from "@/utils/dbConnect";
import Payment from "@/models/Payment";


export async function POST(req) {
    await dbConnect();
      const rawBody = await req.text();

  const params = new URLSearchParams(rawBody);
  const body = Object.fromEntries(params);
 const {razorpay_payment_id, razorpay_order_id, razorpay_signature } = body;

  const isValid = validatePaymentVerification(
    {
      order_id: razorpay_order_id,
      payment_id: razorpay_payment_id,
    },
    razorpay_signature,
    process.env.KEY_SECRET
  );

  if (!isValid) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const updatedPayment = await Payment.findOneAndUpdate(
    { oid: razorpay_order_id },
    { done: true },
    { new: true, runValidators: true }
  );
  const u = updatedPayment.name;
  const v = u.replaceAll("%20","_")

  return NextResponse.redirect(`${process.env.URL}/${updatedPayment.to_user}?paymentDone=thanks❤️${v}`);
}

export async function GET(req) {
    const {searchParams} = new URL(req.url);
    const order = searchParams.get('order') 
    await dbConnect();
    const payment = await Payment.findOne({
        oid: order
    });
    if(!payment?.done) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }
    return new Response(JSON.stringify(payment), { status: 200 }); 
}