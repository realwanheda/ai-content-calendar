import cron from "node-cron";
import Post from "../models/Post.js";
import postToLinkedIn from "../services/linkedinService.js";

const scheduleLinkedInPosts = () => {
  cron.schedule("* * * * *", async () => {
    console.log("🔄 Checking for scheduled LinkedIn posts...");
    const now = new Date();

    try {
      const postsToPost = await Post.find({
        scheduledDate: { $lte: now },
        status: "pending",
      });
      for (const post of postsToPost) {
        console.log("✅ Posting to LinkedIn:", post.content);
        const message = post.content;
        if (message.length > 300) {
          const str1 = message.slice(0, 100);
          const str2 = message.slice(101, 200);
          const str3 = message.slice(200, message.length);

          const res = await postToLinkedIn("This is 1st post \n" + str1);
          const res1 = await postToLinkedIn(
            "This is 2nd post \n" + str2 + "\n Link to thread : " + res.url
          );
          await postToLinkedIn(
            "This is 3rd post \n" + str3 + "\n Link to thread : " + res1.url
          );
        } else {
          await postToLinkedIn(message);
        }
        post.status = "posted";
        await post.save();
      }
    } catch (error) {
      // }
      console.error("❌ Error in scheduler:");
    }
  });
};

export default scheduleLinkedInPosts;
