const PropertyPage = async ({ params }) => {
  const { id } = await params;

  return <>Property Page {id}</>;
};

export default PropertyPage;
