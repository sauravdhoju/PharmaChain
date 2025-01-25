import MedicineModel from '../models/medicineModel';

// returns all the entries of medicines
export const getMedicines = () => MedicineModel.find();

// returns medicine entry by comparing email
// export const getMedicineByPharmacyId = (email: string) =>
//     MedicineModel.findOne({ email });

// returns medicine entry by comparing sessionToken (which is in cookie)
export const getMedicineBySessionToken = (sessionToken: string) => {
    return MedicineModel.findOne({
        'authentication.sessionToken': sessionToken,
    });
};

// returns medicine entry by comparing id
export const getMedicineById = (id: string) => MedicineModel.findById(id);

// creates a new medicine saves it in entries of MedicineModel then returns the created medicine object
export const createMedicine = (values: Record<string, any>) =>
    new MedicineModel(values).save().then((medicine) => medicine.toObject());

// deletes medicine entry by comparing id
export const deleteMedicineById = (id: string) =>
    MedicineModel.findOneAndDelete({ _id: id });

// updates attribues of specific entry by comparing id
export const updateMedicineById = (id: string, values: Record<string, any>) =>
    MedicineModel.findByIdAndUpdate(id, values);
