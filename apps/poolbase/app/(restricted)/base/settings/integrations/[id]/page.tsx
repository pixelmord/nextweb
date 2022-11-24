export default async function IntegrationDetail({ params }: { params: { id: string } }) {
  return (
    <>
      <p>{params.id}</p>
    </>
  );
}
