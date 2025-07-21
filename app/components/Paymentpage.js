"use client"
import React, { use, useEffect, useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Script from 'next/script'
import { ToastContainer, toast } from 'react-toastify';

const Paymentpage = ({ username }) => {
    const [paymentForm, setpaymentForm] = useState({ name: "", message: "", amount: "" });
    const [supportors, setsupportors] = useState([]);
    const [profilepic, setprofilepic] = useState(null);
    const [coverpic, setcoverpic] = useState(null);

    const { data: session } = useSession();
    const profileimg = session?.user?.image || "https://www.w3schools.com/howto/img_avatar.png";
    const coverimg = "https://c10.patreonusercontent.com/4/patreon-media/p/campaign/4842667/452146dcfeb04f38853368f554aadde1/eyJ3IjoxNjAwLCJ3ZSI6MX0%3D/18.gif?token-time=1748995200&token-hash=PII8uE5d9cF__tMhhAsgUcejp0XUEAo4wDFfuH2yPbs%3D"
    const email = session?.user?.email;
    useEffect(() => {
        const fetchpaymentData = async () => {
            const res = await fetch(`http://localhost:3000/api/paymentinfo`);
            const data = await res.json();
            setsupportors(data);
        }
        fetchpaymentData();
    }, [])

    useEffect(() => {
        const fetchUserdata = async () => {
            const res = await fetch(`http://localhost:3000/api/userinfo?email=${email}`)
            const data = await res.json();
            setprofilepic(data.profilePic)
            setcoverpic(data.coverPic)
        }
        if(email){
            fetchUserdata();
        }

    }, [session])

    const pay = async (e, amount) => {
    try {
        const response = await fetch('http://localhost:3000/api/useractions/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                amount,
                to_username: username,
                ...(paymentForm.name && paymentForm.message ? { paymentForm } : {}),
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Payment error response:", errorText);
            return alert("please enter valid details");
        }

        const order = await response.json();
        setpaymentForm({ name: "", message: "", amount: "" });

        const options = {
            key: "rzp_test_EzImtY61Dophh8",
            amount: order.amount,
            currency: "INR",
            name: "Get Me A Chai",
            description: "Test Transaction",
            image: "https://example.com/your_logo",
            order_id: order.id,
            prefill: {
                name: paymentForm.name || "Anonymous",
                email: session?.user?.email || "test@example.com",
                contact: "9000090000"
            },
            notes: {
                address: "User Address"
            },
            theme: {
                color: "#3399cc"
            },
            handler: async function (response) {
                try {
                    const verifyRes = await fetch("/api/razorpay", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        body: new URLSearchParams({
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature,
                        }),
                    });

                    if (verifyRes.ok) {
                        toast.success('Payment Successful 🎉', {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: true,
                            draggable: true,
                            theme: "dark",
                        });
                        window.location.href = `/${username}?paymentDone=thanks❤️${username.replaceAll(" ", "_")}`;
                    } else {
                        toast.error('Payment verification failed', {
                            position: "top-right",
                            theme: "dark",
                        });
                    }
                } catch (err) {
                    console.error("Error verifying payment:", err);
                    toast.error('Error verifying payment', {
                        position: "top-right",
                        theme: "dark",
                    });
                }
            }
        };

        const rzp1 = new Razorpay(options);
        rzp1.open();

    } catch (err) {
        console.error("Unexpected error during payment:", err);
        alert("Unexpected error. Check console.");
    }
};


    const handleChange = (e) => {
        setpaymentForm({
            ...paymentForm,
            [e.target.name]: e.target.value
        });
    }
    return (
        <div>
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
            <div>
                <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />
                <div className='relative flex flex-col justify-center items-center'>
                    <img src={coverpic ? coverpic : coverimg} className='w-full h-[45vh] object-cover' alt="cover pic" srcSet="" />
                    <img className='w-32 h-32 rounded-full absolute left-[37%] md:left-[46%] top-[81%] border object-cover' src={profilepic ? profilepic : profileimg} alt="profile pic" srcSet="" />
                </div>
                <div className='flex flex-col justify-center items-center gap-2 mt-20'>
                    <h2 className=' text-2xl font-bold text-white'>@{username}</h2>
                    <p className='text-center text-shadow-md text-gray-300'>Lets help {username} to get a chai!</p>
                    <p className='text-center text-gray-300'>
                       supportors <span className='font-bold'> {supportors.length}</span> . amount raised <span className='font-bold'>₹{supportors.reduce((acc, supportor) => acc + parseInt(supportor.amount), 0)}</span>
                    </p>

                </div>

                <div className='flex md:flex-row flex-col justify-center items-center gap-2 my-10 w-[80%] mx-auto'>
                    <div className=' bg-gray-900 w-full md:w-1/2 h-[330px] rounded-lg px-4 md:pb-6 flex flex-col gap-2 overflow-auto relative'>
                        <h3 className='text-[20px] font-bold sticky top-0 bg-gray-900/60 backdrop-blur-md z-10 p-2 rounded-md pt-6'>Supportors</h3>
                        {supportors.length == 0 ? <p className='text-sm text-gray-400'>No supportors yet</p> : supportors.map((supportor) => (
                            <div key={supportor._id} className='flex justify-start items-center gap-4 px-2 pt-1 pb-3'>
                                <span><img className='w-5 rounded-full' src="https://www.w3schools.com/howto/img_avatar.png" alt="supportorsImg" srcSet="" /></span>
                                <p className='text-sm'>
                                    <span className='font-bold w-fit'>{supportor.name}</span> donated <span className='font-bold'>₹{supportor.amount}</span> with a message, "{supportor.message}"</p>
                            </div>
                        ))}
                    </div>
                    <div className='bg-gray-900 w-full md:w-1/2 h-[330px] rounded-lg px-4 md:pb-6 flex flex-col gap-3'>
                        <h3 className='text-[20px] font-bold pt-6'>Make A Payment</h3>
                        <div className='flex flex-col gap-2'>
                            <input onChange={handleChange} name='name' value={paymentForm.name} type="text" className='bg-slate-800 rounded-full p-2' placeholder='Enter Name' />
                            <input onChange={handleChange} name='message' value={paymentForm.message} type="text" className='bg-slate-800 rounded-full p-2' placeholder='Enter Message' />
                            <input onChange={handleChange} name='amount' value={paymentForm.amount} type="text" className='bg-slate-800 rounded-full p-2' placeholder='Enter Amount' />
                            <div className='flex justify-center items-center gap-2'>
                                <button
                                    className="relative inline-flex w-full h-9 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-150"
                                    onClick={(e) => pay(e,paymentForm.amount)} disabled={paymentForm.name?.length<1 || paymentForm.message?.length<1}>
                                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)] " />
                                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-7 text-sm font-medium text-white backdrop-blur-3xl ">
                                        pay
                                    </span>
                                </button>
                            </div>
                        </div>
                        <div className=' flex justify-start items-center gap-2'>
                            <div className='bg-slate-800 px-3 py-1.5 rounded-full hover:cursor-pointer text-sm' onClick={(e) => pay(e,10)}>pay ₹10</div>
                            <div className='bg-slate-800 px-3 py-1.5 rounded-full hover:cursor-pointer text-sm' onClick={(e) => pay(e,20)}>pay ₹20</div>
                            <div className='bg-slate-800 px-3 py-1.5 rounded-full hover:cursor-pointer text-sm' onClick={(e) => pay(e,30)}>pay ₹30</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Paymentpage
