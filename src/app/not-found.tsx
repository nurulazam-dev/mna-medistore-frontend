import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="text-center h-screen">
      <h1 className="font-bold text-3xl text-red-600">4 0 4</h1>
      <p className="text-md text-red-600">
        Oops! The page you&apos;re looking for doesn’t exist.
      </p>
      <Link href="/">Go Back Home</Link>
    </div>
  );
}
