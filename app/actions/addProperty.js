"use server";

import cloudinary from "@/config/cloudinary";
import { connectDB } from "@/config/database";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function addProperty(formData) {
  await connectDB();

  const sessionUser = await getSessionUser();
  console.log("sessionUser in addProperty:", sessionUser);

  if (!sessionUser || !sessionUser.userId) {
    // If user is not logged in, send them to login page instead of crashing
    redirect("/login");
  }

  const { userId } = sessionUser;

  // access all values from amenities and images
  const amenities = formData.getAll("amenities");

  // return array of File objects, filtering out empty ones
  const images = formData
    .getAll("images")
    .filter((image) => image && image.name !== "");

  const propertyData = {
    owner: userId,
    type: formData.get("type"),
    name: formData.get("name"),
    description: formData.get("description"),
    location: {
      street: formData.get("location.street"),
      city: formData.get("location.city"),
      state: formData.get("location.state"),
      zipcode: formData.get("location.zipcode"),
    },
    beds: Number(formData.get("beds")),
    baths: Number(formData.get("baths")),
    square_feet: Number(formData.get("square_feet")),
    amenities,
    rates: {
      nightly: formData.get("rates.nightly"),
      weekly: formData.get("rates.weekly"),
      monthly: formData.get("rates.monthly"),
    },
    seller_info: {
      name: formData.get("seller_info.name"),
      email: formData.get("seller_info.email"),
      phone: formData.get("seller_info.phone"),
    },
  };

  const imageUrls = [];

  // File → ArrayBuffer → Uint8Array → Buffer → Base64
  for (const imageFile of images) {
    const imageBuffer = await imageFile.arrayBuffer();
    const imageArray = Array.from(new Uint8Array(imageBuffer));
    const imageData = Buffer.from(imageArray);

    // Convert to base64
    const imageBase64 = imageData.toString("base64");

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(
      `data:image/png;base64,${imageBase64}`,
      { folder: "propertypulse" }
    );

    imageUrls.push(result.secure_url);
  }

  // ✅ FIXED: use the correct variable
  propertyData.images = imageUrls;

  const newProperty = new Property(propertyData);
  await newProperty.save();

  // revalidate
  revalidatePath("/", "layout");

  // redirect to new property page
  redirect(`/properties/${newProperty._id}`);
}

export default addProperty;
