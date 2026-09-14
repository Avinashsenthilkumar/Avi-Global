// Real project data only — no invented stats, testimonials, or numbers.
// Add screenshots by dropping images into /public/images/projects/<slug>/
// and referencing them in the `gallery` array below.

export const projects = [
  {
    slug: "ganesh-nursery",
    name: "Ganesh Nursery",
    location: "Thanjavur, Tamil Nadu, India",
    category: "Business Website",
    filterCategory: "websites",
    website: "https://ganeshnursery.co.in",
    also: [{ label: "macadamianuts.com", url: "https://macadamianuts.com" }],
    overview:
      "A business website built for Ganesh Nursery, a plant nursery business based in Thanjavur.",
    gallery: [],
  },
  {
    slug: "macadamia-nuts",
    name: "Macadamia Nuts",
    location: "Thanjavur, Tamil Nadu, India",
    category: "Business Website / E-commerce",
    filterCategory: "ecommerce",
    website: "https://macadamianuts.com",
    overview: "A business website built alongside the Ganesh Nursery project.",
    gallery: [],
  },
  {
    slug: "aara-fashions",
    name: "Aara Fashions",
    location: "Thanjavur, Tamil Nadu, India",
    category: "E-commerce / Fashion",
    filterCategory: "ecommerce",
    website: "https://aarafashions.in",
    overview: "An e-commerce platform built for Aara Fashions.",
    gallery: [],
  },
  {
    slug: "artesia-drilling",
    name: "Artesia Drilling",
    location: "Kenya",
    category: "Corporate Website",
    filterCategory: "websites",
    website: "https://artesiandrilling.com",
    overview: "A corporate website built for Artesia Drilling.",
    gallery: [],
  },
  {
    slug: "marudham-veg",
    name: "Marudham Veg",
    location: "Kenya",
    category: "Business Website",
    filterCategory: "websites",
    website: "https://marudhamveg.com",
    overview: "A business website built for Marudham Veg.",
    gallery: [],
  },
  {
    slug: "monika-luxe-interiors",
    name: "Monika Luxe Interiors",
    location: "Thanjavur, Tamil Nadu, India",
    category: "Luxury Interior Business Website",
    filterCategory: "websites",
    website: "https://monikaluxeinteriors.com",
    overview: "A luxury interior design business website built for Monika Luxe Interiors.",
    gallery: [],
  },
  {
    slug: "face-flow-attendance",
    name: "Face Flow Attendance",
    location: "",
    category: "Mobile Application",
    filterCategory: "mobile",
    website: "",
    overview: "A mobile application for attendance management.",
    gallery: [],
  },
  {
    slug: "gym-management",
    name: "Gym Management App",
    location: "",
    category: "Mobile Application / Management System",
    filterCategory: "mobile",
    website: "",
    overview: "A mobile application and management system built for gym businesses.",
    gallery: [],
  },
];

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug);
}
