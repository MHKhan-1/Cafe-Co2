import { useMutation } from "@tanstack/react-query";
import { api, type CreateReservationRequest } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useCreateReservation() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: CreateReservationRequest) => {
      const res = await fetch(api.reservations.create.path, {
        method: api.reservations.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = api.reservations.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to create reservation");
      }
      return api.reservations.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "Reservation Request Sent",
        description: "We will confirm your booking shortly via email or phone.",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Booking Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
