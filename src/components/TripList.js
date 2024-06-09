import React, { Fragment, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { tripsData } from '../utils/mockData'
import Modal from 'react-modal';
import EditTrip from './EditTrip.modal';



const TripList = () => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');
    const [isEditTripModalOpen, setIsEditTripModalOpen] = useState(false);

    const handleOpenEditTripModal = () => setIsEditTripModalOpen(true);
    const handleCloseEditTripModal = () => setIsEditTripModalOpen(false);

    const tripsList = tripsData.data;

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
    const newSortOrder = sortColumn === column ? (sortOrder === 'asc' ? 'desc' : 'asc') : 'asc';
    // TODO Implement sorting logic
    setSortColumn(column);
    setSortOrder(newSortOrder);
  };
    return (
        <Fragment>
            <Modal style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
                },
                content: {
                backgroundColor: 'white',
                borderRadius: '0.5rem',
                padding: '2rem',
                width: '450px',
                maxHeight: '34vh',
                margin: '0 auto',
                },
            }} isOpen={isEditTripModalOpen} onClose={handleCloseEditTripModal}>
                <EditTrip onClose={handleCloseEditTripModal} />
            </Modal>
        // TODO Implement pagination
        <div className="trip-list flex-row m-6 rounded-lg shadow-lg">
            <div className="trip-list-header flex justify-between items-center">
                <h3 className='m-2 font-bold'>Trip List</h3>
                <div className='trip-action flex m-2'>
                    <button type="button" onClick={handleOpenEditTripModal}  className="rounded-md border-2 border-solid  border-secondary m-3 px-3 py-2 text-sm font-semibold" >Update status</button>
                    <button type="button" className="rounded-md bg-primary m-3 px-3 py-2 text-sm font-semibold text-white">Add Trip</button>
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
                            {sortOrder === 'asc' ? (
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
                {tripsList.map((row) => (
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
                        <td className="px-4 py-2">{row.etaDays}</td>
                        <td className="px-4 py-2">{row.distanceRemaining}</td>
                        <td className="px-4 py-2">{row.currenStatus}</td>
                        {/* // TODO TAT Status */}
                        <td className="px-4 py-2">{row.source}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>
        </Fragment>
    )
}
export default TripList;