import { cn } from "@/lib/utils";
import Image from "next/image";

export function Logo({ className, ...props }: React.ComponentProps<typeof Image>) {
  return (
    <Image
      src="https://cdn.xcam.gay/10:/R%C3%A1dio%20Flix/logo/logo.svg"
      alt="Rádio Flix Logo"
      width={64}
      height={64}
      className={cn(className)}
      {...props}
      unoptimized
    />
  );
}
