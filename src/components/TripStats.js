import React from "react";
import useTripStats from "../hooks/useTripStats";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { tripFilterStatus } from "../utils/constants";
import { useSelector, useDispatch } from "react-redux";
import { updateFilters } from "../features/trip/tripSlice";

const TripStats = () => {
  const { delivered, inTransit, totalTrips, delayed, onTimePercentage } =
    useTripStats();
    const dispatch = useDispatch();
    const tripFilters = useSelector((state) => state.trip.filters);
    const handleFilterClick = (status) => {
        // Remove filter if it is already applied
        dispatch(updateFilters({ status: tripFilters.status !== status ? status : "" }))
    }


  return (
    <div className="trip-stats">
      <div className="flex items-center justify-between p-4 bg-white rounded-md">
        <div className="mx-auto">
          <dl className="border rounded-lg bg-white shadow-xl sm:grid sm:grid-cols-3">
            <div className="flex flex-col-reverse border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                Total trips
              </dt>
              <dd className="order-1 text-2xl text-gray-700">{totalTrips}</dd>
            </div>
          </dl>
        </div>
        <div className="mx-auto">
          <dl className="border rounded-lg bg-white shadow-xl sm:grid sm:grid-cols-2">
            <div className="flex flex-col-reverse border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
              <dt className="order-2 mt-0 mb-2 leading-6 font-medium text-gray-500">
                Delivered
              </dt>
              <dd className="order-1 text-2xl text-gray-700">{delivered}</dd>
            </div>
            <div className="flex flex-col border-b border-gray-100 p-6 sm:border-0 sm:border-r">
              <dt className="order-2 mt-2 leading-6 text-gray-500">On Time</dt>
              <dd
                className="order-1 h text-gray-700"
                style={{ width: 60, height: 60 }}
              >
                <CircularProgressbar
                  value={onTimePercentage.toPrecision(2)}
                  text={`${onTimePercentage.toPrecision(2)}%`}
                  styles={buildStyles({
                    pathColor: "green",
                    textColor: "green",
                    textSize: "15px",
                  })}
                />
              </dd>
            </div>
          </dl>
        </div>

        <div className="max-w-4xl mx-auto">
          <dl className="border rounded-lg bg-white shadow-xl sm:grid sm:grid-cols-3">
            <div
              className=" bg-red-300 flex flex-col-reverse border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r cursor-pointer"
              onClick={() => handleFilterClick(tripFilterStatus.DELAYED)}
            >
              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                Delayed
              </dt>
              <dd className="order-1 text-2xl text-gray-700">{delayed}</dd>
            </div>
            <div
              className="flex flex-col-reverse border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r cursor-pointer"
              onClick={() => handleFilterClick(tripFilterStatus.IN_TRANSIT)}
            >
              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                In transit
              </dt>
              <dd className="order-1 text-2xl text-gray-700">{inTransit}</dd>
            </div>
            <div
              className="flex flex-col-reverse border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l cursor-pointer"
              onClick={() => handleFilterClick(tripFilterStatus.DELIVERED)}
            >
              <dt className="order-2 mt-2 leading-6 font-medium text-gray-500">
                Delivered
              </dt>
              <dd className="order-1 text-2xl text-gray-700">{delivered}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};
export default TripStats;
