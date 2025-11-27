import PropertyDetails from "@/app/components/PropertyDetails";
import PropertyHeaderImage from "@/app/components/PropertyHeaderImage";
import { connectDB } from "@/config/database";
import Property from "@/models/Property";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

const PropertyPage = async ({ params }) => {
  const { id } = await params;
  await connectDB();
  const property = await Property.findById(id).lean();

  console.log(property);

  return (
    <>
      <PropertyHeaderImage image={property.images[0]} />
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            href="/properties"
            className="text-blue-500 hover:text-blue-600 flex items-center"
          >
            <FaArrowLeft className="fas fa-arrow-left mr-2" />
            Back to Properties
          </Link>
        </div>
      </section>
      <div className="container m-auto py-10 px-6">
        <div className="grid grid-cols-1 md:grid-cols-[70%_30%] w-full gap-6">
          <PropertyDetails property={property} />
        </div>
      </div>
    </>
  );
};

export default PropertyPage;
