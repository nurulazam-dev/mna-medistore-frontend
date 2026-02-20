"use server";

import { medicineService } from "@/services/medicine.service";
import { MedicineCreateInput } from "@/types";
import { updateTag } from "next/cache";

export const getMedicines = async () => {
  return await medicineService.getMedicines();
};

export const getMyMedicines = async () => {
  return await medicineService.getMyMedicines();
};

export const getMedicineById = async (id: string) => {
  const res = await medicineService.getMedicineById(id);
  return res;
};

export const createMedicine = async (data: MedicineCreateInput) => {
  const res = await medicineService.createMedicine(data);
  if (res.data) {
    updateTag("medicines");
    updateTag("my-medicines");
  }
  return res;
};

export const updateMedicine = async (
  id: string,
  data: Partial<MedicineCreateInput>,
) => {
  const res = await medicineService.updateMedicine(id, data);
  if (res.data) {
    updateTag("medicines");
    updateTag("my-medicines");
    updateTag(`medicine-${id}`);
  }
  return res;
};

export const adminUpdateMedicine = async (
  id: string,
  data: Partial<MedicineCreateInput>,
) => {
  const res = await medicineService.adminUpdateMedicine(id, data);
  if (res.data) {
    updateTag("medicines");
    updateTag("my-medicines");
    updateTag(`medicine-${id}`);
  }
  return res;
};

export const deleteMedicine = async (id: string) => {
  const res = await medicineService.deleteMedicine(id);
  if (res.data) {
    updateTag("medicines");
    updateTag("my-medicines");
  }
  return res;
};
