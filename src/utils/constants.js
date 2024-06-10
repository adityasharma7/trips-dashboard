// The transporters should have a unique identifier
// As per the mock data values are assigned
// Added support to use IDs in future
export const availableTransporters = {
    "Blue Dart": "Blue Dart",
    "DTDC": "DTDC",
    "Delhivery": "Delhivery",
    "Merks": "Merks",
    "Gati": "Gati"
}

export const tripStatusCodes = {
    "BKD": {
        sequence: 0,
        name: "Booked"
    },
    "INT": {
        sequence: 1,
        name: "In Transit"
    },
    "RD": {
        sequence: 2,
        name: "Reached Destination"
    },
    "DEL": {
        sequence: 3,
        name: "Delivered"
    }
}

export const availableTatStatus = {
    "ONTIME": "On Time",
    "DELAYED": "Delayed",
    "OTHER": "Other"
}