export const nav=[['Home','home'],['About','about'],['Services','services'],['Products','products'],['Global Sourcing','sourcing'],['Quality','quality'],['How We Work','process'],['Partnership','partnership'],['Contact','contact']];
export const pulps=['NBSK','BSKP','UKP','BHKP','BEKP','DIP','BCTMP'];
export const pulpDescriptions:Record<string,string>={NBSK:'Northern bleached softwood kraft pulp',BSKP:'Bleached softwood kraft pulp',UKP:'Unbleached kraft pulp',BHKP:'Bleached hardwood kraft pulp',BEKP:'Bleached eucalyptus kraft pulp',DIP:'Deinked pulp',BCTMP:'Bleached chemi-thermomechanical pulp'};

// Illustrative category photographs, not stock availability.
export type Photo={src:string;small:string;alt:string};
const photo=(name:string,alt:string):Photo=>({src:`/img/${name}.webp`,small:`/img/${name}-sm.webp`,alt});
export const photos={
  occBales:photo('bales-occ','Stacked bales of compressed corrugated cardboard on pallets'),
  occClose:photo('occ-close','Close-up of a bale of old corrugated containers'),
  baleInspect:photo('bale-inspect','Close-up of wire-tied bales of corrugated cardboard'),
  mixed:photo('bales-mixed','Compressed bales of mixed paper and board'),
  onp:photo('onp','A tall stack of old newspapers'),
  onpBundles:photo('onp-bundles','Bundles of old newspapers tied with wire'),
  oinp:photo('oinp-bundle','A bundle of unsold newspapers tied with string'),
  whitePaper:photo('white-paper','Sheets of white coated paper'),
  boardScrap:photo('board-scrap','Bales of compressed cardboard and paper waste'),
  pulpwood:photo('pulpwood','Stacked pulpwood logs, the raw material for manufacturing pulp'),
  shipSea:photo('ship-sea','Aerial view of a bulk carrier under way at sea'),
  containerShip:photo('container-ship','A fully loaded container ship at sea'),
  crane:photo('port-crane','A gantry crane lifting a shipping container at a port'),
  truck:photo('truck-containers','A container truck leaving a container yard'),
  portTrucks:photo('port-trucks','Container trucks moving through a port terminal'),
  boardMill:photo('board-mill','Workers on a paper and board production line'),
  paperMachine:photo('paper-machine','A paper machine in a paper mill'),
  handshake:photo('handshake-agreement','Two business partners shaking hands over a signed agreement'),
} satisfies Record<string,Photo>;

// Product sheet. Values marked "as agreed" are confirmed per contract; replace with firm figures when available.
export type Grade={name:string;full:string;photo:Photo;text:string;origin:string;bale:string;moisture:string;outthrows:string;prohibited:string;quantity:string;inspection:string;terms:string;pulps?:string[]};
const origins='USA, Canada, UK, Europe, Central America, Middle East and New Zealand, subject to availability';
const base={origin:origins,bale:'Mill-size, wire-tied bales. Bale weight and dimensions declared by the supplier for each lot.',moisture:'Air-dry material; maximum moisture as agreed in the contract.',outthrows:'As agreed in the contract.',prohibited:'Plastics, wet-strength, wax-coated, food-contaminated and hazardous materials excluded; limit as agreed.',quantity:'Regular monthly quantities. Current availability confirmed on enquiry.',inspection:'Third-party pre-shipment inspection available on request.',terms:'FOB / CFR / CIF Chennai and other Indian ports.'};
export const grades:Grade[]=[
  {...base,name:'OCC 11',full:'Old Corrugated Containers',photo:photos.occBales,text:'Used corrugated boxes. Recovered fibre for kraft, liner and fluting.',outthrows:'Max 5% (ISRI #11 guideline) or as agreed.',prohibited:'Max 1% (ISRI #11 guideline) or as agreed.'},
  {...base,name:'OCC 12 / DS OCC',full:'Double Sorted Old Corrugated Containers',photo:photos.baleInspect,text:'Double-sorted corrugated material with lower contamination for demanding furnish.',outthrows:'Max 2% (ISRI #12 guideline) or as agreed.',prohibited:'Max 0.5% (ISRI #12 guideline) or as agreed.'},
  {...base,name:'NDLKC',full:'New Double-Lined Kraft Corrugated Cuttings',photo:photos.occClose,text:'Clean, unprinted kraft corrugated cuttings from box plants.'},
  {...base,name:'NDLKC PS #13',full:'New Double-Lined Kraft Cuttings, ISRI #13',photo:photos.occClose,text:'Kraft corrugated cuttings to the #13 grade description, subject to specification review.'},
  {...base,name:'DLK',full:'Double-Lined Kraft',photo:photos.occClose,text:'Double-lined kraft cuttings for kraft paper and board mills.'},
  {...base,name:'ONP',full:'Old Newspaper',photo:photos.onpBundles,text:'Sorted old newspapers for newsprint and deinking furnish.'},
  {...base,name:'OINP',full:'Over-Issue Newspaper',photo:photos.oinp,text:'Unsold, clean newsprint suited to newsprint and deinking furnish.'},
  {...base,name:'CBS',full:'Coated Book Stock',photo:photos.whitePaper,text:'Coated printed paper for writing, printing and deinking mills.'},
  {...base,name:'BBC',full:'Board Cuttings',photo:photos.boardScrap,text:'Clean converting cuttings, specification confirmed with the origin supplier.'},
  {...base,name:'Hard Mix Waste',full:'Hard Mixed Paper',photo:photos.mixed,text:'Mixed recovered paper with a higher board content for duplex and board mills.'},
  {...base,name:'Soft Mix Waste',full:'Soft Mixed Paper',photo:photos.mixed,text:'Mixed paper sourcing matched to mill specifications and available origin.'},
  {...base,name:'Manufacturing Pulp',full:'Virgin and recycled pulp',photo:photos.pulpwood,text:'Market pulp for paper and board manufacturing.',bale:'Unitised, wire-tied pulp bales.',moisture:'Air-dry (ADMT) basis as per the mill contract.',outthrows:'Not applicable. Brightness, strength and dirt specification as agreed.',prohibited:'As per the mill specification.',pulps},
];

export const serviceItems=[
  {id:'verification',letter:'A',title:'Product Verification',text:'Specifications, bale photographs and material videos are reviewed against the buyer’s agreed quality requirements before any commitment.',points:['Grade and specification check','Bale photographs and videos','Moisture, outthrows and prohibitives review'],photo:photos.baleInspect},
  {id:'logistics',letter:'B',title:'Container & Truck Logistics',text:'Container loading at origin and truck movements at destination, coordinated so the material moves without delays.',points:['Container loading coordination','Loading photographs','Truck booking at the Indian port'],photo:photos.truck},
  {id:'dispatch',letter:'C',title:'Port-to-Paper-Mill Dispatch',text:'Once cleared, containers are dispatched from the port by container truck direct to the paper mill.',points:['Port','Container truck','Paper mill'],photo:photos.portTrucks,flow:true},
  {id:'customs',letter:'D',title:'Customs & CHA Coordination',text:'Import clearance is handled through our authorised Customs House Agent (CHA) partner, with bill of entry filing on ICEGATE.',points:['Bill of entry filing through the CHA','Duty and examination coordination','Document checks before arrival']},
  {id:'inspection',letter:'E',title:'Third-Party Inspection',text:'Pre-Shipment Product Inspection & Verification by an independent agency, according to the agreed product specifications.',points:['Inspection before container loading','Photographic inspection report','Report shared with the buyer']},
];

// Only registrations and connections Vee Nexus holds. Add the number (id) or profile link (url) to display it.
export const credentials:{name:string;detail:string;id?:string;url?:string;kind:'registration'|'tie-up'|'platform'}[]=[
  {name:'MSME / Udyam Registration',detail:'Registered micro, small and medium enterprise, Government of India.',id:'',kind:'registration'},
  {name:'Import Export Code (IEC)',detail:'Importer-exporter registration issued by the DGFT.',id:'',kind:'registration'},
  {name:'Product Verification & Testing Agency',detail:'Tie-up with an independent agency for product testing and verification.',kind:'tie-up'},
  {name:'Authorised CHA Partner',detail:'Customs clearance through an authorised Customs House Agent.',kind:'tie-up'},
  {name:'IndiaMART',detail:'Listed on India’s B2B marketplace.',url:'',kind:'platform'},
  {name:'Alibaba',detail:'Listed on the international B2B marketplace.',url:'',kind:'platform'},
];

// Paste the full profile URLs here. Links with an empty url are not shown.
export const profiles:{name:'IndiaMART'|'Alibaba'|'Facebook'|'Instagram'|'LinkedIn';url:string}[]=[
  {name:'IndiaMART',url:''},
  {name:'Alibaba',url:''},
  {name:'Facebook',url:''},
  {name:'Instagram',url:''},
  {name:'LinkedIn',url:''},
];

export const industries:{name:string;text:string;grades:string[]}[]=[
  {name:'Kraft & liner board mills',text:'Strong brown fibre for kraft paper, liner and fluting.',grades:['OCC 11','DS OCC','NDLKC','DLK','UKP']},
  {name:'Duplex & boxboard mills',text:'Mixed and board grades for multi-layer packaging board.',grades:['Hard Mix','Soft Mix','BBC','OCC 11']},
  {name:'Newsprint mills',text:'Deinkable news grades for newsprint and light printing paper.',grades:['ONP','OINP','DIP']},
  {name:'Writing, printing & tissue mills',text:'Bright, clean fibre for white grades and tissue.',grades:['CBS','BHKP','BEKP','NBSK','BCTMP']},
];
