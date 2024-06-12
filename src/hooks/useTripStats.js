import { useSelector } from "react-redux";
import { calculateTatStatus } from "../utils";
import { availableTatStatus } from "../utils/constants";

const useTripStats = () => {
  const tripsList = useSelector((state) => state.trip.list);

  const totalTrips = tripsList.length;

  const delivered = tripsList.filter(
    (trip) => trip.currentStatusCode === "DEL"
  ).length;

  const inTransit = tripsList.filter(
    (trip) => trip.currentStatusCode === "INT"
  ).length;

  const delayed = tripsList.filter(
    (trip) => calculateTatStatus(trip) === availableTatStatus.DELAYED
  ).length;

  const onTime = tripsList.filter(
    (trip) => calculateTatStatus(trip) === availableTatStatus.ONTIME
  ).length;

  const onTimePercentage = (onTime) / (totalTrips) * 100;

  return {
    delayed,
    totalTrips,
    delivered,
    inTransit,
    onTimePercentage
  };
};

export default useTripStats;
