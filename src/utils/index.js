import { v4 as uuidv4 } from 'uuid';
import { availableTatStatus } from './constants';
import { DateTime } from 'luxon';
export const generateUUID = () => {
    return uuidv4();
}

export const calculateTatStatus = (trip) => {
    const { etaDays, tripStartTime, tripEndTime, lastPingTime} = trip;

    let endTime = DateTime.local();

    if (!etaDays | etaDays <= 0) {
        return availableTatStatus.OTHER;
    }

    if (tripEndTime) {
        endTime = DateTime.fromISO(tripEndTime)
    } else if (lastPingTime) {
        endTime = DateTime.fromISO(lastPingTime)
    }


    const difference = DateTime.fromISO(tripStartTime).diff(endTime).as('days');

    return difference <= etaDays ? availableTatStatus.ONTIME : availableTatStatus.DELAYED;
}