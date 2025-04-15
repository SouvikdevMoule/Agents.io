import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        name: v.string(),
        email: v.string(),
        credits: v.number(),
        password: v.optional(v.string()),
        subID: v.optional(v.string()),

    }),

    DiscussionRoom: defineTable({
        coachingoption: v.string(),
        topic: v.string(),
        expertname: v.string(),
        conversation: v.optional(v.any()), // Fixed typo: changed "coversation" to "conversation"
        feedback: v.optional(v.string()),
        user: v.optional(v.id("users")), // Reference to the users table
    })
});