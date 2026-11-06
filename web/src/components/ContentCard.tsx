import Link from "next/link";
import type { Content } from "@/lib/types";
import { badgeVar } from "@/lib/theme";

const typeLabels: Record<Content["type"], string> = {
  movie: "Movie",
  tv: "TV",
  music: "Music",
};

export default function ContentCard({ item }: { item: Content }) {
  return (
    <Link href={`/content/${item._id}`} className="card">
      <div className="card-poster">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.posterUrl} alt={item.title} loading="lazy" />
        <span
          className="card-badge"
          style={{ background: badgeVar(item.type) }}
        >
          {typeLabels[item.type]}
        </span>
        <span className="card-rating-pill">
          ★ {(item.averageRating ?? 0).toFixed(1)}
        </span>
      </div>
      <div className="card-body">
        <h3 className="card-title">{item.title}</h3>
        <div className="card-meta">
          <span>{item.releaseYear || "—"}</span>
          <span>{item.creator?.split(",")[0]}</span>
        </div>
      </div>
    </Link>
  );
}
