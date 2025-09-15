import { cn } from "@/lib/utils";

export function Logo({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      {...props}
    >
      <path
        d="M17.5 10H22.5V15C22.5 17.7614 20.2614 20 17.5 20V20C14.7386 20 12.5 22.2386 12.5 25V30"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M27.5 30H22.5V25C22.5 22.2386 24.7386 20 27.5 20V20C30.2614 20 32.5 17.7614 32.5 15V10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
