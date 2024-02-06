import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import BookingDetails from "./BookingDetails";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CMPLoader from "../../../Components/CMPLoader/CMPLoader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const BookingDetailsWrapper = () => {
  const { uid } = useParams();
  const [loading, setLoading] = useState(true);
  const [addOnsData, setAddOnsData] = useState([]);
  const [bookingDetails, setBookingDetails] = useState({}); 
   const { bookingItems } = useSelector((state) => state.booking);
  let singleBookingData = bookingItems.find((item) => item.id === uid);
console.log(singleBookingData)


const fetchBookingDetails = async () => {
  try {
    if (!singleBookingData) {
      setLoading(true);
    } else {
      setBookingDetails(singleBookingData);

      // Extract and set add-ons data
      if (singleBookingData.addonData) {
        setAddOnsData(singleBookingData.addonData);
      }

      // Extract and set booking data
      if (singleBookingData.bookingData) {
        setBookingDetails(singleBookingData.bookingData[0]);
      }

      setLoading(false); // Data is loaded, set loading to false
    }
  } catch (error) {
    toast.error("Unable to fetch booking", {
      position: "top-right",
    });

    console.error("Error fetching booking by ID:", error);
  }
};
  let isStatusComplete = singleBookingData?.status;
 console.log(bookingDetails ,"bookingDetails")
  useEffect(() => {
    fetchBookingDetails();
  }, [uid]); // Fetch data when uid changes

  const initialValues = {
    firstName: bookingDetails?.firstName || "",
    lastName: bookingDetails?.lastName || "",
    phone: bookingDetails?.phone || "",
    email: bookingDetails?.email || "",
    address: bookingDetails?.address || "",
    homeType: bookingDetails?.homeType || "",
    bedrooms: bookingDetails?.bedrooms || "",
    bathrooms: bookingDetails?.bathrooms || "",
    noOfBedrooms: bookingDetails?.noOfBedrooms || "",
    noOfBathrooms: bookingDetails?.noOfBathrooms || "",
    additionalFeatures: bookingDetails?.additionalFeatures || "",
    houseMembers: bookingDetails?.houseMembers || "",
    pets: bookingDetails?.pets || "",
    smoking: bookingDetails?.smoking || "",
    pestType: bookingDetails?.pestType || "",
    state: bookingDetails?.state || "",
    initialServicesRequested: bookingDetails?.initialServicesRequested || "",
    addOns: bookingDetails?.addOns || "",
    areaOfFocus: bookingDetails?.areaOfFocus || "",
    storage: bookingDetails?.storage || "",
    storageType: bookingDetails?.storageType || "",
    cleaningSupplies: bookingDetails?.cleaningSupplies || "",
    cleaningEquipment: bookingDetails?.cleaningEquipment || "",
    anticipatedStartDate: bookingDetails?.anticipatedStartDate || "",
    initialFrequencyofService: bookingDetails?.initialFrequencyofService || "",
    mentalEmotionalState: bookingDetails?.mentalEmotionalState || "",
    inCrisis: bookingDetails?.inCrisis || "",
    additionalNotes: bookingDetails?.additionalNotes || "",
    status: bookingDetails?.status || "",

    // Initialize other fields here
  };

  return (
    <>
      {loading ? ( // Display the loader when loading is true
        <CMPLoader />
      ) : (
        <Formik enableReinitialize initialValues={initialValues}>
          {(formikProps) => (
            <Form>
              <BookingDetails
                formikProps={formikProps}
                uid={uid}
                bookingDetails={bookingDetails}
                isStatusComplete={isStatusComplete}
              />
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default BookingDetailsWrapper;
