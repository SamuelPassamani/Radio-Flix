import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center px-4">
      <AlertTriangle className="w-24 h-24 text-primary mb-6" />
      <h1 className="text-6xl font-headline font-bold mb-2">404</h1>
      <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-muted-foreground max-w-md mb-8">
        Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
      </p>
      <Button asChild>
        <Link href="/">Return to Homepage</Link>
      </Button>
    </div>
  )
}
