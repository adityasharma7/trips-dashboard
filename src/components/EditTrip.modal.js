import React, { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import { tripStatusCodes } from "../utils/constants";

const EditTrip = ({ onClose }) => {
  const [formData, setFormData] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData); // Pass form data to parent component for submission
    onClose(); // Close the modal after submit
  };

  return (
    <Fragment>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Update Status</h3>
        <button
          type="button"
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div class="relative m-4 p-2">
          <select
            id="status"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>Select a status</option>
            {
                Object.keys(tripStatusCodes).map((statusCode) => {
                    return (
                        <option  value={statusCode}>{tripStatusCodes[statusCode].name}</option>
                    )
                })
            }
          </select>
          <label
            for="status"
            class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
            Status
          </label>
        </div>
        <div className="flex flex-column m-2 p-3">
          <label for="time" className="mr-1 ml-2">
            Time:
          </label>
          <DatePicker
            showIcon
            className="py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            dateFormat="yyyy-MM-dd HH:mm"
            showTimeSelect
            toggleCalendarOnIconClick
            isClearable
            timeFormat="HH:mm"
            // onChange={(date) => setStartDate(date)}
          />
        </div>
        <div className="flex form-action flex-row justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border-2 border-solid  border-secondary m-3 px-3 py-2 text-sm font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-primary m-3 px-3 py-2 text-sm font-semibold text-white"
          >
            Update Status
          </button>
        </div>
      </form>
    </Fragment>
  );
};
export default EditTrip;
