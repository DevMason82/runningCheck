export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  console.log("SLUG", slug);
  return <h1>Hello, Home page!</h1>;
}
