export const nav=[['Home','home'],['About','about'],['Services','services'],['Products','products'],['Global Sourcing','sourcing'],['How We Work','process'],['Partnership','partnership'],['Contact','contact']];
export const grades=['OCC 11','OCC 12 / DS OCC','NDLKC','NDLKC PS #13','DLK','ONP','OINP','CBS','BBC','Hard Mix Waste','Soft Mix Waste'];
export const pulps=['NBSK','BSKP','UKP','BHKP','BEKP','DIP','BCTMP'];
export const descriptions:Record<string,string>={'OCC 11':'Old corrugated containers. Recovered fibre for the next generation of paper and packaging.','OCC 12 / DS OCC':'Double-sorted corrugated material. Sourcing aligned with mill-specific requirements.','NDLKC':'New double-lined kraft corrugated cuttings. Enquire with your specification and origin.','NDLKC PS #13':'Kraft corrugated cuttings, subject to specification review and quality coordination.','DLK':'Double-lined kraft cuttings for suitable paper-mill requirements.','ONP':'Old newspapers. Recovered paper sourcing based on required composition and quality.','OINP':'Over-issue newspapers. Unsold, clean newsprint suited to newsprint and deinking furnish.','CBS':'Coated book stock. Coated printed paper for writing, printing and deinking mills.','BBC':'Board cuttings. Clean converting cuttings, specification confirmed with the origin supplier.','Hard Mix Waste':'Mixed recovered paper. Composition and suitability reviewed with the receiving mill.','Soft Mix Waste':'Mixed paper sourcing matched to mill specifications and available origin.'};
export const pulpDescriptions:Record<string,string>={NBSK:'Northern bleached softwood kraft pulp',BSKP:'Bleached softwood kraft pulp',UKP:'Unbleached kraft pulp',BHKP:'Bleached hardwood kraft pulp',BEKP:'Bleached eucalyptus kraft pulp',DIP:'Deinked pulp',BCTMP:'Bleached chemi-thermomechanical pulp'};

// Illustrative category photographs, not stock availability.
export type Photo={src:string;small:string;alt:string};
export const photos={
  occBales:{src:'/img/bales-occ.webp',small:'/img/bales-occ-sm.webp',alt:'Stacked bales of compressed corrugated cardboard on pallets'},
  occClose:{src:'/img/occ-close.webp',small:'/img/occ-close-sm.webp',alt:'Close-up of a bale of old corrugated containers'},
  mixed:{src:'/img/bales-mixed.webp',small:'/img/bales-mixed-sm.webp',alt:'Compressed bales of mixed paper and board'},
  onp:{src:'/img/onp.webp',small:'/img/onp-sm.webp',alt:'A tall stack of old newspapers'},
  shipSea:{src:'/img/ship-sea.webp',small:'/img/ship-sea-sm.webp',alt:'Aerial view of a bulk carrier under way at sea'},
  containerShip:{src:'/img/container-ship.webp',small:'/img/container-ship-sm.webp',alt:'A fully loaded container ship at sea'},
  crane:{src:'/img/port-crane.webp',small:'/img/port-crane-sm.webp',alt:'A gantry crane lifting a shipping container at a port'},
} satisfies Record<string,Photo>;
export function gradePhoto(grade:string):Photo{
  if(grade==='OCC 11')return photos.occBales;
  if(['ONP','OINP'].includes(grade))return photos.onp;
  if(['CBS','BBC','Hard Mix Waste','Soft Mix Waste'].includes(grade))return photos.mixed;
  return photos.occClose;
}

// End-to-end scope. Edit or remove any line that Vee Nexus does not offer.
export const serviceGroups:{id:string;label:string;intro:string;photo:Photo;items:[string,string][]}[]=[
  {id:'trade',label:'Trading & indenting',intro:'Buying on behalf of Indian paper mills, from first enquiry to signed contract.',photo:photos.occBales,items:[
    ['Waste paper indenting','We act as indenting agent between overseas suppliers and Indian mills: offers, negotiation and contract follow-through.'],
    ['Global product sourcing','Recovered paper grades from balers, collectors and exporters across the USA, Canada, UK, Europe, the Middle East, Central America and New Zealand.'],
    ['Pulp sourcing','Softwood, hardwood, unbleached, deinked and BCTMP pulp matched to each mill’s furnish.'],
    ['Customised procurement','Grade, quantity, packing and delivery timelines planned around each mill’s production schedule.'],
  ]},
  {id:'quality',label:'Quality & documentation',intro:'The checks and paperwork that help a shipment clear customs and run well on the machine.',photo:photos.occClose,items:[
    ['Quality assurance','Specifications reviewed for moisture, outthrows, prohibitives and contamination before any deal is closed.'],
    ['Pre-shipment inspection','Loading supervision, bale and container photographs, and pre-shipment inspection certificates where required.'],
    ['Documentation support','Commercial invoice, packing list, bill of lading, certificate of origin and inspection papers checked for clean clearance.'],
    ['Supply-chain transparency','Visibility of sourcing, handling, loading and transit so both sides know where the cargo stands.'],
  ]},
  {id:'logistics',label:'Shipping & logistics',intro:'Moving the material from the loading port to the mill gate.',photo:photos.containerShip,items:[
    ['Ocean freight coordination','Container booking, carrier selection, routing and scheduling for 20′ and 40′ HC loads.'],
    ['Bulk & break-bulk cargo','Coordination for larger parcels moving by bulk carrier.'],
    ['Marine cargo insurance','Transit cover arranged for CIF shipments and advised for FOB and CFR buyers.'],
    ['Tracking & port coordination','Vessel tracking, ETA updates, and coordination with clearing agents at Chennai, Tuticorin and other Indian ports.'],
  ]},
  {id:'marine',label:'Marine services',intro:'Vessel-side services for owners and charterers working the same trade lanes.',photo:photos.shipSea,items:[
    ['Ship technical management','Maintenance planning, class and flag compliance and technical oversight across the vessel’s life.'],
    ['Crew management','Recruitment, deployment and welfare of qualified seafarers.'],
    ['Commercial management & chartering','Voyage and time-charter fixing, voyage estimates and post-fixture operations.'],
    ['Vessel accounting & insurance','Vessel-level accounts, budgeting, and hull and P&I insurance placement.'],
    ['Emissions compliance','Support with EEXI, CII and EU ETS reporting requirements.'],
    ['Green ship recycling','End-of-life vessel sales to certified, responsible recycling yards.'],
  ]},
  {id:'support',label:'Support & sustainability',intro:'How we look after partners before, during and after every shipment.',photo:photos.crane,items:[
    ['Dedicated support','One point of contact from the first enquiry to arrival at the mill and beyond.'],
    ['Transparent commercial terms','FOB, CFR and CIF pricing with payment terms agreed openly.'],
    ['Environmental commitment','Recovered fibre replaces virgin material and keeps paper out of landfill.'],
    ['Continuous improvement','Feedback from every shipment shapes the next one.'],
  ]},
];

export const industries:{name:string;text:string;grades:string[]}[]=[
  {name:'Kraft & liner board mills',text:'Strong brown fibre for kraft paper, liner and fluting.',grades:['OCC 11','DS OCC','NDLKC','DLK','UKP']},
  {name:'Duplex & boxboard mills',text:'Mixed and board grades for multi-layer packaging board.',grades:['Hard Mix','Soft Mix','BBC','OCC 11']},
  {name:'Newsprint mills',text:'Deinkable news grades for newsprint and light printing paper.',grades:['ONP','OINP','DIP']},
  {name:'Writing, printing & tissue mills',text:'Bright, clean fibre for white grades and tissue.',grades:['CBS','BHKP','BEKP','NBSK','BCTMP']},
];
