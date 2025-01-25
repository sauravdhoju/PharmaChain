import mongoose from 'mongoose';
import AdminSchema from '../db/adminSchema';

const AdminModel = mongoose.model('Admin', AdminSchema);

export default AdminModel;
