import MedicineDetails from "@/components/modules/medicine/MedicineDetails";
import { medicineService } from "@/services/medicine.service";
import { notFound } from "next/navigation";

interface IMedicineDetailsProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function MedicineDetailsPage({
  params,
}: IMedicineDetailsProps) {
  const { id } = await params;

  const res = await medicineService.getMedicineById(id);

  if (!res?.data?.data) {
    notFound();
  }

  const medicine = res?.data?.data;

  return (
    <div className="mx-auto w-full max-w-(--breakpoint-xl) px-6">
      <MedicineDetails medicine={medicine} />
    </div>
  );
}
