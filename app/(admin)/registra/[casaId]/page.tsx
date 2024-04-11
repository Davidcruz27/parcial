import { db } from "@/utils/db";
import { auth } from "@clerk/nextjs";
import {
  CircleDollarSign,
  File,
  LayoutDashboard,
  ListChecks,
  ShowerHead,
} from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { IconBadge } from "@/components/icon-badge";
import CiudadFrom from "./_components/CiudadFrom";
import ImageForm from "./_components/ImagenForm";
import Actions from "./_components/actions";
import PriceFrom from "./_components/Price";
import Habitacion from "./_components/Habitacion";
import DescriptionFrom from "./_components/DescriptionFrom";

const casaIdPage = async ({ params }: { params: { casaId: string } }) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const casa = await db.casa.findUnique({
    where: {
      id: params.casaId,
      userId,
    },
  });

  if (!casa) {
    return redirect("/");
  }

  const requiredFields = [
    casa.ciudad,
    casa.habitaciones,
    casa.imageUrl,
    casa.precio,
    casa.color,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      <div className="p-6 ">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Registra tu Nueva Casa</h1>
            <span className="text-sm text-slate-700">
              complete all fill fields {completionText}
            </span>
          </div>
          <Actions disableb={!isComplete} courseId={params.casaId} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Customize your Home</h2>
            </div>
            <CiudadFrom initialData={casa} casaId={casa.id} />
            <ImageForm initialData={casa} casaId={casa.id} />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">House Color</h2>
              </div>
              <DescriptionFrom initialData={casa} casaId={casa.id} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={CircleDollarSign} />
                <h2 className="text-xl">Sell your Home</h2>
              </div>
              <PriceFrom initialData={casa} casaId={casa.id} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ShowerHead} />
                <h2 className="text-xl">Rooms</h2>
              </div>
              <Habitacion initialData={casa} casaId={casa.id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default casaIdPage;
