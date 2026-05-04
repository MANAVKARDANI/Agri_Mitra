import {
  createSupplier,
  deleteSupplierById,
  listSuppliers,
  updateSupplierById,
} from "../models/supplierModel.js";

export const getSuppliers = async (_req, res) => {
  try {
    const suppliers = await listSuppliers();
    return res.json(suppliers);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch suppliers", error: error.message });
  }
};

export const addSupplier = async (req, res) => {
  try {
    const {
      name,
      contact,
      address,
      image = "",
      area_type = "city",
      state = "",
      district = "",
      city = "",
      village = "",
      business_hours = "",
    } = req.body;
    const supplier = await createSupplier({
      name,
      contact,
      address,
      image,
      area_type,
      state,
      district,
      city,
      village,
      business_hours,
    });
    return res.status(201).json(supplier);
  } catch (error) {
    return res.status(500).json({ message: "Failed to create supplier", error: error.message });
  }
};

export const editSupplier = async (req, res) => {
  try {
    const allowedFields = [
      "name",
      "contact",
      "address",
      "image",
      "area_type",
      "state",
      "district",
      "city",
      "village",
      "business_hours",
    ];
    const hasUpdateField = allowedFields.some((field) => req.body[field] !== undefined);
    if (!hasUpdateField) {
      return res.status(400).json({ message: "Nothing to update" });
    }

    const supplier = await updateSupplierById(Number(req.params.id), req.body);
    if (!supplier) return res.status(404).json({ message: "Supplier not found" });
    return res.json(supplier);
  } catch (error) {
    return res.status(500).json({ message: "Failed to update supplier", error: error.message });
  }
};

export const removeSupplier = async (req, res) => {
  try {
    const ok = await deleteSupplierById(Number(req.params.id));
    if (!ok) return res.status(404).json({ message: "Supplier not found" });
    return res.json({ message: "Supplier deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete supplier", error: error.message });
  }
};
