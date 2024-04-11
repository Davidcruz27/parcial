
import { db } from "@/utils/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";




export async function DELETE(
  req: Request,
  { params }: { params: { casaId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.casa.findUnique({
      where: {
        id: params.casaId,
        userId:userId
      },

    });

    if (!course) {
      return new NextResponse("Not found", { status: 404 });
    }

    
    const deletedCourse = await db.casa.delete({
      where: {
        id: params.casaId,
      },
    });

    return NextResponse.json(deletedCourse);
  } catch (error) {
    console.log("[COURSES_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { casaId: string } }
) {
  try {
    const { userId } = auth();
    const { casaId } = params;
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const UpdateCasa = await db.casa.update({
      where: {
        id: casaId,
        userId,
      },
      data: {
        ...values,
      },
    });
    return NextResponse.json(UpdateCasa);
  } catch (error) {
    console.log("[COURSES_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
