import React, { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import EditTrip from "./EditTrip.modal";
import AddTrip from "./AddTrip.modal";
import { useSelector, useDispatch } from "react-redux";
import {
  addTrip,
  updateTripList,
  updateTripBulk,
} from "../features/trip/tripSlice";
import { tripStatusCodes } from "../utils/constants";
import { DateTime } from "luxon";
import { calculateTatStatus } from "../utils";

const TripList = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [isEditTripModalOpen, setIsEditTripModalOpen] = useState(false);
  const [isAddTripModalOpen, setIsAddTripModalOpen] = useState(false);

  const handleOpenEditTripModal = () => setIsEditTripModalOpen(true);
  const handleCloseEditTripModal = () => setIsEditTripModalOpen(false);

  const handleOpenAddTripModal = () => setIsAddTripModalOpen(true);
  const handleCloseAddTripModal = () => setIsAddTripModalOpen(false);

  const tripsList = useSelector((state) => state.trip.list);
  const dispatch = useDispatch();

  const handleSubmitEditTripModal = (data) => {
    const { status, time } = data;
    const updatedTrips = tripsList.map((trip) => {
      if (selectedRows.includes(trip.tripId)) {
        return {
          ...trip,
          currentStatusCode: status,
          currentStatus: tripStatusCodes[status].name,
          lastPingTime: time,
          ...(status === "DEL" && { tripEndTime: time }),
        };
      }
      return trip;
    });
    dispatch(updateTripList(updatedTrips));
    // Alternate Approach:
    // const updatedTrips = tripsList.reduce((updatedTrips, trip) => {
    //     if (selectedRows.includes(trip.tripId)) {
    //           updatedTrips.push({
    //             ...trip,
    //             currentStatusCode: status,
    //             currentStatus: tripStatusCodes[status].name,
    //             lastPingTime: time,
    //             ...(status === 'DEL' && { tripEndTime: time }),
    //           })
    //     }
    //     return updatedTrips;
    // }, [])
    // dispatch(updateTripBulk(updatedTrips));
    setSelectedRows([]);
  };

  const handleUpdateEditTripModal = (data) => {
    const { status, tripId } = data;
    const now = DateTime.local();
    const formattedDateString = now.toFormat("yyyy-LL-dd'T'HH:mm:ss.SSS'Z'");

    const updatedTrips = tripsList.map((trip) => {
      if (trip.tripId = tripId) {
        return {
          ...trip,
          currentStatusCode: status,
          currentStatus: tripStatusCodes[status].name,
          lastPingTime: formattedDateString,
          ...(status === "DEL" && { tripEndTime: formattedDateString }),
        };
      }
      return trip;
    });
    dispatch(updateTripList(updatedTrips));
    }

  const handleSubmitAddTripModal = (data) => {
    dispatch(addTrip(data));
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(tripsList.map((row) => row.tripId));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (tripId) => {
    if (selectedRows.includes(tripId)) {
      setSelectedRows(selectedRows.filter((id) => id !== tripId));
    } else {
      setSelectedRows([...selectedRows, tripId]);
    }
  };
  const handleSort = (column) => {
    const newSortOrder =
      sortColumn === column ? (sortOrder === "asc" ? "desc" : "asc") : "asc";
    // TODO Implement sorting logic
    setSortColumn(column);
    setSortOrder(newSortOrder);
  };

  const calculateEta = (days) => {
    return DateTime.local().plus({ days })
  }

  // TODO Implement pagination
  return (
    <Fragment>
      <Modal
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          },
          content: {
            backgroundColor: "white",
            borderRadius: "0.5rem",
            padding: "2rem",
            width: "450px",
            maxHeight: "34vh",
            margin: "0 auto",
          },
        }}
        isOpen={isEditTripModalOpen}
        onClose={handleCloseEditTripModal}
      >
        <EditTrip
          onClose={handleCloseEditTripModal}
          onSubmit={handleSubmitEditTripModal}
        />
      </Modal>
      <Modal
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          },
          content: {
            backgroundColor: "white",
            borderRadius: "0.5rem",
            padding: "2rem",
            width: "600px",
            maxHeight: "35vh",
            margin: "0 auto",
          },
        }}
        isOpen={isAddTripModalOpen}
        onClose={handleCloseAddTripModal}
      >
        <AddTrip
          onClose={handleCloseAddTripModal}
          onSubmit={handleSubmitAddTripModal}
          onUpdate={handleUpdateEditTripModal}
        />
      </Modal>
      <div className="trip-list flex-row m-6 rounded-lg shadow-lg">
        <div className="trip-list-header flex justify-between items-center">
          <h3 className="m-2 font-bold">Trip List</h3>
          <div className="trip-action flex m-2">
            <button
              type="button"
              onClick={handleOpenEditTripModal}
              className={`rounded-md border-2 border-solid  border-secondary m-3 px-3 py-2 text-sm font-semibold ${
                selectedRows.length === 0 ? "disabled:opacity-50" : ""
              }`}
              disabled={selectedRows.length === 0}
            >
              Update status
            </button>
            <button
              type="button"
              onClick={handleOpenAddTripModal}
              className="rounded-md bg-primary m-3 px-3 py-2 text-sm font-semibold text-white"
            >
              Add Trip
            </button>
          </div>
        </div>
        <div className="trip-list-container overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">
                  <input
                    type="checkbox"
                    checked={selectedRows.length === tripsList.length}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="px-4 py-2 text-left">Trip ID</th>
                <th className="px-4 py-2 text-left">Transporter</th>
                <th
                  key="Source"
                  className="px-4 py-2 border border-gray-200 cursor-pointer relative"
                  onClick={() => handleSort(column.key)}
                >
                  Source
                  <span className="ml-2">
                    {sortOrder === "asc" ? (
                      <FontAwesomeIcon icon={faSortUp} text-gray-500 />
                    ) : (
                      <FontAwesomeIcon icon={faSortDown} text-gray-500 />
                    )}
                  </span>
                </th>
                <th className="px-4 py-2 text-left">Destination</th>
                <th className="px-4 py-2 text-left">Phone</th>
                <th className="px-4 py-2 text-left">ETA</th>
                <th className="px-4 py-2 text-left">Distance Remaining</th>
                <th className="px-4 py-2 text-left">Trip Status</th>
                <th className="px-4 py-2 text-left">TAT Status</th>
              </tr>
            </thead>
            <tbody>
              {tripsList.length > 0 ? (
                tripsList.map((row) => (
                  // TODO Format field values
                  <tr key={row.tripId} className="border-t">
                    <td className="px-4 py-2">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(row.tripId)}
                        onChange={() => handleSelectRow(row.tripId)}
                      />
                    </td>
                    <td className="px-4 py-2">{row.tripId}</td>
                    <td className="px-4 py-2">{row.transporter}</td>
                    <td className="px-4 py-2">{row.source}</td>
                    <td className="px-4 py-2">{row.dest}</td>
                    <td className="px-4 py-2">{row.phoneNumber}</td>
                    <td className="px-4 py-2">{row.etaDays ? calculateEta(row.etaDays).toLocaleString(DateTime.DATETIME_SHORT) : '-'}</td>
                    <td className="px-4 py-2">{row.distanceRemaining}</td>
                    <td className="px-4 py-2">{row.currentStatus}</td>
                    <td className="px-4 py-2">{calculateTatStatus(row)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="text-center py-4">
                    No Trips Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};
export default TripList;
