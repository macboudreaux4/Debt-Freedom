/**
 * Debt Freedom Constants
 * Centralized configuration for debts, budget, colors, and themes
 */

// Debt data - customize with your own debts
export const DEBTS0 = [
  {name:"Capital One", start:4126.70,  rate:0.264,  min:40,      payoff:"Jun 2026", color:"#22c55e", paid:true,  is107k:false},
  {name:"SoFi Loan",   start:11452,    rate:0.126,  min:1283.78, payoff:"Sep 2026", color:"#3b82f6", paid:false, is107k:false},
  {name:"Discover 2",  start:10057.5,  rate:0.0,    min:403,     payoff:"Jul 2027", color:"#f59e0b", paid:false, is107k:false, promo:"Jul 2027"},
  {name:"Car Note 2",  start:19983.03, rate:0.0875, min:395.16,  payoff:"Aug 2027", color:"#8b5cf6", paid:false, is107k:false},
  {name:"Car Note 1",  start:13481.84, rate:0.0399, min:419.31,  payoff:"Nov 2027", color:"#ec4899", paid:false, is107k:false},
  {name:"Discover 1",  start:8153.39,  rate:0.0,    min:240,     payoff:"Dec 2027", color:"#06b6d4", paid:false, is107k:false, promo:"Oct 2027"},
  {name:"107k Note",   start:107000,   rate:0.0775, min:691.04,  payoff:"Jun 2031", color:"#f97316", paid:false, is107k:true},
];

// 19-month projection with debt balances
export const MONTHS = [
  {mo:1,  p:"Jun 2026",ph:"IO",    sofi:8575,  d2:9300,  c2:19734,c1:13107,d1:7913, co:true,snow:2917.75,n107:107000,note:"Deploy $30k -- Cap One paid, SoFi to $11,452"},
  {mo:2,  p:"Jul 2026",ph:"IO",    sofi:5668,  d2:8543,  c2:19482,c1:12732,d1:7673, co:true,snow:2917.75,n107:106882,note:""},
  {mo:3,  p:"Aug 2026",ph:"IO",    sofi:2730,  d2:7785,  c2:19229,c1:12355,d1:7433, co:true,snow:2917.75,n107:106189,note:""},
  {mo:4,  p:"Sep 2026",ph:"IO",    sofi:0,     d2:7028,  c2:18736,c1:11976,d1:7193, co:true,snow:4201.53,n107:105492,note:"SoFi PAID OFF -- $1,284/mo freed!"},
  {mo:5,  p:"Oct 2026",ph:"IO",    sofi:0,     d2:6271,  c2:15480,c1:11597,d1:6953, co:true,snow:4201.53,n107:104792,note:""},
  {mo:6,  p:"Nov 2026",ph:"IO",    sofi:0,     d2:5513,  c2:12201,c1:11216,d1:6713, co:true,snow:4201.53,n107:104088,note:"Last IO month -- P&I starts Dec"},
  {mo:7,  p:"Dec 2026",ph:"P&I",   sofi:0,     d2:4756,  c2:10806,c1:10834,d1:6473, co:true,snow:2292.53,n107:103380,note:"107k jumps to $2,600 P&I -- budget tightens"},
  {mo:8,  p:"Jan 2027",ph:"P&I",   sofi:0,     d2:3999,  c2:9401, c1:10451,d1:6233, co:true,snow:2292.53,n107:102661,note:""},
  {mo:9,  p:"Feb 2027",ph:"P&I",   sofi:0,     d2:3241,  c2:7986, c1:10066,d1:5993, co:true,snow:2292.53,n107:101937,note:""},
  {mo:10, p:"Mar 2027",ph:"P&I",   sofi:0,     d2:2484,  c2:6560, c1:9680, d1:5753, co:true,snow:2292.53,n107:101207,note:""},
  {mo:11, p:"Apr 2027",ph:"P&I",   sofi:0,     d2:1727,  c2:5125, c1:9293, d1:5513, co:true,snow:2292.53,n107:100471,note:""},
  {mo:12, p:"May 2027",ph:"P&I",   sofi:0,     d2:969,   c2:3678, c1:8905, d1:5273, co:true,snow:2292.53,n107:99729, note:""},
  {mo:13, p:"Jun 2027",ph:"P&I",   sofi:0,     d2:212,   c2:2221, c1:8515, d1:5033, co:true,snow:2292.53,n107:98981, note:"Discover 2 final month -- confirm paid"},
  {mo:14, p:"Jul 2027",ph:"Sprint",sofi:0,     d2:0,     c2:209,  c1:8124, d1:4793, co:true,snow:2695.53,n107:98227, note:"Discover 2 PAID OFF before promo ends!"},
  {mo:15, p:"Aug 2027",ph:"Sprint",sofi:0,     d2:0,     c2:0,    c1:5886, d1:4553, co:true,snow:3090.69,n107:97467, note:"Car Note 2 PAID OFF"},
  {mo:16, p:"Sep 2027",ph:"Sprint",sofi:0,     d2:0,     c2:0,    c1:3245, d1:4313, co:true,snow:3090.69,n107:96700, note:""},
  {mo:17, p:"Oct 2027",ph:"Sprint",sofi:0,     d2:0,     c2:0,    c1:596,  d1:4073, co:true,snow:3090.69,n107:95927, note:"Discover 1 promo ends -- accelerate!"},
  {mo:18, p:"Nov 2027",ph:"Sprint",sofi:0,     d2:0,     c2:0,    c1:0,    d1:1771, co:true,snow:3510,   n107:95148, note:"Car Note 1 PAID OFF"},
  {mo:19, p:"Dec 2027",ph:"Sprint",sofi:0,     d2:0,     c2:0,    c1:0,    d1:0,    co:true,snow:3750,   n107:94362, note:"CONSUMER DEBT FREE -- 107k note continues"},
];

// Projected debt balance for each month
export const PROJECTED = [200127,194764,189296,183787,178238,172649,167028,161381,155706,150003,144272,138513,132726,126918,121088,115202,109286,103419,101362];

// Default household budget categories
export const HH0 = [
  {cat:"Housing",   items:[{n:"Mortgage/Rent",a:1800},{n:"Property Tax",a:300},{n:"Insurance",a:120},{n:"Maintenance",a:80}]},
  {cat:"Utilities", items:[{n:"Electric",a:150},{n:"Gas",a:60},{n:"Water",a:50},{n:"Internet",a:80},{n:"Cell",a:120},{n:"Streaming",a:50}]},
  {cat:"Food",      items:[{n:"Groceries",a:600},{n:"Dining Out",a:200},{n:"Coffee",a:50}]},
  {cat:"Transport", items:[{n:"Gas/Fuel",a:250},{n:"Car Insurance",a:200},{n:"Parking",a:30}]},
  {cat:"Health",    items:[{n:"Health Ins.",a:200},{n:"Medical",a:50},{n:"Rx",a:20},{n:"Personal",a:80}]},
  {cat:"Other",     items:[{n:"Clothing",a:50},{n:"Gifts",a:30},{n:"Entertainment",a:40},{n:"Misc",a:40}]},
];

// Sinking funds for irregular expenses
export const SINK0 = [
  {name:"Car Registration",    annual:400,  due:"Jan",     p:"R", doNow:true},
  {name:"Holiday Gifts",       annual:500,  due:"Dec",     p:"R", doNow:true},
  {name:"Emergency Car Repair",annual:800,  due:"Varies",  p:"R", doNow:true},
  {name:"Medical/Dental OOP",  annual:600,  due:"Varies",  p:"O", doNow:false},
  {name:"Home Maintenance",    annual:960,  due:"Ongoing", p:"Y", doNow:false},
  {name:"Vehicle Insurance",   annual:2400, due:"Jul",     p:"Y", doNow:false},
  {name:"Vacation/Travel",     annual:1200, due:"Jun",     p:"G", doNow:false},
  {name:"Back to School",      annual:300,  due:"Aug",     p:"G", doNow:false},
];

// Sinking fund color palette (p = priority: R=recurring, O=occasional, Y=yearly, G=goal)
export const PCOL = {R:"#ef4444", O:"#f97316", Y:"#eab308", G:"#22c55e"};

// Dark theme colors
export const DARK = {
  bg:"#0f172a",
  card:"#1e293b",
  text:"#f1f5f9",
  sub:"#94a3b8",
  muted:"#64748b",
  border:"#243040"
};

// Light theme colors
export const LITE = {
  bg:"#f8fafc",
  card:"#ffffff",
  text:"#0f172a",
  sub:"#334155",
  muted:"#64748b",
  border:"#e2e8f0"
};

// App constants
export const STORAGE_KEY = "dfv3";
export const FREEDOM_DATE = "2027-12-31";
export const PROMO_END_DATE = "2027-07-01";
export const TOTAL_MONTHS = 19;
export const DEFAULT_INCOME = 11000;
export const DEFAULT_BUFFER = 1500;
export const P107_IO = 691.04;  // Interest only payment
export const P107_PI = 2600;    // Principal & interest payment
export const P107_PHASE_SWITCH = 6; // Month when 107k switches from IO to P&I
