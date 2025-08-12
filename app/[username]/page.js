// app/[username]/page.js
import React from 'react'
import Paymentpage from '../components/Paymentpage'

const Username = async ({ params }) => {
  const { username } = await params;
  return <Paymentpage username={username} />;
}

export default Username;

export async function generateMetadata({ params }) {
  const { username } = await params;

  return {
    title: `${username} - Get Me A Chai`,
    description: "Secure payment processing for your chai orders",
  };
}
