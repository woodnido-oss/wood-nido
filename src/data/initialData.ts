import { WoodCategory, WoodProduct, WoodProject, ClientReview, CustomerInquiry, SiteSettings, GalleryPhoto, HeroSlide } from '../types';

export const initialHeroSlides: HeroSlide[] = [
  {
    id: 1,
    headline: 'MODERN FURNITURE',
    price: 'Start From 15k',
    subtext: 'Possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart.',
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1800&q=85',
    itemTitle: 'Organic Ash Wood Accent Chair & Pedestal Table',
    badge: '100% Solid Hardwood'
  },
  {
    id: 2,
    headline: 'BESPOKE KITCHEN & CUPBOARDS',
    price: 'Custom Luxury Suites',
    subtext: 'Combining high-precision German fittings with timeless solid teak woodwork crafted to last generations.',
    imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1800&q=85',
    itemTitle: 'Modular Solid Wood Island Cabinetry',
    badge: 'Precision Craftsmanship'
  },
  {
    id: 3,
    headline: 'WOOD POLISH & RESTORATION',
    price: 'From Rs 15k / Room',
    subtext: 'Restore the warm natural grain luster of your doors, tables, and furniture with expert deco & lacquer polishing.',
    imageUrl: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1800&q=85',
    itemTitle: 'Master Hand-Rubbed Walnut Lacquer Finish',
    badge: 'Architectural Grade'
  },
  {
    id: 4,
    headline: 'SOLID WALNUT DINING TABLES',
    price: 'Custom 6 & 8 Seaters',
    subtext: 'Live edge and minimalist Scandinavian dining tables hand-joined with traditional mortise-and-tenon craftsmanship.',
    imageUrl: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1800&q=85',
    itemTitle: 'Royal Sheesham Wood 8-Seater Dining Set',
    badge: 'Kiln Dried Hardwood'
  },
  {
    id: 5,
    headline: 'LUXURY BEDROOM INTERIORS',
    price: 'King & Queen Suites',
    subtext: 'Floating platform beds, acoustic wood slat headboard walls, and matching walnut nightstands built to order.',
    imageUrl: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1800&q=85',
    itemTitle: 'Minimalist Platform King Bed in Natural Oak',
    badge: 'Bespoke Master Bedrooms'
  },
  {
    id: 6,
    headline: 'HAND-CARVED TEAK DOORS',
    price: 'Main Entrance & Rooms',
    subtext: 'Heavy solid Burma teak and Ash wood main entry doors engineered with weather-resistant natural oil finish.',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1800&q=85',
    itemTitle: 'Modern Fluted Panel Solid Entrance Door',
    badge: 'Lifetime Durability'
  },
  {
    id: 7,
    headline: 'WALK-IN WARDROBES & CLOSETS',
    price: 'Floor-to-Ceiling Storage',
    subtext: 'Integrated soft-close wardrobe units with internal LED warm illumination, glass doors, and shoe pullouts.',
    imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1800&q=85',
    itemTitle: 'Open Concept Textured Wood Modular Closet',
    badge: 'Custom Sizing & Drawers'
  },
  {
    id: 8,
    headline: 'EXECUTIVE OFFICE DESKS',
    price: 'Corporate & Home Office',
    subtext: 'Ergonomic solid wood work desks featuring concealed cable raceways, leather inlay mats, and matching credenzas.',
    imageUrl: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1800&q=85',
    itemTitle: 'Executive Sheesham Wood L-Shape Desk',
    badge: 'Ergonomic & Robust'
  },
  {
    id: 9,
    headline: 'TV WALL CONSOLES & MEDIA UNITS',
    price: 'Designer Living Rooms',
    subtext: 'Seamless floating media consoles with slatted acoustic backings, ambient backlighting, and hidden AV storage.',
    imageUrl: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1800&q=85',
    itemTitle: 'Floating Walnut TV Entertainment Center',
    badge: 'Acoustic Wood Paneling'
  },
  {
    id: 10,
    headline: 'ARTISAN COFFEE & ACCENT TABLES',
    price: 'Start From Rs 12k',
    subtext: 'Sculptural organic wood nesting tables, round fluted pedestals, and entryway console tables handcrafted with care.',
    imageUrl: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=1800&q=85',
    itemTitle: 'Sculptural Round Ash Wood Coffee Table',
    badge: 'Hand-Turned Craft'
  }
];

export const initialSiteSettings: SiteSettings = {
  businessName: 'Wood Nido',
  tagline: 'Redefining Interiors with Craftsmanship & Quality',
  phone: '+92 334 9000098',
  whatsappNumber: '+923349000098',
  email: 'info@woodnido.com',
  address: 'Shop #1, Plot #126, I&T Center, G-9/1, Islamabad',
  locationName: 'Islamabad, Pakistan',
  yearsOfExperience: 10,
  industryExperts: 150,
  userRetention: 95,
  globalClients: 200,
  heroHeadline: 'MODERN FURNITURE',
  heroStartingPrice: 'Start From 15k',
  heroSubtext: 'Possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart.',
  heroSlides: initialHeroSlides,
  aboutImage1: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
  aboutImage2: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=800&q=80',
  aboutText1: 'Welcome to Wood Nido where creativity meets craftsmanship. We are a group of skilled designers and passionate artisans who want to transform your space with timeless elegance. We have years of experience in designing and creating bespoke, high-quality furniture and interiors to meet your specifications.',
  aboutText2: 'Wood Nido understands that each space has its unique personality. We take the time to understand your vision and needs to ensure that each piece we design reflects your style and is functional and durable. Our expertise and attention to detail will bring your ideas to reality, whether you\'re renovating your kitchen or designing your dream bedroom.',
  aboutText3: 'We strive to provide exceptional craftsmanship, thoughtful designs, and impeccable customer service to each client. Our furniture and woodwork will last the test of time because we combine traditional woodworking with modern design trends. Wood Nido is more than just a piece of furniture. It\'s an artistic addition to your home, reflecting your taste and lifestyle.',
  ctaImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
  showroomImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
  logoUrl: '',
  facebookUrl: 'https://facebook.com',
  instagramUrl: 'https://instagram.com',
  tiktokUrl: 'https://tiktok.com',
  youtubeUrl: 'https://youtube.com'
};

export const initialCategories: WoodCategory[] = [
  {
    id: 'cat-cupboards',
    name: 'Cupboards',
    slug: 'cupboards',
    imageUrl: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=600&q=80',
    description: 'Bespoke wardrobes, walk-in closets, and fitted storage crafted to maximize bedroom elegance.'
  },
  {
    id: 'cat-kitchen',
    name: 'Kitchen',
    slug: 'kitchen',
    imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80',
    description: 'Modern modular solid wood & high-gloss kitchen cabinetry with ergonomic fittings.'
  },
  {
    id: 'cat-doors',
    name: 'Doors',
    slug: 'doors',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
    description: 'Solid Sheesham, Teak, and Ash carved main entrances and interior panel doors.'
  },
  {
    id: 'cat-furniture',
    name: 'Furniture',
    slug: 'furniture',
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80',
    description: 'Handcrafted luxury sofas, designer bed sets, center tables, and dining consoles.'
  },
  {
    id: 'cat-office-table',
    name: 'Office Table',
    slug: 'office-table',
    imageUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&q=80',
    description: 'Executive wooden desks, conference tables, and modern ergonomic work desks.'
  },
  {
    id: 'cat-wood-ramp',
    name: 'Wood Ramp',
    slug: 'wood-ramp',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
    description: 'Durable hardwood staircases, decorative banisters, ramps, and outdoor wooden decks.'
  },
  {
    id: 'cat-poolish-wood',
    name: 'Poolish Wood',
    slug: 'poolish-wood',
    imageUrl: 'https://images.unsplash.com/photo-1540518614846-7ede433c4b4d?auto=format&fit=crop&w=600&q=80',
    description: 'Natural grain enhancement, polyurethane lacquer, and weather-resistant wood preservation.'
  },
  {
    id: 'cat-poolish-furniture',
    name: 'Poolish Furniture',
    slug: 'poolish-furniture',
    imageUrl: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=600&q=80',
    description: 'High-gloss deco finishes, distressed vintage coats, and smooth matte sheen restoration.'
  },
  {
    id: 'cat-home-paint',
    name: 'Home Paint',
    slug: 'home-paint',
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80',
    description: 'Architectural interior painting, wood accent wall treatments, and protective finishes.'
  }
];

export const initialProducts: WoodProduct[] = [
  {
    id: 'prod-1',
    title: 'Sculptural Organic Ash Wood Lounge Chair',
    category: 'Furniture',
    price: 34000,
    woodType: 'Solid Ash Wood',
    dimensions: '32"W x 34"D x 31"H',
    finishType: 'Natural Matte Satin Polish',
    inStock: true,
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
    description: 'A signature artistic piece with gentle curves and ergonomically shaped backrest. Masterfully joined without visible screws, highlighting natural ash wood grain.',
    estimatedDeliveryDays: 7,
    createdAt: '2025-01-15'
  },
  {
    id: 'prod-2',
    title: 'Minimalist Round Pedestal Coffee Table',
    category: 'Furniture',
    price: 18500,
    woodType: 'Pure Sheesham (Indian Rosewood)',
    dimensions: '36"Dia x 18"H',
    finishType: 'Warm Walnut Polyurethane',
    inStock: true,
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80',
    description: 'Classic round coffee table with tapered conical base. Solid hardwood construction with waterproof protective seal against stains and hot cups.',
    estimatedDeliveryDays: 5,
    createdAt: '2025-01-20'
  },
  {
    id: 'prod-3',
    title: 'Executive Handcrafted Mahogany Workstation Desk',
    category: 'Office Table',
    price: 78000,
    woodType: 'Mahogany & Ash',
    dimensions: '72"W x 36"D x 30"H',
    finishType: 'Deep Honey Gloss Polish',
    inStock: true,
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80',
    description: 'Spacious executive desk with integrated cable management, soft-close stationery drawers, and bevelled edge detailing for professional workspaces.',
    estimatedDeliveryDays: 10,
    createdAt: '2025-02-01'
  },
  {
    id: 'prod-4',
    title: 'Solid Teak Modular Island Kitchen Suite',
    category: 'Kitchen',
    price: 245000,
    woodType: 'Burmese Teak & Marine Ply',
    dimensions: 'Custom Fit / Modular (12ft x 9ft)',
    finishType: 'Water-Resistant PU Deco',
    inStock: true,
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
    description: 'Fully custom kitchen installation featuring concealed soft-closing Blum hardware, quartz top integration, spice racks, and fluted panel pantry units.',
    estimatedDeliveryDays: 18,
    createdAt: '2025-02-10'
  },
  {
    id: 'prod-5',
    title: 'Master Walk-In Floor-to-Ceiling Wardrobe Unit',
    category: 'Cupboards',
    price: 185000,
    woodType: 'Imported Oak & High-Density Core',
    dimensions: '10ft Width x 8.5ft Height',
    finishType: 'Nordic Oak Matt Grain',
    inStock: true,
    featured: false,
    imageUrl: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80',
    description: 'Luxury wardrobe storage with warm recessed LED channels, smoked glass door options, velvet-lined jewelry drawers, and heavy-duty coat hangers.',
    estimatedDeliveryDays: 14,
    createdAt: '2025-02-14'
  },
  {
    id: 'prod-6',
    title: 'Carved Geometric Solid Teak Entrance Door',
    category: 'Doors',
    price: 65000,
    woodType: '100% Solid Seasoned Teak Wood',
    dimensions: '42"W x 84"H x 2.25"Thick',
    finishType: 'Exterior Weather-Proof Shield',
    inStock: true,
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    description: 'Hand-carved architectural front door with heavy brass mortise lock prep, insulating core, and rich dark walnut tint that withstands intense sunlight and rain.',
    estimatedDeliveryDays: 12,
    createdAt: '2025-02-18'
  },
  {
    id: 'prod-7',
    title: 'Floating Hardwood Staircase & Baluster Railing',
    category: 'Wood Ramp',
    price: 120000,
    woodType: 'Seasoned Pine & White Oak Treads',
    dimensions: 'Per Flight / Custom Height',
    finishType: 'High-Traction Anti-Slip Lacquer',
    inStock: true,
    featured: false,
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    description: 'Cantilevered architectural floating wooden steps with hidden steel structural mounts and seamless minimalist handrails for contemporary villas.',
    estimatedDeliveryDays: 15,
    createdAt: '2025-02-22'
  },
  {
    id: 'prod-8',
    title: 'Fluted TV Console & Slatted Accent Wall Panel',
    category: 'Furniture',
    price: 52000,
    woodType: 'Solid Ash Wood Slats',
    dimensions: '84"W x 18"D x 24"H',
    finishType: 'Charcoal Matte Deco & Natural Wood',
    inStock: true,
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80',
    description: 'Media storage unit with tambour fluted sliding doors and integrated back wall wood slats that add acoustic warmth and dramatic ambient lighting.',
    estimatedDeliveryDays: 8,
    createdAt: '2025-02-25'
  },
  {
    id: 'prod-9',
    title: 'Heritage Sheesham 6-Seater Dining Suite',
    category: 'Furniture',
    price: 95000,
    woodType: 'Pure Sheesham',
    dimensions: '72"L x 38"W x 30"H',
    finishType: 'Traditional Hand-Rubbed Shellac & Wax',
    inStock: true,
    featured: false,
    imageUrl: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80',
    description: 'Stately dining table complemented by 6 ergonomic cushioned chairs upholstered in stain-resistant textured linen.',
    estimatedDeliveryDays: 10,
    createdAt: '2025-02-28'
  },
  {
    id: 'prod-10',
    title: 'Antique Wood Polish & Deco Restoration Service',
    category: 'Poolish Furniture',
    price: 15000,
    woodType: 'All Wood Types Supported',
    dimensions: 'Per Room / Per Furniture Piece',
    finishType: 'Custom Polish (Gloss, Matte, Walnut, Teak)',
    inStock: true,
    featured: false,
    imageUrl: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80',
    description: 'Comprehensive sanding, crack filling, moisture sealing, and multi-layer polish application on old or dull furniture to restore original factory luster.',
    estimatedDeliveryDays: 3,
    createdAt: '2025-03-01'
  }
];

export const initialProjects: WoodProject[] = [
  {
    id: 'proj-1',
    title: 'Room Makeover Before & After | Custom Woodwork & Slat Wall',
    category: 'Bedroom & Paneling',
    thumbnailUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=700&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=kYJvP4vB5pI',
    description: 'Complete bedroom transition from bare brick walls to fluted wooden accents, integrated floating bed, and concealed wardrobe cabinetry.',
    duration: '4:25',
    completedDate: 'January 2025'
  },
  {
    id: 'proj-2',
    title: 'Creative Wall Design Ideas | Modern Wood Slats & LED Channels',
    category: 'Wall Paneling',
    thumbnailUrl: 'https://images.unsplash.com/photo-160058515526-990dced4db0d?auto=format&fit=crop&w=700&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=F0B9f_5q6k4',
    description: 'Installing acoustic ash wood slatted panels with recessed LED channel strips in an executive living lounge.',
    duration: '3:50',
    completedDate: 'January 2025'
  },
  {
    id: 'proj-3',
    title: 'Flat Renovation Before Work | Full Solid Teak Wood Interior',
    category: 'Full Interior',
    thumbnailUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=700&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=Vp_C1gX9q3w',
    description: 'Comprehensive 3-bedroom apartment renovation featuring modular kitchen, solid doors, and hardwood polished flooring.',
    duration: '6:12',
    completedDate: 'February 2025'
  },
  {
    id: 'proj-4',
    title: 'Complete Room Renovation | From Raw Wood to Hand Polish',
    category: 'Renovation',
    thumbnailUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=700&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=2vU1Zg4F3tY',
    description: 'Documenting the carpentry journey from seasoning raw Sheesham logs to final hand-rubbed wax polish installation.',
    duration: '5:40',
    completedDate: 'February 2025'
  },
  {
    id: 'proj-5',
    title: 'Full House & Hostel Renovation | Bunk Beds & Built-in Wardrobes',
    category: 'Commercial & Residential',
    thumbnailUrl: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=700&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=9jK-NcRmVcw',
    description: 'Durable solid wood bunk beds, heavy-use study tables, and multi-locker wardrobes built for longevity.',
    duration: '7:15',
    completedDate: 'February 2025'
  },
  {
    id: 'proj-6',
    title: 'Modern TV Lounge & Modular Kitchen Makeover',
    category: 'Living Room',
    thumbnailUrl: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=700&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk',
    description: 'Custom entertainment console featuring hidden cable runners, marble backing with wood borders, and open pantry bar.',
    duration: '4:10',
    completedDate: 'March 2025'
  },
  {
    id: 'proj-7',
    title: 'Luxury Wooden Bedroom Interior & Floating Bed Design',
    category: 'Bedroom',
    thumbnailUrl: 'https://images.unsplash.com/photo-1540518614846-7ede433c4b4d?auto=format&fit=crop&w=700&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=7X8II6J-6mU',
    description: 'Custom king-size upholstered bed with matching side tables and dressing table with vanity lighting.',
    duration: '5:02',
    completedDate: 'March 2025'
  },
  {
    id: 'proj-8',
    title: 'Washroom Renovation & Waterproof Vanity Unit',
    category: 'Bath Vanity',
    thumbnailUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=700&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=kYJvP4vB5pI',
    description: 'Marine-grade waterproof wooden sink vanity with anti-fungal polyurethane coating and quartz countertop.',
    duration: '3:30',
    completedDate: 'March 2025'
  },
  {
    id: 'proj-9',
    title: 'Custom TV Units & Modern Kitchen Precision Fitting',
    category: 'Kitchen & TV Units',
    thumbnailUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=700&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=Vp_C1gX9q3w',
    description: 'Precision on-site carpentry with laser-levelled cabinets and German hydraulic hinges.',
    duration: '4:45',
    completedDate: 'March 2025'
  }
];

export const initialReviews: ClientReview[] = [
  {
    id: 'rev-1',
    clientName: 'Ali Ahmad',
    roleOrLocation: 'Islamabad F-7 Villa Owner',
    rating: 5,
    comment: 'I recently had the pleasure of working with Wood Nido, and I couldn\'t be happier with the results! From the initial consultation to the final touches, the team was professional and attentive, ensuring that my vision came to life. The craftsmanship in the wood furniture redesign was exceptional, and it truly transformed my space. I particularly appreciated their commitment to using high-quality materials. Communication was seamless throughout the process, making it a stress-free experience. I highly recommend Wood Nido to anyone looking to elevate their home with beautiful wood furniture.',
    date: '2 weeks ago',
    serviceType: 'Bespoke Furniture & Paneling'
  },
  {
    id: 'rev-2',
    clientName: 'Asif Khan',
    roleOrLocation: 'Bahria Town, Rawalpindi',
    rating: 5,
    comment: 'Working with Wood Nido was a fantastic experience! From the initial consultation to the final installation, the team was professional, friendly, and attentive to my needs. I was amazed by how they transformed my old kitchen into a modern culinary haven with beautiful cabinetry and sleek accessories. They also provided great suggestions for kitchen gadgets that I never knew I needed. If you\'re in search of innovative kitchen design and superior craftsmanship, look no further than Wood Nido.',
    date: '1 month ago',
    serviceType: 'Modular Solid Wood Kitchen'
  },
  {
    id: 'rev-3',
    clientName: 'M. Shahid',
    roleOrLocation: 'G-11 Resident, Islamabad',
    rating: 5,
    comment: 'I recently hired Wood Nido for their home painting & wood polish services, and I couldn\'t be happier with the results! Their team took the time to understand my wall painting ideas for home, helping me choose the perfect color palette that brightened up my space. The attention to detail in their work was impressive, especially with the custom home painting they provided. Look no further than Wood Nido for anyone in need of painting and polish services!',
    date: '3 weeks ago',
    serviceType: 'Wood Polish & Deco Finishing'
  },
  {
    id: 'rev-4',
    clientName: 'Chris John',
    roleOrLocation: 'Diplomatic Enclave, Islamabad',
    rating: 5,
    comment: 'I recently had my wood renovation done by Wood Nido, and I can\'t recommend them enough! The team\'s attention to detail was impressive, and they truly transformed my space. They were professional, punctual, and ensured I was happy throughout the whole process. It\'s like a breath of fresh air to see my home looking so revitalized thanks to Polish Wood. I also appreciated their commitment to using sustainable materials. If you\'re considering a wood renovation, look no further than Wood Nido!',
    date: '2 months ago',
    serviceType: 'Full House Woodwork Renovation'
  }
];

export const initialInquiries: CustomerInquiry[] = [
  {
    id: 'inq-1',
    customerName: 'Zubair Malik',
    phone: '+92 321 5566778',
    email: 'zubair.malik@example.com',
    category: 'Kitchen',
    requirement: 'Need complete solid oak kitchen cabinets for new 1-kanal house in DHA Phase 2 with center island.',
    budget: 'Rs 300k - 500k',
    status: 'In Progress',
    createdAt: '2025-03-03 14:30'
  },
  {
    id: 'inq-2',
    customerName: 'Ayesha Siddiqui',
    phone: '+92 300 8899112',
    email: 'ayesha.s@example.com',
    category: 'Furniture',
    requirement: 'Custom 8-seater dining table in Sheesham with matching armchairs and buffet cabinet.',
    budget: 'Rs 150k - 200k',
    status: 'New',
    createdAt: '2025-03-04 09:15'
  }
];

export const initialGalleryPhotos: GalleryPhoto[] = [
  {
    id: 'gal-1',
    title: 'Modern High Gloss Kitchen Suite',
    category: 'Kitchen',
    url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'gal-2',
    title: 'Floor-to-Ceiling Wardrobes',
    category: 'Cupboards',
    url: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'gal-3',
    title: 'Executive Conference Room Table',
    category: 'Office Table',
    url: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'gal-4',
    title: 'Solid Ash Wood Living Room Ensemble',
    category: 'Furniture',
    url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'gal-5',
    title: 'Geometric Teak Exterior Door',
    category: 'Doors',
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'gal-6',
    title: 'Floating Hardwood Staircase Steps',
    category: 'Wood Ramp',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'gal-7',
    title: 'Natural Sheesham Dining Console',
    category: 'Poolish Wood',
    url: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'gal-8',
    title: 'Lounge Slat Wall & TV Console',
    category: 'Home Paint',
    url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=700&q=80'
  }
];

// Presets for quick selection across all admin image uploaders
export const PRESET_WOOD_IMAGES = [
  { label: 'Ash Wood Accent Chair', url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80', category: 'Furniture' },
  { label: 'Round Pedestal Coffee Table', url: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80', category: 'Furniture' },
  { label: 'Solid Teak Kitchen Island', url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80', category: 'Kitchen' },
  { label: 'Master Bedroom Wardrobe', url: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80', category: 'Cupboards' },
  { label: 'Carved Front Entrance Door', url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80', category: 'Doors' },
  { label: 'Executive Mahogany Desk', url: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80', category: 'Office Table' },
  { label: 'Fluted TV Console & Slats', url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80', category: 'Furniture' },
  { label: 'Sheesham 6-Seater Dining', url: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80', category: 'Furniture' },
  { label: 'Wood Stairs / Ramp', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', category: 'Wood Ramp' },
  { label: 'Polished Wood Grain Finish', url: 'https://images.unsplash.com/photo-1540518614846-7ede433c4b4d?auto=format&fit=crop&w=800&q=80', category: 'Poolish Wood' },
  { label: 'Restored Vintage Polish', url: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80', category: 'Poolish Furniture' },
  { label: 'Modern Architectural Paint & Slat', url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80', category: 'Home Paint' },
  { label: 'Artisan Workshop & Hand Plane', url: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80', category: 'Workshop' },
  { label: 'Master Carpenter at Work', url: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=800&q=80', category: 'Workshop' }
];
