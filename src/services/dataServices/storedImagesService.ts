import { getEntityServices } from "../../db.js";
import { PlainObject } from "@mikro-orm/core";

export interface IFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    destination: string;
    filename: string;
    path: string;
  }

interface PostStoredImagesParams {
    files: Array<IFile>,
    serviceId: number,
    associatedDate: Date,
}

export interface IStoredImagesService {
    postStoredImages(formInput:PostStoredImagesParams):Promise<PlainObject>,
}

export function StoredImagesService (db = getEntityServices()): IStoredImagesService {
    const em = db.entityManager;
    const repository = db.storedImage;
    const serviceRepository = db.service;

    console.log(`[StoredImagesService] context-specific em-ID: ${em.id || 'TEST'}`);
    
    async function postStoredImages(formInput:PostStoredImagesParams):Promise<PlainObject> {
        console.log(`[StoredImagesService:postStoredImage] context-specific em-ID: ${em.id || 'TEST'}`);
        
        const {files, serviceId, associatedDate} = formInput;
        const serviceRef = serviceRepository.getReference(serviceId);
        for (const file of files) {
            repository.create({
                filename: file.filename, 
                filepath: file.path, 
                associatedDate, 
                service: serviceRef,
            });
        }

        return {
            method: 'postStoredImage',
        }
    }

    return {
        postStoredImages,
    }
}