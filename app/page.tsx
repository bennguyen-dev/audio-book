import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, BookMarked, PlayCircle } from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-background text-foreground flex min-h-screen flex-col font-sans">
      <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <BookMarked className="text-primary h-6 w-6" />
            <span className="text-xl font-bold tracking-tight">AudioBook</span>
          </div>
          <div className="mx-4 flex max-w-md flex-1 items-center">
            <div className="relative w-full">
              <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
              <Input
                type="search"
                placeholder="Search for audiobooks..."
                className="bg-muted w-full pl-8 md:w-full"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden sm:inline-flex">
              Sign In
            </Button>
            <Button>Get Started</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto flex-1 px-4 py-12">
        <section className="mb-12 space-y-4 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            Sách nói dành cho tâm hồn
          </h1>
          <p className="text-muted-foreground mx-auto max-w-[700px] text-lg">
            Khám phá hàng ngàn cuốn sách nói chất lượng cao từ những tác giả nổi tiếng nhất thế
            giới. Nghe mọi lúc, mọi nơi.
          </p>
          <div className="pt-4">
            <Button
              size="lg"
              className="rounded-full shadow-lg transition-transform hover:scale-105"
            >
              <PlayCircle className="mr-2 h-5 w-5" /> Nghe thử ngay
            </Button>
          </div>
        </section>

        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Trending Now</h2>
            <Button variant="link">View All</Button>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card
                key={i}
                className="overflow-hidden border-none shadow-md transition-shadow hover:shadow-xl"
              >
                <div className="bg-muted aspect-[16/9] w-full">
                  <Skeleton className="h-full w-full" />
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-1">The Art of Stillness {i}</CardTitle>
                  <CardDescription>Pico Iyer</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm font-medium">4h 32m</span>
                    <Button variant="outline" size="sm">
                      Listen
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t py-12">
        <div className="text-muted-foreground container mx-auto px-4 text-center text-sm">
          <p>© 2026 AudioBook Project. Built with Next.js, Shadcn/UI and Tailwind CSS 4.</p>
        </div>
      </footer>
    </div>
  );
}
