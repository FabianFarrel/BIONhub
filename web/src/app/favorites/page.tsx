"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import ContentCard from "@/components/ContentCard";
import { useAuth } from "@/context/AuthContext";
import { useSettings } from "@/context/SettingsContext";
import type { Content } from "@/lib/types";

export default function FavoritesPage() {
  const { user, loading: authLoading } = useAuth();
  const { t } = useSettings();
  const router = useRouter();
  const [items, setItems] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) router.replace("/login");
  }, [authLoading, user, router]);

  useEffect(() => {
    if (!user) return;
    api
      .get<{ favorites: Content[] }>("/favorites")
      .then((res) => setItems(res.data.favorites))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [user]);

  if (authLoading || !user) return <div className="page muted">Loading…</div>;

  return (
    <div className="page">
      <div
        className="aura"
        style={{
          top: -80,
          left: -60,
          width: 400,
          height: 400,
          background: "var(--glow-primary)",
        }}
      />
      <div className="section-head">
        <span className="section-accent" />
        <h3 className="section-title">{t.yourFavorites}</h3>
      </div>
      {loading && <p className="muted">Loading…</p>}
      {!loading && items.length === 0 && (
        <p className="muted">{t.noFavorites}</p>
      )}
      <div className="grid">
        {items.map((item) => (
          <ContentCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
}
