import AdminModel from '../models/adminModel';

export const createAdmin = (values: Record<string, any>) =>
    new AdminModel(values).save().then((admin) => admin.toObject());

export const getAdminByEmail = (email: string) => AdminModel.findOne({ email });

export const getAdminBySessionToken = (sessionToken: string) => {
    return AdminModel.findOne({ 'authentication.sessionToken': sessionToken });
};
