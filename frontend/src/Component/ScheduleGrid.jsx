// src/Component/ScheduleGrid.jsx

import { useState, useEffect, useContext } from 'react';
import {
  Box,
  Select,
  VStack,
  Heading,
  Text,
  Spinner,
  Alert,
  AlertIcon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  useToast,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import './ScheduleGrid.css'; // Import the custom CSS
import { AuthContext } from '../AuthContext';
import { generateDateRange } from "../utils/dateUtils.js" // Import the date utility

const ScheduleGrid = () => {
  const { user, isAuthenticated } = useContext(AuthContext); // Correct Hook usage

  // State for centers
  const [centers, setCenters] = useState([]);
  const [centersLoading, setCentersLoading] = useState(false);
  const [centersError, setCentersError] = useState(null);

  // State for sports
  const [sports, setSports] = useState([]);
  const [sportsLoading, setSportsLoading] = useState(false);
  const [sportsError, setSportsError] = useState(null);

  // State for available courts
  const [availableCourts, setAvailableCourts] = useState([]);
  const [courtsLoading, setCourtsLoading] = useState(false);
  const [courtsError, setCourtsError] = useState(null);

  // State for available slots
  const [availableSlots, setAvailableSlots] = useState([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsError, setSlotsError] = useState(null);

  // State for selections
  const [selectedCenterId, setSelectedCenterId] = useState("");
  const [selectedSport, setSelectedSport] = useState("");
  const [selectedCourt, setSelectedCourt] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  // Generate dynamic dates (e.g., next 7 days)
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const dynamicDates = generateDateRange(7); // Generate next 7 days
    setDates(dynamicDates);
    console.log("Generated Dynamic Dates:", dynamicDates);
  }, []); // Run once on component mount

  // Modal controls
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedSlot, setSelectedSlot] = useState(null); // { startTime, endTime, courtName }
  const [bookingName, setBookingName] = useState("");
  const [bookingItems, setBookingItems] = useState(0);
  const [bookingSlots, setBookingSlots] = useState("");
  const toast = useToast();

  // Fetch centers on component mount
  useEffect(() => {
    const fetchCenters = async () => {
      setCentersLoading(true);
      setCentersError(null);
      try {
        const response = await fetch('http://localhost:4000/api/centre/getCentre');
        if (!response.ok) {
          throw new Error(`Error fetching centers: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Fetched Centers Data:", data);
        setCenters(data.centres || []); // Adjust based on your API response structure
      } catch (error) {
        console.error("Error in fetchCenters:", error);
        setCentersError(error.message);
      } finally {
        setCentersLoading(false);
      }
    };

    fetchCenters();
  }, []);

  // Fetch sports when a center is selected
  useEffect(() => {
    if (!selectedCenterId) {
      setSports([]);
      return;
    }

    const fetchSports = async () => {
      setSportsLoading(true);
      setSportsError(null);
      try {
        const response = await fetch(`http://localhost:4000/api/sport/getSport?centreId=${selectedCenterId}`);
        if (!response.ok) {
          throw new Error(`Error fetching sports: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Fetched Sports Data:", data);
        setSports(data.sports || []); // Adjust based on your API response structure
      } catch (error) {
        console.error("Error in fetchSports:", error);
        setSportsError(error.message);
      } finally {
        setSportsLoading(false);
      }
    };

    fetchSports();
  }, [selectedCenterId]);

  // Fetch courts when sport and center are selected
  useEffect(() => {
    if (selectedSport && selectedCenterId) {
      fetchCourts(selectedSport, selectedCenterId);
      setSelectedCourt(""); // Reset selected court when sport or center changes
    } else {
      setAvailableCourts([]); // Clear courts if sport or center is deselected
      setSelectedCourt("");
    }
  }, [selectedSport, selectedCenterId]);

  // Function to fetch courts based on sport and center
  const fetchCourts = async (sportId, centerId) => {
    setCourtsLoading(true);
    setCourtsError(null);
    try {
      const response = await fetch(`http://localhost:4000/api/court/getCourt?sport=${sportId}&center=${centerId}`);
      if (!response.ok) {
        throw new Error(`Error fetching courts: ${response.statusText}`);
      }
      const data = await response.json();
      console.log("Fetched Courts Data:", data);
      setAvailableCourts(data.data || []);
    } catch (error) {
      console.error("Error in fetchCourts:", error);
      setCourtsError(error.message);
    } finally {
      setCourtsLoading(false);
    }
  };

  // Handle Submit Button Click to Fetch Available Slots
  const handleSubmit = async () => {
    if (!selectedCenterId || !selectedSport || !selectedCourt || !selectedDate) {
      toast({
        title: "Missing Information",
        description: "Please select center, sport, court, and date.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setSlotsLoading(true);
    setSlotsError(null);
    setAvailableSlots([]);

    try {
      const response = await fetch(`http://localhost:4000/api/schedule/availableSlots?centre=${selectedCenterId}&sport=${selectedSport}&court=${selectedCourt}&date=${selectedDate}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error fetching available slots.");
      }
      const data = await response.json();
      console.log("Fetched Available Slots:", data);

      // Assuming the API returns all slots, mark them as booked or available
      // If the API only returns available slots, you might need to fetch all slots separately
      // For demonstration, we'll assume it returns only available slots and we'll track booked slots locally

      // Initialize availableSlots with a 'booked' property set to false
      const initializedSlots = data.availableSlots.map(slot => ({
        ...slot,
        booked: false, // Initially, all fetched slots are available
      }));

      setAvailableSlots(initializedSlots);
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      setSlotsError(error.message);
    } finally {
      setSlotsLoading(false);
    }
  };

  // Function to handle slot click
  const handleSlotClick = (slot) => {
    // Prevent clicking on already booked slots
    if (slot.booked) return;

    setSelectedSlot(slot);
    onOpen();
  };

  // Function to handle booking submission
  const handleBookingSubmit = async () => {
    if (!selectedSlot) return;

    const { startTime, endTime } = selectedSlot;

    // Ensure user is authenticated
    if (!user) {
      toast({
        title: "User not authenticated",
        description: "Please log in to book a slot.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    // Prepare booking data
    const bookingData = {
      centre: selectedCenterId,
      sport: selectedSport,
      court: selectedCourt,
      date: selectedDate,
      startTime: startTime,
      // endTime will be set automatically by the pre-validate hook
      user: user._id, // Use the actual user ID from auth context
    };

    try {
      const response = await fetch('http://localhost:4000/api/booking/createBooking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // Include token if required
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error booking the slot');
      }

      const newBooking = await response.json();
      console.log("Booking Created:", newBooking);

      // Update the availableSlots state by marking the booked slot
      setAvailableSlots(prevSlots =>
        prevSlots.map(slot =>
          slot.startTime === startTime ? { ...slot, booked: true } : slot
        )
      );

      toast({
        title: "Booking Successful",
        description: `Court booked from ${startTime} to ${endTime}.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Reset booking form and close modal
      setBookingName("");
      setBookingItems(0);
      setBookingSlots("");
      setSelectedSlot(null);
      onClose();
    } catch (error) {
      console.error("Error in handleBookingSubmit:", error);
      toast({
        title: "Booking Failed",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box className="schedule-container" p={4}>
      <Heading mb={4} fontSize="2xl" textAlign="center">Court-wise Schedule</Heading>

      <VStack spacing={4} align="stretch" className="selectors">
        {/* Center Selection */}
        {centersError && (
          <Alert status="error">
            <AlertIcon />
            {centersError}
          </Alert>
        )}
        <Select
          className="select-dropdown"
          placeholder={centersLoading ? "Loading Centers..." : "Select Center"}
          value={selectedCenterId}
          onChange={(e) => {
            setSelectedCenterId(e.target.value);
            setSelectedSport(""); // Reset sport when center changes
            setSelectedCourt(""); // Reset court when center changes
            setSelectedDate(""); // Reset date when center changes
            setAvailableCourts([]); // Clear courts when center changes
            setAvailableSlots([]); // Clear slots when center changes
          }}
          isDisabled={centersLoading || centersError}
        >
          {centers.map((center) => (
            <option key={center._id} value={center._id}>{center.name}</option>
          ))}
        </Select>
        {centersLoading && <Spinner size="sm" />}

        {/* Sport Selection */}
        {sportsError && (
          <Alert status="error">
            <AlertIcon />
            {sportsError}
          </Alert>
        )}
        <Select
          className="select-dropdown"
          placeholder={sportsLoading ? "Loading Sports..." : "Select Sport"}
          value={selectedSport}
          onChange={(e) => {
            setSelectedSport(e.target.value);
            setSelectedCourt(""); // Reset court when sport changes
            setSelectedDate(""); // Reset date when sport changes
            setAvailableCourts([]); // Clear courts when sport changes
            setAvailableSlots([]); // Clear slots when sport changes
          }}
          isDisabled={!selectedCenterId || sportsLoading || sportsError}
        >
          {sports.map((sport) => (
            <option key={sport._id} value={sport._id}>{sport.name}</option>
          ))}
        </Select>
        {sportsLoading && <Spinner size="sm" />}

        {/* Court Selection */}
        {courtsError && (
          <Alert status="error">
            <AlertIcon />
            {courtsError}
          </Alert>
        )}
        <Select
          className="select-dropdown"
          placeholder={courtsLoading ? "Loading Courts..." : "Select Court"}
          value={selectedCourt}
          onChange={(e) => {
            setSelectedCourt(e.target.value);
            setSelectedDate(""); // Reset date when court changes
            setAvailableSlots([]); // Clear slots when court changes
          }}
          isDisabled={!selectedSport || !selectedCenterId || courtsLoading || courtsError}
        >
          {availableCourts.map((court) => (
            <option key={court._id} value={court._id}>{court.name}</option>
          ))}
        </Select>
        {courtsLoading && <Spinner size="sm" />}

        {/* Date Selection */}
        <Select
          className="select-dropdown"
          placeholder="Select Date"
          value={selectedDate}
          onChange={(e) => {
            setSelectedDate(e.target.value);
            setAvailableSlots([]); // Clear slots when date changes
          }}
          isDisabled={!selectedCourt}
        >
          {dates.map((date, index) => (
            <option key={index} value={date}>{new Date(date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</option>
          ))}
        </Select>

        {/* Submit Button */}
        <Button
          colorScheme="blue"
          onClick={handleSubmit}
          isDisabled={!selectedCenterId || !selectedSport || !selectedCourt || !selectedDate || slotsLoading}
        >
          {slotsLoading ? <Spinner size="sm" /> : "Find Available Slots"}
        </Button>
      </VStack>

      {/* Loading and Error States for Available Slots */}
      {slotsLoading && (
        <Box mt={8} textAlign="center">
          <Spinner size="lg" />
        </Box>
      )}
      {slotsError && (
        <Alert status="error" mt={8}>
          <AlertIcon />
          {slotsError}
        </Alert>
      )}

      {/* Available Slots Display */}
      {!slotsLoading && !slotsError && availableSlots.length > 0 && (
        <Box className="slots-container" mt={8}>
          <Heading size="md" mb={4}>Available Slots</Heading>
          <Grid templateColumns="repeat(auto-fit, minmax(150px, 1fr))" gap={4}>
            {availableSlots.map((slot, index) => (
              <GridItem key={index}>
                <Box
                  borderWidth="1px"
                  borderRadius="md"
                  p={4}
                  textAlign="center"
                  bg={slot.booked ? "red.100" : "green.100"} // Conditional background color
                  cursor={slot.booked ? "not-allowed" : "pointer"}
                  _hover={{ bg: slot.booked ? "red.200" : "green.200" }}
                  onClick={() => handleSlotClick(slot)}
                >
                  <Text fontWeight="bold">{slot.startTime} - {slot.endTime}</Text>
                  {slot.booked && (
                    <Text fontSize="sm" color="red.500">
                      Booked
                    </Text>
                  )}
                </Box>
              </GridItem>
            ))}
          </Grid>
        </Box>
      )}

      {/* No Available Slots Message */}
      {!slotsLoading && !slotsError && availableSlots.length === 0 && selectedDate && (
        <Text mt={8} textAlign="center" color="gray.500">
          No available slots for the selected criteria.
        </Text>
      )}

      {/* Booking Modal */}
      <Modal isOpen={isOpen} onClose={() => { onClose(); setSelectedSlot(null); }}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Book Slot</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <FormControl id="name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder="Your Name"
                  value={bookingName}
                  onChange={(e) => setBookingName(e.target.value)}
                />
              </FormControl>
              <Text fontSize="sm" color="gray.500">
                Time Slot: {selectedSlot?.startTime} - {selectedSlot?.endTime}
              </Text>
              <Text fontSize="sm" color="gray.500">
                Court: {availableCourts.find(c => c._id === selectedCourt)?.name || selectedCourt}
              </Text>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button 
              colorScheme="blue" 
              mr={3} 
              onClick={handleBookingSubmit} 
              isDisabled={!bookingName}
            >
              Book
            </Button>
            <Button variant="ghost" onClick={() => { onClose(); setSelectedSlot(null); }}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ScheduleGrid;
