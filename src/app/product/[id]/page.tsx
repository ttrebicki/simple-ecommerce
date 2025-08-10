import Product from "@/ui/templates/Product";
import { PageProps } from "../../../../.next/types/app/page";
import Stripe from "stripe";

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const stripeServer = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const res = await stripeServer.products.list({
      active: true,
    });

    return res.data.map((p) => ({
      id: p.id,
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function Page({ params }: PageProps) {
  return <Product params={params} />;
}
