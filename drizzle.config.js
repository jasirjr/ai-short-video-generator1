/** @type {import("drizzle-kit").config} */
export default{
    schema:"./configs/schema.js",
    dialect:'postgresql',
    dbCredentials: {
      url:'postgresql://accounts:WlYF9MX5dTQg@ep-polished-grass-a5zaym7o.us-east-2.aws.neon.tech/ai-short-video-generator?sslmode=require'
    }
  }