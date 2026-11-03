// Central site configuration.
// Fill in email and address whenever you have them — every component
// reads from here, and gracefully hides a field if it's empty.

export const siteConfig = {
  name: "AVI GLOBAL SOLUTIONS",
  shortName: "AVI GLOBAL",
  tagline: "INNOVATE • INTEGRATE • EMPOWER • ELEVATE",
  description:
    "AVI GLOBAL SOLUTIONS provides premium web development, e-commerce, mobile applications, custom software, UI/UX design and end-to-end digital solutions for businesses in India, Kenya and worldwide.",
  url: "https://www.aviglobalsolutions.com",
  phone: "+91 63825 35043",
  phoneRaw: "916382535043", // used for tel: and wa.me links
  // Brand-film intro on the home page. Kept in the code for later — set to
  // true to bring it back.
  showIntro: false,
  email: "", // TODO: add company email
  addressLine1: "", // TODO: add address line 1
  addressLine2: "", // TODO: add address line 2
  city: "Thanjavur, Tamil Nadu, India",
  regions: ["India", "Kenya", "Worldwide"],
  whatsappDefaultMessage:
    "Hi AVI GLOBAL SOLUTIONS, I'd like to discuss a project.",
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Process", href: "/process" },
  { label: "Contact", href: "/contact" },
];
