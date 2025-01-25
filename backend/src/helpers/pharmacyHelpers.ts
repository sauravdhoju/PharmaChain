import PharmacyModel from '../models/pharmacyModel';

// returns all the entries of pharmacys
export const getPharmacys = () => PharmacyModel.find();

// returns pharmacy entry by comparing email
export const getPharmacyByEmail = (email: string) =>
    PharmacyModel.findOne({ email });

// returns pharmacy entry by comparing sessionToken (which is in cookie)
export const getPharmacyBySessionToken = (sessionToken: string) => {
    return PharmacyModel.findOne({
        'authentication.sessionToken': sessionToken,
    });
};

// returns pharmacy entry by comparing id
export const getPharmacyById = (id: string) => PharmacyModel.findById(id);

// creates a new pharmacy saves it in entries of PharmacyModel then returns the created pharmacy object
export const createPharmacy = (values: Record<string, any>) =>
    new PharmacyModel(values).save().then((pharmacy) => pharmacy.toObject());

// deletes pharmacy entry by comparing id
export const deletePharmacyById = (id: string) =>
    PharmacyModel.findOneAndDelete({ _id: id });

// updates attribues of specific entry by comparing id
export const updatePharmacyById = (id: string, values: Record<string, any>) =>
    PharmacyModel.findByIdAndUpdate(id, values);
