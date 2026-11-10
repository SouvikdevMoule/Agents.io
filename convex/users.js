import { v } from "convex/values";
import { mutation } from "./_generated/server";


export const CreateUser = mutation({
    args: { name: v.string(), email: v.string() },
    handler:async(ctx, args )=>{
        // Check if the user already exists
        const userData = await ctx.db.query('users').filter(q => q.eq(q.field('email'), args.email)).collect()
        // Create the user
        if(userData.length === 0){
            const userId = await ctx.db.insert('users', {
                name: args.name,
                email: args.email,
                credits: 50000,
            });
            // Return the full document including _id
            return await ctx.db.get(userId);
        }
        return userData[0];
    }
})

export const UpdateUserCredits = mutation({
    args: { 
        _id: v.id("users"), 
        credits: v.number() 
    },
    handler: async (ctx, args) => {
        // Check if user exists
        const user = await ctx.db.get(args._id);
        
        if (!user) {
            throw new Error("User not found");
        }

        // Update credits
        await ctx.db.patch(args._id, {
            credits: args.credits
        });

        // Return updated user data
        return await ctx.db.get(args._id);
    }
});