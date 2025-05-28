import dbConnect from "@/utils/dbConnect";
import User from "@/models/User";

export async function POST(req) {
    const body = await req.json();
    await dbConnect();
    const user = await User.findOne({
        email: body.email
    });
    if(!user) {
        return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }
    return new Response(JSON.stringify(user), { status: 200 });
}
export async function GET(req) {
    const {searchParams} = new URL(req.url);
    const email = searchParams.get('email') 
    await dbConnect();
    const user = await User.findOne({
        email: email
    });
    if(!user) {
        return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }
    return new Response(JSON.stringify(user), { status: 200 }); 
}