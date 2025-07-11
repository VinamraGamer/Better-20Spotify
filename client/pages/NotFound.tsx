import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-full p-8 text-center">
        <div className="max-w-md">
          <h1 className="text-6xl font-bold text-white mb-4">404</h1>
          <h2 className="text-2xl font-bold text-white mb-4">Page not found</h2>
          <p className="text-spotify-gray-400 mb-8">
            We can't seem to find the page you're looking for.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="bg-spotify-green hover:bg-spotify-green-hover text-black font-semibold"
              onClick={() => (window.location.href = "/")}
            >
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
            <Button
              variant="outline"
              className="border-spotify-gray-400 text-spotify-gray-400 hover:bg-spotify-gray-700 hover:text-white"
              onClick={() => (window.location.href = "/search")}
            >
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
