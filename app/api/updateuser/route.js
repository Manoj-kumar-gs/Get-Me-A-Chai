import dbConnect from "@/utils/dbConnect";
import User from "@/models/User";
import Username from "@/app/[username]/page";

export async function POST(req) {
    await dbConnect();
    const body = await req.json();
    const findUser = await User.findOne({email:body.email})

    if (!findUser) {
        return new Response(
            JSON.stringify({ error: "Invalid Email." }),
            {
                status: 400,
                headers: { "content-type": "application/json" },
            }
        ); 
    }
    
    await User.updateOne({email:body.email},{
           name:body.name?body.name:findUser.name,
           email:body.email,
           username:body.username?body.username:findUser.username,
           profilePic:body.profilePic,
           coverPic:body.coverPic,
           phoneNo:body.phoneNo,
        })
        return new Response(JSON.stringify(findUser), {
                status: 201,
                headers: { 'content-type': 'application/json' },
            })
}