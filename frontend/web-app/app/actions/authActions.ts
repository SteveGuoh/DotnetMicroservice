import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { cookies, headers } from "next/headers";
import { NextApiRequest } from "next";
import { getToken } from "next-auth/jwt";

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function getCurrentUser() {

    try {
        const session = await getSession();
        if (!session) return null;

        return session.user;
    } catch (error) {
        return null;
    }
}

export async function updateAuctionTest() {
    const data = {
        milage: Math.floor(Math.random() * 100000) + 1, 
    }

    const token = await getTokenWorkAround();

    const res = await fetch('http://localhost:6001/auctions/afbee524-5972-4075-8800-7d1f9d7b0a0c',
    {method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token?.access_token
    },
    body: JSON.stringify(data)});

    if (!res.ok) return {status: res.status, message: res.statusText};

    return res.statusText;
        
}

export async function getTokenWorkAround() {
    const req = {
        headers: Object.fromEntries(headers() as Headers),
        cookies: Object.fromEntries(
            cookies()
                        .getAll()
                        .map((cookie) => [cookie.name, cookie.value])
        )
    } as NextApiRequest;

    return await getToken({req});
}