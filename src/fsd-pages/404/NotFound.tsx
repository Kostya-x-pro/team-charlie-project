import Link from "next/link";

export const NotFound = () => {
  return (
    <main>
      <h1>404</h1>

      <Link href="/">
        Oops, take me back
      </Link>
    </main>
  );
}