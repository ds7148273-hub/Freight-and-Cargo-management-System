export const navLinks = [
  { label: "Services", to: "/services" },
  { label: "Network", to: "/" },
  { label: "Track Shipment", to: "/" },
  { label: "About", to: "/" },
  { label: "Contact", to: "/" },
];

export const services = [
  {
    id: "full-trainload",
    title: "Full Trainload",
    category: "Bulk Freight",
    description:
      "Dedicated wagons for bulk commodity transport across India's rail corridors.",
    icon: "🚂",
    sla: "Dispatch in 6-12 hours",
    idealFor: "Cement, steel, coal, FMCG bulk lanes",
    features: [
      "Dedicated rake planning with predictable departure windows",
      "Station-to-station operations support",
      "Volume commitments with priority handling",
    ],
    process: ["Demand planning", "Rake allocation", "Dispatch monitoring", "POD closure"],
  },
  {
    id: "containerized-cargo",
    title: "Containerized Cargo",
    category: "Intermodal",
    description:
      "ISO-standard movement with stronger damage control and fast handling.",
    icon: "📦",
    sla: "Gate-out in under 4 hours",
    idealFor: "Consumer goods, pharma, electronics",
    features: [
      "TEU/FEU container booking with lane balancing",
      "Reduced handling risk and improved cargo safety",
      "Yard and terminal milestone visibility",
    ],
    process: ["Container booking", "Terminal handoff", "Line-haul movement", "Final delivery"],
  },
  {
    id: "parcel-express",
    title: "Parcel & Express",
    category: "Time-Critical",
    description:
      "Time-sensitive shipments with tighter turnarounds for urgent lanes.",
    icon: "⚡",
    sla: "Same-day dispatch where available",
    idealFor: "E-commerce, spare parts, urgent B2B loads",
    features: [
      "Express scheduling for high-frequency corridors",
      "Compact shipment consolidation for cost efficiency",
      "Rapid exception handling and rerouting",
    ],
    process: ["Pickup intake", "Hub sorting", "Express line-haul", "Priority handoff"],
  },
  {
    id: "rail-side-warehousing",
    title: "Rail-Side Warehousing",
    category: "Storage & Fulfillment",
    description:
      "Integrated storage, inventory snapshots, and dispatch planning at key hubs.",
    icon: "🏭",
    sla: "Dock allocation within 2 hours",
    idealFor: "Manufacturing, imports, seasonal inventory",
    features: [
      "Short-term and medium-term storage options",
      "Inbound and outbound dock coordination",
      "Inventory visibility with dispatch scheduling",
    ],
    process: ["Inbound receipt", "Storage mapping", "Order planning", "Dispatch execution"],
  },
  {
    id: "live-tracking",
    title: "Live Tracking",
    category: "Visibility",
    description:
      "Real-time movement updates with milestone alerts and ETA notifications.",
    icon: "📍",
    sla: "Near real-time status updates",
    idealFor: "Ops control towers and enterprise coordinators",
    features: [
      "Route milestone tracking with proactive alerts",
      "ETA projections based on movement events",
      "Central dashboard for multi-shipment visibility",
    ],
    process: ["Shipment tagging", "Live status feed", "ETA prediction", "Alert resolution"],
  },
  {
    id: "last-mile-delivery",
    title: "Last-Mile Delivery",
    category: "Rail-to-Road",
    description:
      "Rail-to-road execution for dependable door-step fulfillment.",
    icon: "🚛",
    sla: "Delivery scheduling within 24 hours",
    idealFor: "Retail replenishment and distributor networks",
    features: [
      "Railhead-to-destination dispatch management",
      "Vendor and fleet coordination for final movement",
      "Proof-of-delivery confirmation and closure",
    ],
    process: ["Railhead unloading", "Vehicle assignment", "Out-for-delivery", "POD confirmation"],
  },
];

export const stats = [
  { value: "68,000+", label: "Route KMs" },
  { value: "1.4B", label: "Tonnes/Year" },
  { value: "7,349", label: "Stations" },
  { value: "28", label: "States Covered" },
];

export const routes = [
  { from: "Mumbai", to: "Delhi", time: "14h", frequency: "Daily" },
  { from: "Chennai", to: "Kolkata", time: "22h", frequency: "Daily" },
  {
    from: "Bengaluru",
    to: "Hyderabad",
    time: "8h",
    frequency: "Twice Daily",
  },
  { from: "Ahmedabad", to: "Pune", time: "10h", frequency: "Daily" },
];

export const trackingRecords = {
  WG47219: {
    status: "In Transit",
    location: "Nagpur Junction",
    eta: "Tomorrow, 09:40 AM",
  },
  CN19285: {
    status: "Dispatched",
    location: "Chennai Freight Terminal",
    eta: "Apr 4, 03:15 PM",
  },
  PR88900: {
    status: "Delivered",
    location: "Delhi ICD",
    eta: "Delivered on Apr 1, 07:20 PM",
  },
};
