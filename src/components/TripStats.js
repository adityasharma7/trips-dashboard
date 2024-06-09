
import React from "react";
import { useSelector } from "react-redux";

const TripStats = () => {
    const tripsList = useSelector((state) => state.trip.list);

    const calculateDeliveredTrips = () => {
        return tripsList.filter((trip) => trip.currentStatusCode === 'DEL').length
    }
    const calculateInTransitTrips = () => {
        return tripsList.filter((trip) => trip.currentStatusCode === 'INT').length
    }
    
    return (
        <div className="trip-stats">
            <div className="flex items-center justify-between p-4 bg-white rounded-md">
                <div className="mx-auto">
                    <dl className="border rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3">
                        <div className="flex flex-col-reverse border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
                            <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                                Total trips
                            </dt>
                            <dd className="order-1 text-2xl text-gray-700">{tripsList.length}</dd>
                        </div>
                    </dl>
                </div>
                <div className="mx-auto">
                    <dl className="border rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3">
                        <div className="flex flex-col-reverse border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
                            <dt className="order-2 mt-2 leading-6 font-medium text-gray-500">
                                Delivered
                            </dt>
                            <dd className="order-1 text-2xl text-gray-700">{calculateDeliveredTrips()}</dd>
                        </div>
                    </dl>
                </div>
                <div className="max-w-4xl mx-auto">
                    <dl className="border rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3">
                        <div className=" bg-red-300 flex flex-col-reverse border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
                            <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                                Delayed
                            </dt>
                            <dd className="order-1 text-2xl text-gray-700">18,033</dd>
                        </div>
                        <div
                            className="flex flex-col-reverse border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
                            <dt className="order-2 mt-2 text-lg leading-6 font-medium text-gray-500">
                                In transit
                            </dt>
                            <dd className="order-1 text-2xl text-gray-700">{calculateInTransitTrips()}</dd>
                        </div>
                        <div className="flex flex-col-reverse border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l">
                            <dt className="order-2 mt-2 leading-6 font-medium text-gray-500">
                            Delivered
                            </dt>
                            <dd className="order-1 text-2xl text-gray-700">{calculateDeliveredTrips()}</dd>
                        </div>
                    </dl>
                </div>
            </div>
        </div>
    )
}
export default TripStats;