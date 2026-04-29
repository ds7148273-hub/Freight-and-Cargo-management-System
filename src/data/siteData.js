export const navLinks = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Track Freight", to: "/tracking" },
  { label: "Login", to: "/login" },
];

export const services = [
  {
    id: "admin-control",
    title: "Admin Train Management",
    category: "Admin Role",
    description: "Admins can add train timings, destinations, prices, and route capacity from one dashboard.",
    icon: "A",
    sla: "Simple CRUD flow",
    idealFor: "Station managers and operations admins",
    features: [
      "Add train number, route, departure, and arrival timings",
      "Monitor all user bookings in one place",
      "Update shipment status and live location",
    ],
    process: ["Login as admin", "Create train schedule", "Review bookings", "Update status"],
  },
  {
    id: "user-booking",
    title: "Freight Booking",
    category: "User Role",
    description: "Users can select a train, choose destination, and book freight according to their needs.",
    icon: "U",
    sla: "Fast booking form",
    idealFor: "Business customers and dispatch teams",
    features: [
      "Select train by source and destination",
      "Enter freight type, weight, and quantity",
      "Get booking history with tracking ID",
    ],
    process: ["Register", "Choose train", "Submit booking", "Track shipment"],
  },
  {
    id: "tracking-status",
    title: "Tracking And History",
    category: "Visibility",
    description: "Users can check live location, order status, and complete booking history from the dashboard.",
    icon: "T",
    sla: "Real-time status updates",
    idealFor: "Customers who need shipment visibility",
    features: [
      "Track booking with tracking ID",
      "See current status and live location",
      "Review earlier tracking updates in one timeline",
    ],
    process: ["Open dashboard", "Check latest shipment", "View history", "Track by ID"],
  },
];

export const stats = [
  { value: "2", label: "Project Roles" },
  { value: "3", label: "Main Modules" },
  { value: "24x7", label: "Tracking Access" },
  { value: "100%", label: "Viva Friendly Flow" },
];

export const routes = [
  { from: "Mumbai", to: "Delhi", time: "06:00 AM", frequency: "Daily" },
  { from: "Kolkata", to: "Chennai", time: "09:30 AM", frequency: "Daily" },
  { from: "Bengaluru", to: "Hyderabad", time: "01:00 PM", frequency: "Daily" },
];
