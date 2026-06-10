"use client";

import { trackOutboundClick } from "@/lib/analytics/client";

type TrackedOutboundLinkProps = React.ComponentProps<"a"> & {
  clickId: string;
};

export function TrackedOutboundLink({
  clickId,
  onClick,
  ...props
}: TrackedOutboundLinkProps) {
  return (
    <a
      {...props}
      onClick={(event) => {
        trackOutboundClick(clickId);
        onClick?.(event);
      }}
    />
  );
}
