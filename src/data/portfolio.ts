export type ExperienceProject = {
  title: string;
  summary: string;
};

export type Experience = {
  role: string;
  company: string;
  period: string;
  location: string;
  accent: string;
  points: string[];
  projects: ExperienceProject[];
  stack: string[];
};

export type SkillGroup = {
  title: string;
  label: string;
  description: string;
  accent: string;
  items: string[];
};

export type Project = {
  title: string;
  category: string;
  description: string;
  tags: string[];
};

export type EducationItem = {
  title: string;
  place: string;
  meta: string;
  value: string;
};

export const experiences: Experience[] = [
  {
    role: "Full Stack Developer",
    company: "XOZO Technology Private Limited",
    period: "July 2025 - Present",
    location: "Remote",
    accent: "from-[#ffb36a] to-[#ff6a88]",
    points: [
      "Delivered modern mobile applications with real-time capabilities and smooth, conversion-focused user flows.",
      "Built cross-platform Flutter apps powered by scalable APIs and resilient backend integrations.",
      "Improved backend performance and released reliable experiences across web and mobile platforms.",
    ],
    projects: [
      {
        title: "Ecommerce Mobile App",
        summary:
          "Engineered an ecommerce mobile app with robust catalog browsing, cart and checkout journeys, and scalable API integrations for consistent performance.",
      },
      {
        title: "School Management ERP",
        summary:
          "Developed a complete web and mobile ERP platform for schools with attendance, exams, fees, dashboards, QR-based check-ins, Firebase notifications, and Razorpay payments.",
      },
    ],
    stack: ["Flutter", "Next.js", "Django", "Flask", "PostgreSQL", "Firebase", "Razorpay"],
  },
  {
    role: "Full Stack Developer",
    company: "Big Bang Boom Solutions",
    period: "July 2024 - April 2025",
    location: "Chennai / On-site at DGIS, Delhi",
    accent: "from-[#7ef7c8] to-[#3aa5ff]",
    points: [
      "Built secure web applications focused on scalability, stability, and real-time processing.",
      "Implemented Angular frontends, Flask APIs, RBAC modules, and spatial workflows with GeoServer and Leaflet.",
      "Optimized PostgreSQL performance and supported dependable deployments in Virtual Box environments.",
    ],
    projects: [
      {
        title: "Geospatial Web Application",
        summary:
          "Built a secure, scalable geospatial platform with live mapping, analytics, role-based access control, GeoServer integration, and reliable support for multi-user workflows.",
      },
    ],
    stack: ["Angular", "Flask", "PostgreSQL", "GeoServer", "Leaflet", "REST APIs", "Unity"],
  },
];

export const highlights = [
  "1+ year delivering secure full stack and mobile products in production",
  "Hands-on experience across ERP, ecommerce, and real-time systems",
  "Strong execution with Next.js, Flutter, Python, PostgreSQL, and APIs",
];

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    label: "UI Engineering",
    description:
      "Crafting responsive interfaces that feel polished, intuitive, and fast across modern web products.",
    accent: "from-[#ffb86c] via-[#ff8f6b] to-[#ff6d88]",
    items: ["HTML", "CSS", "JavaScript", "Angular", "React", "Next.js"],
  },
  {
    title: "Backend",
    label: "API & Logic",
    description:
      "Designing scalable backend services, business logic, and secure integrations for production systems.",
    accent: "from-[#61d6ff] via-[#4fa6ff] to-[#5f7bff]",
    items: ["Python", "Flask", "FastAPI", "Django", "REST API Design"],
  },
  {
    title: "Data & Mobile",
    label: "Cross-Platform Delivery",
    description:
      "Building mobile-ready products with strong data handling, notifications, and payment workflows.",
    accent: "from-[#62e6c2] via-[#35c7a4] to-[#1ba084]",
    items: ["PostgreSQL", "MySQL", "Flutter", "Firebase", "Razorpay"],
  },
  {
    title: "Specialties",
    label: "Advanced Workflows",
    description:
      "Driving access control, optimization, integrations, and delivery practices for complex applications.",
    accent: "from-[#ffd36c] via-[#f3a34c] to-[#de7c3a]",
    items: ["GeoServer", "Leaflet", "RBAC", "Performance Optimization", "Agile / Scrum"],
  },
];

export const projects: Project[] = [
  {
    title: "Geospatial Web Application",
    category: "Web Platform",
    description:
      "Enterprise-ready mapping platform with live visualization, GeoServer, Leaflet, and role-based access.",
    tags: ["Angular", "Flask", "Leaflet"],
  },
  {
    title: "Simulation & Training System",
    category: "Realtime System",
    description: "Real-time training platform with Unity integration, telemetry, and live analytics APIs.",
    tags: ["Unity", "Realtime APIs", "Analytics"],
  },
  {
    title: "Mobile Mapping Application",
    category: "Mobile App",
    description: "Cross-platform mobile app with real-time tracking, location intelligence, and robust API support.",
    tags: ["Flutter", "Tracking", "APIs"],
  },
  {
    title: "Ecommerce Mobile App",
    category: "Commerce",
    description: "Commerce app with product catalog, cart, checkout, and supplier management workflows.",
    tags: ["Checkout", "Payments", "Flutter"],
  },
  {
    title: "School Management ERP",
    category: "ERP Product",
    description: "School ERP with attendance, exams, dashboards, QR check-ins, and fee payment workflows.",
    tags: ["ERP", "QR Attendance", "Dashboards"],
  },
  {
    title: "IoT Forest Fire Detection System",
    category: "IoT Solution",
    description: "IoT wildfire detection system using sensors, computer vision, and real-time early alerts.",
    tags: ["IoT", "Computer Vision", "Alerts"],
  },
  {
    title: "Personal Website",
    category: "Showcase Site",
    description: "Responsive personal brand site focused on polished UI, storytelling, and clear project presentation.",
    tags: ["Next.js", "UI Design", "Responsive"],
  },
];

export const achievements = [
  "Runner-up - Livewire Hackengers centerwide coding competition",
  "1st Prize - Engineer's Day Python Tkinter project",
  "3rd Prize - Java project for an online quiz system",
];

export const education: EducationItem[] = [
  {
    title: "B.E. Electronics and Communication Engineering",
    place: "JJ College of Engineering and Technology",
    meta: "2019 - 2023",
    value: "CGPA 8.4",
  },
  {
    title: "HSC",
    place: "St. Joseph's College Higher Secondary School",
    meta: "2018 - 2019",
    value: "69%",
  },
  {
    title: "SSLC",
    place: "St. Joseph's College Higher Secondary School",
    meta: "2016 - 2017",
    value: "93%",
  },
];

export const certifications = [
  "Full Stack Development (MEAN Stack) - Livewire, Trichy",
  "Python and Core Java - Livewire, Trichy",
];
