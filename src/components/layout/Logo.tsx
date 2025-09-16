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
      <g clipPath="url(#clip0_2_2)">
        <path d="M0 8C0 3.58172 3.58172 0 8 0H32C36.4183 0 40 3.58172 40 8V32C40 36.4183 36.4183 40 32 40H8C3.58172 40 0 36.4183 0 32V8Z" fill="currentColor"/>
        <path d="M12.9238 29.5L14.7138 10.5H20.7338V15.01C20.7338 17.53 18.7138 19.55 16.1938 19.55H15.9338C13.4138 19.55 11.3938 21.57 11.3938 24.09V29.5H12.9238Z" fill="white"/>
        <path d="M28.6063 10.5L26.8163 29.5H20.7963V24.99C20.7963 22.47 22.8163 20.45 25.3363 20.45H25.5963C28.1163 20.45 30.1363 18.43 30.1363 15.91V10.5H28.6063Z" fill="white"/>
      </g>
      <defs>
        <clipPath id="clip0_2_2">
          <rect width="40" height="40" rx="8" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  );
}
