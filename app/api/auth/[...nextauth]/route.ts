

import { connectDB } from "@/app/database";
import User from "@/models/User";
import { log } from "console";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";



console.log({
    clientId: process.env.GOOGLE_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
});

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })
    ],
    callbacks: {

        async session({ session }: { session: any }) {

            const sessionUser = await User.findOne({ email: session.user.email });
            session.user.id = sessionUser._id.toString();

            return session;
        },
        async signIn({ profile }) {
            try {
                await connectDB();

                const userExists = await User.findOne({ email: profile?.email });

                // if not, create a new document and save user in MongoDB
                if (!userExists) {
                    await User.create({
                        email: profile?.email,
                        username: profile?.name.replace(" ", "").toLowerCase(),
                        image: profile?.picture,
                    });
                }

                return true;
            } catch (error) {
                console.log(error);
                return false;
            }

        }
    }

})

export { handler as GET, handler as POST }