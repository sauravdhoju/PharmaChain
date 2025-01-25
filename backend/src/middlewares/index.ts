import express from 'express';
import { get, merge } from 'lodash';

import { getPharmacyBySessionToken } from '../helpers/pharmacyHelpers';
import { getAdminBySessionToken } from '../helpers/adminHelpers';
// import { getTaskList } from '../helpers/taskListHelpers';
// import { getProjectById } from '../helpers/projectHelpers';

// checks if there is a sessionToken and if it matches with one of the existing pharmacy entries
export const isAuthenticated = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        const sessionToken = req.cookies['jwt_token']; // 'jwt_token' name set during creation of token

        // return error if there is no sessionToken
        if (!sessionToken) {
            return res
                .status(403)
                .json({ message: 'You are not authenticated!' })
                .end();
        }

        // checks if there is an entry among pharmacys that matches above sessionToken
        const existingPharmacy = await getPharmacyBySessionToken(sessionToken);
        if (!existingPharmacy) {
            return res
                .status(403)
                .json({ message: 'You are not authenticated' })
                .end();
        }

        // if the pharmacy exists with above session token then merge the 'identity' property with request
        merge(req, { identity: existingPharmacy });
        return next(); // call next function thingy
    } catch (error) {
        console.log(error);
        return res
            .status(400)
            .json({ message: 'Something went wrong!', error: error })
            .end();
    }
};

// Checks if the id of pharmacy with sessionToken that was sent as 'identity' above  matches that of the requested id
// i.e., checks if the requesting pharmacy is the owner of the account with requested id
export const isOwner = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        const { id } = req.params;
        const currentPharmacyId = get(req, 'identity._id') as string;
        if (!currentPharmacyId) {
            return res
                .status(403)
                .json('You are not authenticated to perform this action!');
        }
        if (currentPharmacyId.toString() !== id) {
            return res
                .status(403)
                .json('You are not authorized to perform this action!');
        }
        return next();
    } catch (error) {
        console.log(error);
        return res
            .status(400)
            .json({ message: 'Something went wrong!', error: error });
    }
};

export const isAdmin = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        const sessionToken = req.cookies['jwt_token']; // 'jwt_token' name set during creation of token

        // return error if there is no sessionToken
        if (!sessionToken) {
            return res
                .status(403)
                .json({ message: 'You are not authenticated!' })
                .end();
        }

        // checks if there is an entry among pharmacys that matches above sessionToken
        const admin = await getAdminBySessionToken(sessionToken);
        if (!admin) {
            return res
                .status(403)
                .json({ message: 'You are not authenticated' })
                .end();
        }

        // if the pharmacy exists with above session token then merge the 'identity' property with request
        merge(req, { identity: admin });
        return next(); // call next function thingy
    } catch (error) {
        console.error(error);
        return res
            .status(400)
            .json({ message: 'Something went wrong!', error })
            .end();
    }
};

// export const isTaskListOwner = async (
//     req: express.Request,
//     res: express.Response,
//     next: express.NextFunction
// ) => {
//     try {
//         const currentPharmacyId = get(req, 'identity._id') as string;
//         const { taskListId } = req.params;
//         const taskList = await getTaskList(taskListId);

//         if (!taskList.pharmacy_id.equals(currentPharmacyId))
//             return res
//                 .status(403)
//                 .json({ message: 'You are not authorized!' })
//                 .end();

//         if (!taskListId) {
//             return res
//                 .status(400)
//                 .json({ message: 'Please provide task list id!' })
//                 .end();
//         }

//         return next();
//     } catch (error) {
//         console.error(error);
//         return res
//             .status(400)
//             .json({ message: 'Something went wrong!', error })
//             .end();
//     }
// };

// export const isProjectOwner = async (
//     req: express.Request,
//     res: express.Response,
//     next: express.NextFunction
// ) => {
//     try {
//         const currentPharmacyId = get(req, 'identity._id') as string;
//         const { projectId } = req.params;
//         const project = await getProjectById(projectId);

//         if (!projectId) {
//             return res
//                 .status(400)
//                 .json({ message: 'Please provide task list id!' })
//                 .end();
//         }

//         if (!project.admin_id.equals(currentPharmacyId))
//             return res
//                 .status(403)
//                 .json({ message: 'You are not authorized!' })
//                 .end();

//         return next();
//     } catch (error) {
//         console.error(error);
//         return res
//             .status(400)
//             .json({ message: 'Something went wrong!', error })
//             .end();
//     }
// };
