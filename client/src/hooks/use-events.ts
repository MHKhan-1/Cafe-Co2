import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useEvents(location?: string) {
  return useQuery({
    queryKey: [api.events.list.path, location],
    queryFn: async () => {
      const url = new URL(window.location.origin + api.events.list.path);
      if (location) url.searchParams.append("location", location);

      const res = await fetch(url.toString(), { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch events");
      return api.events.list.responses[200].parse(await res.json());
    },
  });
}
