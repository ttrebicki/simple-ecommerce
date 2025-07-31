// app/api/products/route.ts
import { NextResponse } from "next/server";
import { productApi } from "@/lib/api/product";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const phrase = url.searchParams.get("phrase") ?? "";
  const page = parseInt(url.searchParams.get("page") ?? "1", 10);
  const limit = parseInt(url.searchParams.get("limit") ?? "12", 10);

  try {
    const products = await productApi.searchProducts(phrase, page, limit);

    if (!products) {
      return NextResponse.json(
        { error: "No products returned" },
        { status: 502 }
      );
    }

    return NextResponse.json(products);
  } catch (err) {
    console.error("GET /api/products failed:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
