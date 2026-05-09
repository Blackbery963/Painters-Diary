import FeedCard from "./FeedCard";
import { FEED_DATA } from "./FEED_DATA";
 
export default function LandingFeed() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-10">
      {FEED_DATA.map((post) => (
        <FeedCard key={post.id} post={post} />
      ))}
    </div>
  );
}