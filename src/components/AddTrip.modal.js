import React, { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { availableTransporters } from "../utils/constants";
const AddTrip = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    transporter: "Blue Dart"
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
    onClose();
  };
  // TODO Add validations to all the fields
  return (
    <Fragment>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Add Trip</h3>
        <button
          type="button"
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid mb-6 md:grid-cols-2">
          <div class="relative mr-3">
            <input
              type="text"
              id="trip-id"
              name="tripId"
              class="block px-4 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={handleInputChange}
            />
            <label
              for="trip-id"
              class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Trip ID
            </label>
          </div>
          <div class="relative ml-2">
            <select
              id="transporter"
              name="transporter"
              class="bg-gray-50 border border-gray-300 px-4 text-gray-1000 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={handleInputChange}
            >
              {Object.keys(availableTransporters).map((id) => {
                return (
                  <option value={id}>
                    {availableTransporters[id]}
                  </option>
                );
              })}
            </select>
            <label
              for="transporter"
              class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Transporter
            </label>
          </div>
        </div>
        <div className="grid mb-6 md:grid-cols-2">
          <div class="relative mr-3">
            <input
              type="text"
              id="source"
              name="source"
              class="block px-4 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={handleInputChange}
            />
            <label
              for="source"
              class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Source
            </label>
          </div>

          <div class="relative ml-2">
            <input
              type="text"
              id="dest"
              name="dest"
              class="block px-4 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={handleInputChange}
            />
            <label
              for="dest"
              class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Destination
            </label>
          </div>
        </div>

        <div className="grid mb-6 md:grid-cols-2">
          <div class="relative mr-4">
            <input
              type="text"
              id="phone-number"
              name="phoneNumber"
              class="block px-4 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              onChange={handleInputChange}
            />
            <label
              for="phone-number"
              class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Phone
            </label>
          </div>
        </div>
        <div className="flex form-action flex-row justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border-2 border-solid  border-secondary m-3 px-3 py-2 text-sm font-semibold"
          >
            Update Status
          </button>
          <button
            type="submit"
            className="rounded-md bg-primary m-3 px-3 py-2 text-sm font-semibold text-white"
          >
            Add Trip
          </button>
        </div>
      </form>
    </Fragment>
  );
};
export default AddTrip;
