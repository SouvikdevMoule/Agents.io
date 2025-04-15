// convex/DiscussionRoom.ts
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const CreateNewRoom = mutation({
  args: { 
    coachingoption: v.string(),
    topic: v.string(),
    expertname: v.string(),
    user: v.id('users'), // Reference to the users table
  },
  handler: async (ctx, args) => {
    // Check if user is logged in
   
    // Create the room
    const result = await ctx.db.insert('DiscussionRoom', {
      coachingoption: args.coachingoption,
      topic: args.topic,
      expertname: args.expertname,
      user: args.user, // Reference to the users table
      
    });
    
    return result;
  },
});


export const GetDiscussionRoom = query({
    args:{
        id:v.id('DiscussionRoom')
    },
    handler:async(ctx,args)=>{
        const result = await ctx.db.get(args.id);
        return result;
    }
})

export const UpdateConversation = mutation({
  args: {
      id: v.id('DiscussionRoom'),
      conversation: v.any()
  },
  handler: async (ctx, args) => {
      const result = await ctx.db.patch(args.id, {
          conversation: args.conversation,
      });
      return result;
  }
});

export const UpdateFeedback = mutation({
  args: {
      id: v.id('DiscussionRoom'),
      feedback: v.any()
  },
  handler: async (ctx, args) => {
      const result = await ctx.db.patch(args.id, {
          feedback: args.feedback,
      });
      return result;
  }
});

export const GetAllDiscussionRooms = query({
  args:{
      user: v.optional(v.id('users')) // Reference to the users table
  },
  handler:async(ctx,args)=>{
      const result = await ctx.db.query('DiscussionRoom').filter(q => q.eq(q.field('user'), args.user)).order('desc').collect();
      return result;
  }
})

export const GetAllDiscussionRoomsByUser = query({
  args: {
    user: v.optional(v.id('users')), // Reference to the users table, optional
  },
  handler: async (ctx, args) => {
    const query = ctx.db.query('DiscussionRoom');
    
    // Apply user filter only if user is provided
    const filteredQuery = args.user
      ? query.filter((q) => q.eq(q.field('user'), args.user))
      : query;

    const result = await filteredQuery
      .order('desc')
      .collect();

    // Map results to include only requested fields
    return result.map(({ _id, topic, _creationTime, coachingoption, expertname }) => ({
      _id,
      topic,
      _creationTime,
      coachingoption,
      expertname,
    }));
  },
});