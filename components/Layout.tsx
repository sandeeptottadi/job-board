import React, { Children } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
