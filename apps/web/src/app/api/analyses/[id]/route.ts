import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "You must be signed in." }, { status: 401 });
  }

  const analysis = await prisma.landAnalysis.findUnique({
    where: { id },
    include: { property: true },
  });

  // Same 404 whether the analysis doesn't exist or belongs to someone else.
  if (!analysis || analysis.property.userId !== session.user.id) {
    return NextResponse.json({ error: "Analysis not found." }, { status: 404 });
  }

  return NextResponse.json(analysis);
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "You must be signed in." }, { status: 401 });
  }

  const body = await request.json();
  if (typeof body?.inPortfolio !== "boolean") {
    return NextResponse.json({ error: "inPortfolio (boolean) is required." }, { status: 400 });
  }

  const analysis = await prisma.landAnalysis.findUnique({ where: { id }, include: { property: true } });
  if (!analysis || analysis.property.userId !== session.user.id) {
    return NextResponse.json({ error: "Analysis not found." }, { status: 404 });
  }

  const property = await prisma.property.update({
    where: { id: analysis.propertyId },
    data: {
      inPortfolio: body.inPortfolio,
      portfolioAddedAt: body.inPortfolio ? new Date() : null,
    },
  });

  return NextResponse.json({ inPortfolio: property.inPortfolio });
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "You must be signed in." }, { status: 401 });
  }

  const analysis = await prisma.landAnalysis.findUnique({ where: { id }, include: { property: true } });
  if (!analysis || analysis.property.userId !== session.user.id) {
    return NextResponse.json({ error: "Analysis not found." }, { status: 404 });
  }

  // Deleting the property cascades to its analyses — today the UI always creates
  // exactly one analysis per property, so there's nothing else worth keeping.
  await prisma.property.delete({ where: { id: analysis.propertyId } });

  return NextResponse.json({ ok: true });
}
