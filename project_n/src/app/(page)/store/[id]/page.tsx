import StorePage from "./StorePage";

export default async function Page({ params }: { params: { id: number } }) {
  return (
    <>
      <StorePage params={params} />
    </>
  );
}
