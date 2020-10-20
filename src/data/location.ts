import { locationRepository } from '@data/connection';
import { Location } from '@models/Location';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';

/**
 * Gets the Location record by ID.
 * @param id The ID of the record.
 */
export const getLocation = (id: number): Promise<Location> => {
    return locationRepository.findOneOrFail(id);
};

/**
 * Saves the Location.
 * @param location
 */
export const saveLocation = (location: Location): Promise<InsertResult> => {
    return new Promise((resolve, reject) => {
        getLocation(location.Id)
            .then(_ => {
                // record found, can't add
                reject(`A Location with that Id already exists`);
            })
            .catch(_ => {
                // item not found, add it
                location.Id = undefined;
                resolve(locationRepository.insert(location));
            });
    });
}

/**
 * Updates the location,
 * @param uom The location record.
 */
export const updateLocation = (location: Location): Promise<UpdateResult> => {
    return locationRepository.update(location.Id, location);
}

/**
 * Deletes the location.
 * @param id The ID of the record to delete
 */
export const deleteLocation = (id: number): Promise<DeleteResult> => {
    return locationRepository.delete(id);
}