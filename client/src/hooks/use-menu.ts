import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

export function useMenu(location?: string, category?: string) {
  return useQuery({
    queryKey: [api.menu.list.path, location, category],
    queryFn: async () => {
      const url = new URL(window.location.origin + api.menu.list.path);
      if (location) url.searchParams.append("location", location);
      if (category) url.searchParams.append("category", category);

      const res = await fetch(url.toString(), { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch menu");
      return api.menu.list.responses[200].parse(await res.json());
    },
  });
}
