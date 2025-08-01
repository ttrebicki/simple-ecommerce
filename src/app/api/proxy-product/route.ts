// app/api/products/route.ts
import { NextResponse } from "next/server";
import { productApi } from "@/lib/api/product";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = parseInt(url.searchParams.get("id") ?? "1", 10);

  try {
    const product = await productApi.getProduct(id);

    if (!product) {
      return NextResponse.json(
        { error: "No product returned" },
        { status: 502 }
      );
    }

    return NextResponse.json(product);
  } catch (err) {
    console.error("GET /api/product failed:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
