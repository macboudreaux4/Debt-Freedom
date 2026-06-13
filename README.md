# <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover"/>
  <meta name="apple-mobile-web-app-capable" content="yes"/>
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
  <meta name="apple-mobile-web-app-title" content="Debt Freedom"/>
  <meta name="theme-color" content="#0f172a"/>
  <title>Debt Freedom</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
    body { background: #000; overscroll-behavior: none; }
    input, select, textarea, button { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
    input[type=range] { -webkit-appearance: none; height: 4px; background: #334155; border-radius: 2px; outline: none; }
    input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 20px; height: 20px; border-radius: 50%; background: #22c55e; cursor: pointer; }
    ::-webkit-scrollbar { display: none; }
    * { scrollbar-width: none; }
  </style>
</head>
<body>
  <div id="root"></div>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.23.2/babel.min.js"></script>
  <script type="text/babel">
    const { useState, useEffect } = React;


const STORAGE_KEY = "dfv3";
const saveData = (d) => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(d)); } catch(e){} };
const loadData = () => { try { const d = localStorage.getItem(STORAGE_KEY); return d ? JSON.parse(d) : null; } catch(e){ return null; } };
const fmt = (n) => "$" + Math.abs(n||0).toLocaleString("en-US", {maximumFractionDigits:0});
const fmtD = (n) => "$" + Math.abs(n||0).toLocaleString("en-US", {minimumFractionDigits:2, maximumFractionDigits:2});
const pct = (a,b) => b===0 ? 0 : Math.round((a/b)*100);
const daysTo = (d) => Math.max(0, Math.round((new Date(d)-new Date())/86400000));

const DEBTS0 = [
  {name:"Capital One", start:4126.70,  rate:0.264,  min:40,      payoff:"Jun 2026", color:"#22c55e", paid:true,  is107k:false},
  {name:"SoFi Loan",   start:11452,    rate:0.126,  min:1283.78, payoff:"Sep 2026", color:"#3b82f6", paid:false, is107k:false},
  {name:"Discover 2",  start:10057.5,  rate:0.0,    min:403,     payoff:"Jul 2027", color:"#f59e0b", paid:false, is107k:false, promo:"Jul 2027"},
  {name:"Car Note 2",  start:19983.03, rate:0.0875, min:395.16,  payoff:"Aug 2027", color:"#8b5cf6", paid:false, is107k:false},
  {name:"Car Note 1",  start:13481.84, rate:0.0399, min:419.31,  payoff:"Nov 2027", color:"#ec4899", paid:false, is107k:false},
  {name:"Discover 1",  start:8153.39,  rate:0.0,    min:240,     payoff:"Dec 2027", color:"#06b6d4", paid:false, is107k:false, promo:"Oct 2027"},
  {name:"107k Note",   start:107000,   rate:0.0775, min:691.04,  payoff:"Jun 2031", color:"#f97316", paid:false, is107k:true},
];

const MONTHS = [
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

const PROJECTED = [200127,194764,189296,183787,178238,172649,167028,161381,155706,150003,144272,138513,132726,126918,121088,115202,109286,103419,101362];

const HH0 = [
  {cat:"Housing",   items:[{n:"Mortgage/Rent",a:1800},{n:"Property Tax",a:300},{n:"Insurance",a:120},{n:"Maintenance",a:80}]},
  {cat:"Utilities", items:[{n:"Electric",a:150},{n:"Gas",a:60},{n:"Water",a:50},{n:"Internet",a:80},{n:"Cell",a:120},{n:"Streaming",a:50}]},
  {cat:"Food",      items:[{n:"Groceries",a:600},{n:"Dining Out",a:200},{n:"Coffee",a:50}]},
  {cat:"Transport", items:[{n:"Gas/Fuel",a:250},{n:"Car Insurance",a:200},{n:"Parking",a:30}]},
  {cat:"Health",    items:[{n:"Health Ins.",a:200},{n:"Medical",a:50},{n:"Rx",a:20},{n:"Personal",a:80}]},
  {cat:"Other",     items:[{n:"Clothing",a:50},{n:"Gifts",a:30},{n:"Entertainment",a:40},{n:"Misc",a:40}]},
];

const SINK0 = [
  {name:"Car Registration",    annual:400,  due:"Jan",     p:"R", doNow:true},
  {name:"Holiday Gifts",       annual:500,  due:"Dec",     p:"R", doNow:true},
  {name:"Emergency Car Repair",annual:800,  due:"Varies",  p:"R", doNow:true},
  {name:"Medical/Dental OOP",  annual:600,  due:"Varies",  p:"O", doNow:false},
  {name:"Home Maintenance",    annual:960,  due:"Ongoing", p:"Y", doNow:false},
  {name:"Vehicle Insurance",   annual:2400, due:"Jul",     p:"Y", doNow:false},
  {name:"Vacation/Travel",     annual:1200, due:"Jun",     p:"G", doNow:false},
  {name:"Back to School",      annual:300,  due:"Aug",     p:"G", doNow:false},
];

const PCOL = {R:"#ef4444", O:"#f97316", Y:"#eab308", G:"#22c55e"};
const DARK = {bg:"#0f172a",card:"#1e293b",text:"#f1f5f9",sub:"#94a3b8",muted:"#64748b",border:"#243040"};
const LITE = {bg:"#f8fafc",card:"#ffffff",text:"#0f172a",sub:"#334155",muted:"#64748b",border:"#e2e8f0"};

function Confetti({on}) {
  if (!on) return null;
  const cols = ["#22c55e","#3b82f6","#f59e0b","#ec4899","#8b5cf6"];
  return (
    <div style={{position:"fixed",top:0,left:0,right:0,bottom:0,pointerEvents:"none",zIndex:9999,overflow:"hidden"}}>
      {Array.from({length:36}).map((_,i) => (
        <div key={i} style={{
          position:"absolute", left:(i*7%97)+"%", top:"-5%",
          width:7, height:7, borderRadius: i%2===0 ? "50%" : 1,
          background:cols[i%cols.length],
          animation:"drop "+(1.2+i%3*0.6)+"s ease-in "+(i%5*0.15)+"s both"
        }}/>
      ))}
      <style>{"@keyframes drop{to{top:105%;opacity:0;transform:rotate(540deg)}}"}</style>
    </div>
  );
}

function App() {
  const stored = loadData();
  const [tab, setTab] = useState("dash");
  const [dark, setDark] = useState(stored?.dark ?? true);
  const [mo, setMo] = useState(stored?.mo ?? 1);
  const [debts, setDebts] = useState(stored?.debts ?? DEBTS0);
  const [actBal, setActBal] = useState(stored?.actBal ?? {});
  const [income, setIncome] = useState(stored?.income ?? 11000);
  const [hh, setHh] = useState(stored?.hh ?? HH0);
  const [sink, setSink] = useState(stored?.sink ?? SINK0);
  const [checkins, setCheckins] = useState(stored?.checkins ?? {});
  const [buffer, setBuffer] = useState(stored?.buffer ?? 1500);
  const [confetti, setConfetti] = useState(false);
  const [resetConfirm, setResetConfirm] = useState(false);
  const [shareMsg, setShareMsg] = useState(false);

  useEffect(() => {
    saveData({dark,mo,debts,actBal,income,hh,sink,checkins,buffer});
  }, [dark,mo,debts,actBal,income,hh,sink,checkins,buffer]);

  const C = dark ? DARK : LITE;
  const celebrate = () => { setConfetti(true); setTimeout(()=>setConfetti(false),3000); };
  const markPaid = (i) => { setDebts(debts.map((d,idx)=>idx===i?{...d,paid:true}:d)); celebrate(); };

  const totalHH = hh.reduce((s,c)=>s+c.items.reduce((ss,it)=>ss+it.a,0),0);
  const p107 = mo <= 6 ? 691.04 : 2600;
  const minOther = debts.filter(d=>!d.paid&&!d.is107k).reduce((s,d)=>s+d.min,0);
  const snowball = income - totalHH - p107 - minOther;
  const freedomDays = daysTo("2027-12-31");
  const promoDays = daysTo("2027-07-01");
  const totalConsumer = debts.filter(d=>!d.paid&&!d.is107k).reduce((s,d)=>s+d.start,0);
  const total107 = debts.filter(d=>!d.paid&&d.is107k).reduce((s,d)=>s+d.start,0);

  const doShare = () => {
    const paid = debts.filter(d=>d.paid).length;
    const txt = "Debt Freedom Update -- Month "+mo+" of 19\nPaid off: "+paid+" of "+debts.length+" debts\nRemaining: "+fmt(totalConsumer+total107)+"\nDays left: "+freedomDays+"\n#DebtFree";
    navigator.clipboard?.writeText(txt).catch(()=>{});
    setShareMsg(true); setTimeout(()=>setShareMsg(false),2500);
  };

  const doReset = () => {
    try { localStorage.removeItem(STORAGE_KEY); } catch(e){}
    setDark(true); setMo(1); setDebts(DEBTS0); setActBal({}); setIncome(11000);
    setHh(HH0); setSink(SINK0); setCheckins({}); setBuffer(1500); setResetConfirm(false);
  };

  const TABS = [
    {id:"dash",    icon:"[=]",  label:"Overview"},
    {id:"track",   icon:"[#]",  label:"Tracker"},
    {id:"budget",  icon:"[$]",  label:"Budget"},
    {id:"checkin", icon:"[v]",  label:"Check-In"},
    {id:"freedom", icon:"[*]",  label:"Freedom"},
  ];

  return (
    <div style={{display:"flex",justifyContent:"center",minHeight:"100vh",background:"#000",fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"}}>
      <div style={{width:"100%",maxWidth:430,minHeight:"100vh",background:C.bg,display:"flex",flexDirection:"column",position:"relative"}}>
        <Confetti on={confetti}/>

        {shareMsg && (
          <div style={{position:"fixed",top:55,left:"50%",transform:"translateX(-50%)",background:"#22c55e",color:"#0f172a",padding:"8px 20px",borderRadius:20,fontWeight:700,fontSize:13,zIndex:500,whiteSpace:"nowrap"}}>
            Copied to clipboard!
          </div>
        )}

        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 16px 8px",background:C.card,borderBottom:"1px solid "+C.border}}>
          <span style={{fontSize:13,fontWeight:700,color:C.text}}>9:41</span>
          <div style={{display:"flex",gap:6,alignItems:"center"}}>
            <span style={{fontSize:10,fontWeight:700,color:"#fff",background:"#22c55e",padding:"2px 8px",borderRadius:10,letterSpacing:1}}>DEBT FREEDOM</span>
            {promoDays < 180 && <span style={{fontSize:10,fontWeight:700,color:"#fff",background:"#ef4444",padding:"2px 6px",borderRadius:10}}>{promoDays}d</span>}
          </div>
          <div style={{display:"flex",gap:10}}>
            <button onClick={doShare} style={{background:"none",border:"none",fontSize:16,cursor:"pointer",color:C.sub}}>share</button>
            <button onClick={()=>setDark(!dark)} style={{background:"none",border:"none",fontSize:16,cursor:"pointer",color:C.sub}}>{dark?"light":"dark"}</button>
          </div>
        </div>

        <div style={{flex:1,overflowY:"auto",paddingBottom:72}}>
          {tab==="dash"    && <DashTab C={C} mo={mo} setMo={setMo} debts={debts} markPaid={markPaid} actBal={actBal} setActBal={setActBal} buffer={buffer} setBuffer={setBuffer} checkins={checkins} snowball={snowball} freedomDays={freedomDays} promoDays={promoDays} totalConsumer={totalConsumer} total107={total107} income={income}/>}
          {tab==="track"   && <TrackTab C={C} mo={mo} setMo={setMo}/>}
          {tab==="budget"  && <BudgetTab C={C} income={income} setIncome={setIncome} hh={hh} setHh={setHh} sink={sink} setSink={setSink} totalHH={totalHH} p107={p107} minOther={minOther} snowball={snowball} mo={mo}/>}
          {tab==="checkin" && <CheckinTab C={C} mo={mo} setMo={setMo} checkins={checkins} setCheckins={setCheckins} income={income} totalHH={totalHH} p107={p107} buffer={buffer} setBuffer={setBuffer} debts={debts} celebrate={celebrate}/>}
          {tab==="freedom" && <FreedomTab C={C} debts={debts} snowball={snowball} promoDays={promoDays} freedomDays={freedomDays} mo={mo} resetConfirm={resetConfirm} setResetConfirm={setResetConfirm} doReset={doReset}/>}
        </div>

        <div style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,background:C.card,borderTop:"1px solid "+C.border,display:"flex",padding:"8px 0 18px",zIndex:100}}>
          {TABS.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{flex:1,background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:2,padding:"4px 0"}}>
              <span style={{fontSize:11,color:tab===t.id?"#22c55e":C.muted}}>{t.icon}</span>
              <span style={{fontSize:10,fontWeight:tab===t.id?700:400,color:tab===t.id?"#22c55e":C.muted}}>{t.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Card({C, children, style={}}) {
  return <div style={{margin:"8px 16px",background:C.card,borderRadius:16,padding:16,border:"1px solid "+C.border,...style}}>{children}</div>;
}
function SectionTitle({C, children}) {
  return <div style={{fontSize:11,fontWeight:700,letterSpacing:2,color:C.muted,padding:"16px 20px 8px"}}>{children}</div>;
}
function Row({children, style={}}) {
  return <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",...style}}>{children}</div>;
}
function MiniStat({C, label, value, color}) {
  return (
    <div style={{flex:1,background:C.card,borderRadius:14,padding:"10px 6px",textAlign:"center"}}>
      <div style={{fontSize:18,fontWeight:800,color:color||C.text,lineHeight:1}}>{value}</div>
      <div style={{fontSize:9,color:C.muted,marginTop:3,lineHeight:1.2}}>{label}</div>
    </div>
  );
}

function DashTab({C, mo, setMo, debts, markPaid, actBal, setActBal, buffer, setBuffer, checkins, snowball, freedomDays, promoDays, totalConsumer, total107, income}) {
  const [showBal, setShowBal] = useState(false);
  const [balIn, setBalIn] = useState("");
  const [showBuf, setShowBuf] = useState(false);
  const [bufIn, setBufIn] = useState(String(buffer));
  useEffect(()=>{ if(!showBuf) setBufIn(String(buffer)); },[buffer, showBuf]);
  const m = MONTHS[mo-1];
  const proj = PROJECTED[mo-1];
  const actual = actBal[mo];
  const ci = checkins[mo];

  return (
    <div style={{paddingBottom:8}}>
      <div style={{background:C.card,padding:"20px 20px 16px",borderBottom:"1px solid "+C.border}}>
        <div style={{fontSize:11,fontWeight:700,color:"#22c55e",letterSpacing:3,marginBottom:4}}>CONSUMER DEBT FREE IN</div>
        <div style={{fontSize:60,fontWeight:900,color:C.text,lineHeight:1,letterSpacing:-2}}>{freedomDays}</div>
        <div style={{fontSize:13,color:C.muted,marginBottom:16}}>days - December 2027</div>

        <div style={{height:6,background:C.bg,borderRadius:3,marginBottom:6,position:"relative"}}>
          <div style={{height:"100%",width:((mo/19)*100)+"%",background:"linear-gradient(90deg,#22c55e,#16a34a)",borderRadius:3,transition:"width 0.4s"}}/>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:C.muted,marginBottom:14}}>
          <span>Jun 2026</span><span style={{fontWeight:700,color:C.sub}}>Month {mo} of 19</span><span>Dec 2027</span>
        </div>

        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:16}}>
          <button onClick={()=>setMo(Math.max(1,mo-1))} style={{background:C.bg,border:"1px solid "+C.border,color:C.text,width:38,height:38,borderRadius:19,cursor:"pointer",fontSize:20,display:"flex",alignItems:"center",justifyContent:"center"}}>{"<"}</button>
          <span style={{fontSize:17,fontWeight:700,color:C.text,minWidth:90,textAlign:"center"}}>{m.p}</span>
          <button onClick={()=>setMo(Math.min(19,mo+1))} style={{background:C.bg,border:"1px solid "+C.border,color:C.text,width:38,height:38,borderRadius:19,cursor:"pointer",fontSize:20,display:"flex",alignItems:"center",justifyContent:"center"}}>{">"}</button>
        </div>
      </div>

      <div style={{display:"flex",gap:8,padding:"12px 16px 4px"}}>
        <MiniStat C={C} label="Consumer Debt" value={fmt(totalConsumer)} color="#3b82f6"/>
        <MiniStat C={C} label="107k Note" value={fmt(total107)} color="#f97316"/>
        <MiniStat C={C} label="Snowball" value={fmt(Math.max(0,snowball))} color="#22c55e"/>
      </div>

      {promoDays < 180 && (
        <div style={{margin:"4px 16px",background:C.card,borderRadius:12,padding:"10px 14px",borderLeft:"3px solid #ef4444"}}>
          <span style={{fontSize:13,color:C.sub}}>ALERT: Discover 2 promo ends in <strong style={{color:"#ef4444"}}>{promoDays} days</strong> -- keep paying $403/mo or face 27% interest!</span>
        </div>
      )}

      {m.note !== "" && (
        <div style={{margin:"4px 16px",background:C.card,borderRadius:12,padding:"10px 14px",borderLeft:"3px solid #22c55e"}}>
          <span style={{fontSize:13,color:C.sub}}>{m.note}</span>
        </div>
      )}

      <Card C={C}>
        <Row style={{marginBottom:12}}>
          <span style={{fontSize:14,fontWeight:700,color:C.text}}>Actual Balance</span>
          <button onClick={()=>setShowBal(!showBal)} style={{background:"none",border:"1px solid #22c55e",color:"#22c55e",fontSize:12,padding:"4px 12px",borderRadius:16,cursor:"pointer"}}>{showBal?"Cancel":"Update"}</button>
        </Row>
        {showBal ? (
          <div style={{display:"flex",gap:8}}>
            <span style={{color:C.muted,fontSize:18,fontWeight:700,alignSelf:"center"}}>$</span>
            <input style={{flex:1,background:C.bg,border:"1px solid "+C.border,color:C.text,fontSize:16,padding:"8px 10px",borderRadius:10,outline:"none"}} type="number" placeholder="Total all debts" value={balIn} onChange={e=>setBalIn(e.target.value)}/>
            <button onClick={()=>{setActBal({...actBal,[mo]:parseFloat(balIn)});setShowBal(false);setBalIn("");}} style={{background:"#22c55e",border:"none",color:"#0f172a",fontWeight:700,padding:"8px 14px",borderRadius:10,cursor:"pointer"}}>Save</button>
          </div>
        ) : (
          <div style={{display:"flex",alignItems:"center"}}>
            {[["Projected",fmt(proj),"#3b82f6"],[" "," "," "],[actual?"Actual":"Actual",actual?fmt(actual):"--",actual?(actual<=proj?"#22c55e":"#ef4444"):C.muted],["Status",actual?(actual<=proj?"OK":"High"):"--",actual?(actual<=proj?"#22c55e":"#ef4444"):C.muted]].map(([label,val,color],i)=>(
              i===1 ? <div key={i} style={{width:1,height:32,background:C.border,margin:"0 8px"}}/> :
              <div key={i} style={{flex:1,textAlign:"center"}}>
                <div style={{fontSize:10,color:C.muted,marginBottom:3}}>{label}</div>
                <div style={{fontSize:16,fontWeight:800,color:color}}>{val}</div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card C={C}>
        <Row style={{marginBottom:12}}>
          <span style={{fontSize:14,fontWeight:700,color:C.text}}>Emergency Buffer</span>
          <button onClick={()=>setShowBuf(!showBuf)} style={{background:"none",border:"1px solid #22c55e",color:"#22c55e",fontSize:12,padding:"4px 12px",borderRadius:16,cursor:"pointer"}}>{showBuf?"Cancel":"Edit"}</button>
        </Row>
        {showBuf ? (
          <div style={{display:"flex",gap:8}}>
            <span style={{color:C.muted,fontSize:18,fontWeight:700,alignSelf:"center"}}>$</span>
            <input style={{flex:1,background:C.bg,border:"1px solid "+C.border,color:C.text,fontSize:16,padding:"8px 10px",borderRadius:10,outline:"none"}} type="number" value={bufIn} onChange={e=>setBufIn(e.target.value)}/>
            <button onClick={()=>{setBuffer(parseFloat(bufIn)||0);setShowBuf(false);}} style={{background:"#22c55e",border:"none",color:"#0f172a",fontWeight:700,padding:"8px 14px",borderRadius:10,cursor:"pointer"}}>Save</button>
          </div>
        ) : (
          <div style={{display:"flex",alignItems:"center"}}>
            {[["Current",fmt(buffer),buffer>=1000?"#22c55e":"#ef4444"],["","",""],["Target","$1,500",C.sub],["","",""],["Status",buffer>=1500?"Good":buffer>=1000?"Low":"CRITICAL",buffer>=1500?"#22c55e":buffer>=1000?"#f59e0b":"#ef4444"]].map(([l,v,c],i)=>(
              i===1||i===3 ? <div key={i} style={{width:1,height:32,background:C.border,margin:"0 4px"}}/> :
              <div key={i} style={{flex:1,textAlign:"center"}}>
                <div style={{fontSize:10,color:C.muted,marginBottom:3}}>{l}</div>
                <div style={{fontSize:16,fontWeight:800,color:c}}>{v}</div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {ci && (
        <Card C={C} style={{borderColor:"#22c55e",borderWidth:2}}>
          <div style={{fontSize:13,fontWeight:700,color:C.text,marginBottom:8}}>Month {mo} Check-In Logged</div>
          <div style={{display:"flex",gap:12}}>
            <div style={{flex:1,textAlign:"center"}}><div style={{fontSize:10,color:C.muted}}>Income</div><div style={{fontSize:15,fontWeight:700,color:"#22c55e"}}>{fmt(ci.income||0)}</div></div>
            <div style={{flex:1,textAlign:"center"}}><div style={{fontSize:10,color:C.muted}}>Spent</div><div style={{fontSize:15,fontWeight:700,color:"#f59e0b"}}>{fmt(ci.spending||0)}</div></div>
            <div style={{flex:1,textAlign:"center"}}><div style={{fontSize:10,color:C.muted}}>Left</div><div style={{fontSize:15,fontWeight:700,color:(ci.income||0)>=(ci.spending||0)?"#22c55e":"#ef4444"}}>{fmt((ci.income||0)-(ci.spending||0))}</div></div>
          </div>
        </Card>
      )}

      <SectionTitle C={C}>ALL DEBTS</SectionTitle>
      {debts.map((d,i)=><DebtCard key={d.name} C={C} d={d} i={i} markPaid={markPaid} mo={mo}/>)}
    </div>
  );
}

function DebtCard({C, d, i, markPaid, mo}) {
  const [open, setOpen] = useState(false);
  const payment = d.is107k ? (mo<=6?691.04:2600) : d.min;
  return (
    <div style={{margin:"4px 16px",background:C.card,borderRadius:14,padding:14,border:"1px solid "+C.border,opacity:d.paid?0.6:1,cursor:"pointer"}} onClick={()=>setOpen(!open)}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:10,height:10,borderRadius:5,background:d.color,flexShrink:0}}/>
          <div>
            <div style={{fontSize:15,fontWeight:700,color:C.text}}>{d.name}{d.is107k?" [home]":""}</div>
            <div style={{fontSize:11,color:C.muted,marginTop:1}}>{d.paid?"Paid off "+d.payoff:"Target: "+d.payoff+(d.promo?" - Promo "+d.promo:"")}</div>
          </div>
        </div>
        <div style={{textAlign:"right"}}>
          <div style={{fontSize:15,fontWeight:800,color:d.paid?"#22c55e":C.text}}>{d.paid?"PAID":fmt(d.start)}</div>
          <div style={{fontSize:10,color:C.muted}}>{open?"hide":"details"}</div>
        </div>
      </div>
      {!d.paid && <div style={{height:3,background:C.bg,borderRadius:2,marginTop:10}}><div style={{height:"100%",borderRadius:2,background:d.color,width:"5%"}}/></div>}
      {open && (
        <div style={{borderTop:"1px solid "+C.border,marginTop:10,paddingTop:10}}>
          <Row style={{marginBottom:5}}><span style={{fontSize:13,color:C.muted}}>Rate</span><span style={{fontSize:13,color:"#f59e0b"}}>{(d.rate*100).toFixed(2)}%</span></Row>
          <Row style={{marginBottom:5}}><span style={{fontSize:13,color:C.muted}}>Payment</span><span style={{fontSize:13,color:C.text}}>{fmtD(payment)}/mo</span></Row>
          {d.is107k && <Row style={{marginBottom:5}}><span style={{fontSize:13,color:C.muted}}>Phase</span><span style={{fontSize:13,color:"#f97316"}}>{mo<=6?"Interest Only":"P&I Full"}</span></Row>}
          {d.promo && <Row style={{marginBottom:5}}><span style={{fontSize:13,color:C.muted}}>Promo Ends</span><span style={{fontSize:13,color:"#ef4444"}}>{d.promo}</span></Row>}
          {!d.paid && <button onClick={(e)=>{e.stopPropagation();markPaid(i);}} style={{background:"#15803d",border:"none",color:"#fff",fontSize:14,fontWeight:700,padding:10,borderRadius:12,cursor:"pointer",width:"100%",marginTop:8}}>Mark as Paid Off!</button>}
        </div>
      )}
    </div>
  );
}

function TrackTab({C, mo, setMo}) {
  const phColors = {IO:"#3b82f6","P&I":"#f59e0b",Sprint:"#22c55e"};
  const m = MONTHS[mo-1];
  const pc = phColors[m.ph];
  const debtRows = [
    {label:"SoFi",     val:m.sofi,  color:"#3b82f6"},
    {label:"Disc 2",   val:m.d2,    color:"#f59e0b"},
    {label:"Car 2",    val:m.c2,    color:"#8b5cf6"},
    {label:"Car 1",    val:m.c1,    color:"#ec4899"},
    {label:"Disc 1",   val:m.d1,    color:"#06b6d4"},
    {label:"Cap One",  val:m.co?0:-1,color:"#22c55e"},
    {label:"107k Note",val:m.n107,  color:"#f97316"},
  ];

  return (
    <div style={{paddingBottom:8}}>
      <div style={{fontSize:22,fontWeight:800,color:C.text,padding:"20px 20px 4px"}}>19-Month Tracker</div>
      <div style={{fontSize:13,color:C.muted,padding:"0 20px 12px"}}>Tap a month to view details</div>

      <div style={{display:"flex",flexWrap:"wrap",gap:7,padding:"0 16px 12px"}}>
        {MONTHS.map((mm,idx)=>(
          <button key={mm.mo} onClick={()=>setMo(mm.mo)} style={{
            background: mo===mm.mo ? C.bg : C.card,
            border: "1px solid "+(mo===mm.mo ? phColors[mm.ph] : C.border),
            borderWidth: mo===mm.mo ? 2 : 1,
            borderRadius:10, padding:"7px 4px",
            width:"calc(20% - 6px)",
            display:"flex",flexDirection:"column",alignItems:"center",cursor:"pointer"
          }}>
            <span style={{fontSize:15,fontWeight:800,lineHeight:1,color:mo===mm.mo?phColors[mm.ph]:idx<mo?"#22c55e":C.muted}}>{mm.mo}</span>
            <span style={{fontSize:8,color:C.muted,marginTop:2}}>{mm.p.split(" ")[0]}</span>
          </button>
        ))}
      </div>

      <Card C={C} style={{borderColor:pc,borderWidth:2}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
          <div>
            <div style={{fontSize:20,fontWeight:800,color:C.text}}>{m.p}</div>
            <div style={{fontSize:12,fontWeight:600,color:pc,marginTop:2}}>{m.ph} Phase</div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontSize:10,color:C.muted}}>Snowball</div>
            <div style={{fontSize:22,fontWeight:900,color:"#22c55e"}}>{fmt(m.snow)}</div>
          </div>
        </div>
        {m.note !== "" && <div style={{background:C.bg,borderRadius:8,padding:"8px 10px",fontSize:13,color:C.sub,marginBottom:12,borderLeft:"2px solid #22c55e"}}>{m.note}</div>}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          {debtRows.map(({label,val,color})=>(
            <div key={label} style={{background:C.bg,borderRadius:8,padding:"8px 10px"}}>
              <div style={{width:6,height:6,borderRadius:3,background:color,marginBottom:3}}/>
              <div style={{fontSize:10,color:C.muted}}>{label}</div>
              <div style={{fontSize:14,fontWeight:700,color:val===0||val===-1?"#22c55e":C.text,marginTop:2}}>{val===0||val===-1?"PAID":fmt(val)}</div>
            </div>
          ))}
        </div>
      </Card>

      <SectionTitle C={C}>PHASE GUIDE</SectionTitle>
      {[
        {ph:"Phase 1 (Jun-Sep 2026)",   c:"#3b82f6", a:"Everything to SoFi. Discover 2 at $403/mo minimum.",    s:"~$2,258/mo extra to SoFi"},
        {ph:"Phase 1B (Oct-Nov 2026)",  c:"#3b82f6", a:"SoFi gone. Snowball crushes Car Note 2 at 8.75%.",       s:"~$1,700+/mo extra"},
        {ph:"Phase 2 (Dec 2026-Jun 2027)",c:"#f59e0b",a:"107k P&I kicks in at $2,600. Budget tightens.",         s:"$0-$300 extra variable"},
        {ph:"Phase 3 (Jul-Dec 2027)",   c:"#22c55e", a:"Final sprint -- consumer debts fall every 1-2 months.",  s:"Snowball accelerates rapidly"},
      ].map(({ph,c,a,s})=>(
        <div key={ph} style={{margin:"4px 16px",background:C.card,borderRadius:14,padding:14,borderLeft:"3px solid "+c}}>
          <div style={{fontSize:13,fontWeight:700,color:c,marginBottom:3}}>{ph}</div>
          <div style={{fontSize:13,color:C.sub,marginBottom:3}}>{a}</div>
          <div style={{fontSize:12,color:"#22c55e",fontWeight:600}}>{s}</div>
        </div>
      ))}
    </div>
  );
}

function BudgetTab({C, income, setIncome, hh, setHh, sink, setSink, totalHH, p107, minOther, snowball, mo}) {
  const [edit, setEdit] = useState(false);
  const [incomeIn, setIncomeIn] = useState(String(income));
  const [expandCat, setExpandCat] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [newCat, setNewCat] = useState(null);
  const [newName, setNewName] = useState("");
  const [newAmt, setNewAmt] = useState("");
  const [editSink, setEditSink] = useState(null);

  const updateItem = (ci,ii,f,v) => setHh(hh.map((c,cx)=>cx!==ci?c:{...c,items:c.items.map((it,ix)=>ix!==ii?it:{...it,[f]:f==="a"?(parseFloat(v)||0):v})}));
  const removeItem = (ci,ii) => setHh(hh.map((c,cx)=>cx!==ci?c:{...c,items:c.items.filter((_,ix)=>ix!==ii)}));
  const addItem = (ci) => {
    if (!newName.trim()) return;
    setHh(hh.map((c,cx)=>cx!==ci?c:{...c,items:[...c.items,{n:newName.trim(),a:parseFloat(newAmt)||0}]}));
    setNewCat(null); setNewName(""); setNewAmt("");
  };
  const updateSink = (i,f,v) => setSink(sink.map((s,si)=>si!==i?s:{...s,[f]:f==="annual"?(parseFloat(v)||0):v}));
  const totalSinkMo = sink.reduce((s,f)=>s+Math.ceil(f.annual/12),0);

  return (
    <div style={{paddingBottom:8}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",paddingRight:16}}>
        <div>
          <div style={{fontSize:22,fontWeight:800,color:C.text,padding:"20px 20px 4px"}}>Monthly Budget</div>
          <div style={{fontSize:13,color:C.muted,padding:"0 20px 12px"}}>{fmt(income)} income - {fmt(totalHH)} household</div>
        </div>
        <button onClick={()=>{setEdit(!edit);if(edit){setIncome(parseFloat(incomeIn)||income);}}} style={{marginTop:20,padding:"7px 16px",borderRadius:20,border:"1px solid #22c55e",background:edit?"#22c55e":C.card,color:edit?"#0f172a":"#22c55e",fontSize:13,fontWeight:700,cursor:"pointer"}}>
          {edit?"Done":"Edit"}
        </button>
      </div>

      {edit && (
        <Card C={C}>
          <div style={{fontSize:14,fontWeight:700,color:C.text,marginBottom:8}}>Monthly Take-Home Income</div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <span style={{fontSize:18,fontWeight:700,color:C.muted}}>$</span>
            <input style={{flex:1,background:C.bg,border:"1px solid "+C.border,color:"#22c55e",fontSize:22,fontWeight:800,padding:"8px 10px",borderRadius:10,outline:"none"}} type="number" value={incomeIn} onChange={e=>{setIncomeIn(e.target.value);setIncome(parseFloat(e.target.value)||0);}}/>
          </div>
        </Card>
      )}

      <Card C={C}>
        <div style={{fontSize:14,fontWeight:700,color:C.text,marginBottom:10}}>Where Your Money Goes</div>
        <div style={{display:"flex",height:12,borderRadius:6,overflow:"hidden",marginBottom:10}}>
          <div style={{width:Math.max(0,pct(totalHH,income))+"%",background:"#3b82f6",height:"100%"}}/>
          <div style={{width:Math.max(0,pct(p107,income))+"%",background:"#f97316",height:"100%"}}/>
          <div style={{width:Math.max(0,pct(minOther,income))+"%",background:"#ef4444",height:"100%"}}/>
          <div style={{width:Math.max(0,pct(Math.max(0,snowball),income))+"%",background:"#22c55e",height:"100%"}}/>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:10}}>
          {[["Household",totalHH,"#3b82f6"],["107k Note",p107,"#f97316"],["Debt Min",minOther,"#ef4444"],["Snowball",Math.max(0,snowball),"#22c55e"]].map(([l,v,c])=>(
            <div key={l} style={{display:"flex",alignItems:"center",gap:6}}>
              <div style={{width:8,height:8,borderRadius:4,background:c,flexShrink:0}}/>
              <span style={{fontSize:11,color:C.sub,flex:1}}>{l}</span>
              <span style={{fontSize:12,fontWeight:700,color:c}}>{fmt(v)}</span>
            </div>
          ))}
        </div>
        <div style={{fontSize:12,fontWeight:600,textAlign:"center",paddingTop:8,borderTop:"1px solid "+C.border,color:snowball>=0?"#22c55e":"#ef4444"}}>
          {snowball>=0?fmt(snowball)+" available for snowball":"Over budget by "+fmt(Math.abs(snowball))}
        </div>
      </Card>

      <SectionTitle C={C}>HOUSEHOLD BREAKDOWN</SectionTitle>
      {hh.map((cat,ci)=>{
        const catTotal = cat.items.reduce((s,it)=>s+it.a,0);
        const isOpen = expandCat===cat.cat;
        return (
          <div key={cat.cat} style={{margin:"4px 16px",background:C.card,borderRadius:14,padding:12,border:"1px solid "+C.border}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer"}} onClick={()=>setExpandCat(isOpen?null:cat.cat)}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:40,height:4,background:C.bg,borderRadius:2}}><div style={{width:Math.min(100,pct(catTotal,totalHH))+"%",height:"100%",background:"#3b82f6",borderRadius:2}}/></div>
                <span style={{fontSize:14,fontWeight:600,color:C.text}}>{cat.cat}</span>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <span style={{fontSize:15,fontWeight:700,color:edit?"#3b82f6":C.text}}>{fmt(catTotal)}</span>
                <span style={{fontSize:11,color:C.muted}}>{pct(catTotal,income)}%</span>
                <span style={{fontSize:10,color:C.muted}}>{isOpen?"^":"v"}</span>
              </div>
            </div>
            {(isOpen||edit) && (
              <div style={{borderTop:"1px solid "+C.border,marginTop:10,paddingTop:10}}>
                {cat.items.map((item,ii)=>(
                  <div key={ii} style={{display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:13,color:C.sub,marginBottom:6}}>
                    {edit && editItem?.ci===ci && editItem?.ii===ii ? (
                      <div style={{display:"flex",gap:6,flex:1,alignItems:"center"}}>
                        <input style={{flex:2,background:C.bg,border:"1px solid "+C.border,color:C.text,fontSize:13,padding:"5px 7px",borderRadius:7,outline:"none"}} value={item.n} onChange={e=>updateItem(ci,ii,"n",e.target.value)}/>
                        <span style={{color:C.muted}}>$</span>
                        <input style={{flex:1,background:C.bg,border:"1px solid "+C.border,color:C.text,fontSize:13,padding:"5px 7px",borderRadius:7,outline:"none",textAlign:"right"}} type="number" value={item.a} onChange={e=>updateItem(ci,ii,"a",e.target.value)}/>
                        <button onClick={()=>setEditItem(null)} style={{background:"#0d2e1a",border:"none",color:"#22c55e",fontSize:13,padding:"4px 8px",borderRadius:6,cursor:"pointer",fontWeight:700}}>ok</button>
                      </div>
                    ) : (
                      <>
                        <span>{item.n}</span>
                        <div style={{display:"flex",alignItems:"center",gap:8}}>
                          <span style={{color:C.text}}>{fmt(item.a)}</span>
                          {edit && <button onClick={()=>setEditItem({ci,ii})} style={{background:"#1e3a5f",border:"none",color:"#3b82f6",fontSize:11,padding:"2px 6px",borderRadius:5,cursor:"pointer"}}>edit</button>}
                          {edit && <button onClick={()=>removeItem(ci,ii)} style={{background:"#3b0f0f",border:"none",color:"#ef4444",fontSize:11,padding:"2px 6px",borderRadius:5,cursor:"pointer"}}>del</button>}
                        </div>
                      </>
                    )}
                  </div>
                ))}
                {edit && (newCat===ci ? (
                  <div style={{display:"flex",gap:6,marginTop:6,paddingTop:6,borderTop:"1px dashed "+C.border,alignItems:"center"}}>
                    <input style={{flex:2,background:C.bg,border:"1px solid "+C.border,color:C.text,fontSize:13,padding:"5px 7px",borderRadius:7,outline:"none"}} placeholder="Item name" value={newName} onChange={e=>setNewName(e.target.value)}/>
                    <span style={{color:C.muted}}>$</span>
                    <input style={{flex:1,background:C.bg,border:"1px solid "+C.border,color:C.text,fontSize:13,padding:"5px 7px",borderRadius:7,outline:"none",textAlign:"right"}} type="number" placeholder="0" value={newAmt} onChange={e=>setNewAmt(e.target.value)}/>
                    <button onClick={()=>addItem(ci)} style={{background:"#0d2e1a",border:"none",color:"#22c55e",fontSize:13,padding:"4px 8px",borderRadius:6,cursor:"pointer",fontWeight:700}}>add</button>
                    <button onClick={()=>{setNewCat(null);setNewName("");setNewAmt("");}} style={{background:"#3b0f0f",border:"none",color:"#ef4444",fontSize:13,padding:"4px 8px",borderRadius:6,cursor:"pointer"}}>x</button>
                  </div>
                ) : (
                  <button onClick={()=>{setNewCat(ci);setExpandCat(cat.cat);}} style={{background:"none",border:"1px dashed "+C.border,color:"#22c55e",fontSize:12,padding:"4px 10px",borderRadius:8,cursor:"pointer",marginTop:6,width:"100%"}}>+ Add item</button>
                ))}
              </div>
            )}
          </div>
        );
      })}

      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"16px 20px 8px 20px"}}>
        <span style={{fontSize:11,fontWeight:700,letterSpacing:2,color:C.muted}}>SINKING FUNDS</span>
        {edit && <button onClick={()=>setSink([...sink,{name:"New Fund",annual:0,due:"",p:"Y",doNow:false}])} style={{background:"none",border:"1px dashed "+C.border,color:"#22c55e",fontSize:12,padding:"4px 10px",borderRadius:8,cursor:"pointer"}}>+ Add</button>}
      </div>
      <Card C={C}>
        <div style={{fontSize:12,color:C.muted,marginBottom:10,fontStyle:"italic"}}>Total: {fmt(totalSinkMo)}/mo across {sink.length} funds</div>
        {sink.map((sf,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:10,paddingBottom:10,marginBottom:10,borderBottom:"1px solid "+C.border}}>
            {edit && editSink===i ? (
              <div style={{flex:1}}>
                <div style={{display:"flex",gap:6,marginBottom:6,alignItems:"center"}}>
                  <input style={{flex:2,background:C.bg,border:"1px solid "+C.border,color:C.text,fontSize:13,padding:"5px 7px",borderRadius:7,outline:"none"}} value={sf.name} onChange={e=>updateSink(i,"name",e.target.value)}/>
                  <button onClick={()=>setEditSink(null)} style={{background:"#0d2e1a",border:"none",color:"#22c55e",fontSize:13,padding:"4px 8px",borderRadius:6,cursor:"pointer",fontWeight:700}}>ok</button>
                  <button onClick={()=>{setSink(sink.filter((_,si)=>si!==i));setEditSink(null);}} style={{background:"#3b0f0f",border:"none",color:"#ef4444",fontSize:13,padding:"4px 8px",borderRadius:6,cursor:"pointer"}}>del</button>
                </div>
                <div style={{display:"flex",gap:6,alignItems:"center"}}>
                  <span style={{fontSize:12,color:C.muted,minWidth:55}}>Annual $</span>
                  <input style={{flex:1,background:C.bg,border:"1px solid "+C.border,color:C.text,fontSize:13,padding:"5px 7px",borderRadius:7,outline:"none",textAlign:"right"}} type="number" value={sf.annual} onChange={e=>updateSink(i,"annual",e.target.value)}/>
                  <span style={{fontSize:12,color:C.muted,minWidth:28}}>Due</span>
                  <input style={{flex:1,background:C.bg,border:"1px solid "+C.border,color:C.text,fontSize:13,padding:"5px 7px",borderRadius:7,outline:"none"}} value={sf.due} onChange={e=>updateSink(i,"due",e.target.value)}/>
                </div>
              </div>
            ) : (
              <>
                <span style={{fontSize:14,color:PCOL[sf.p]||"#64748b",flexShrink:0}}>{sf.p==="R"?"[!]":sf.p==="O"?"[~]":sf.p==="Y"?"[-]":"[+]"}</span>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:600,color:C.text}}>{sf.name}</div>
                  <div style={{fontSize:11,color:C.muted}}>Due: {sf.due||"--"}</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:12,color:C.muted}}>{fmt(sf.annual)}/yr</div>
                  <div style={{fontSize:13,fontWeight:700,color:sf.doNow?"#22c55e":C.muted}}>{fmt(Math.ceil(sf.annual/12))}/mo</div>
                </div>
                {edit && <button onClick={()=>setEditSink(i)} style={{background:"#1e3a5f",border:"none",color:"#3b82f6",fontSize:11,padding:"2px 6px",borderRadius:5,cursor:"pointer"}}>edit</button>}
              </>
            )}
          </div>
        ))}
      </Card>
    </div>
  );
}

function CheckinTab({C, mo, setMo, checkins, setCheckins, income, totalHH, p107, buffer, setBuffer, debts, celebrate}) {
  const existing = checkins[mo]||{};
  const [incomeIn, setIncomeIn] = useState(String(existing.income||""));
  const [spendIn, setSpendIn] = useState(String(existing.spending||""));
  const [bufIn, setBufIn] = useState(String(existing.bufferUsed||""));
  const [notes, setNotes] = useState(existing.notes||"");
  const [saved, setSaved] = useState(false);
  const m = MONTHS[mo-1];

  useEffect(()=>{
    const e = checkins[mo]||{};
    setIncomeIn(String(e.income||"")); setSpendIn(String(e.spending||""));
    setBufIn(String(e.bufferUsed||"")); setNotes(e.notes||""); setSaved(false);
  },[mo]);

  const incN = parseFloat(incomeIn)||0;
  const spN = parseFloat(spendIn)||0;
  const bufN = parseFloat(bufIn)||0;
  const left = incN - spN;
  const minDebts = debts.filter(d=>!d.paid&&!d.is107k).reduce((s,d)=>s+d.min,0);
  const actualSnow = Math.max(0, left - p107 - minDebts);
  const completedCount = Object.keys(checkins).length;

  const doSave = () => {
    setCheckins({...checkins,[mo]:{income:incN,spending:spN,bufferUsed:bufN,notes,savedAt:new Date().toISOString()}});
    if (bufN > 0) setBuffer(Math.max(0, buffer - bufN));
    setSaved(true);
    if (m.note.includes("PAID") || m.note.includes("FREE")) celebrate();
  };

  return (
    <div style={{paddingBottom:8}}>
      <div style={{fontSize:22,fontWeight:800,color:C.text,padding:"20px 20px 4px"}}>Monthly Check-In</div>
      <div style={{fontSize:13,color:C.muted,padding:"0 20px 12px"}}>Log what actually happened this month</div>

      <Card C={C}>
        <div style={{fontSize:14,fontWeight:700,color:C.text,marginBottom:10}}>Select Month</div>
        <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:16,marginBottom:8}}>
          <button onClick={()=>setMo(Math.max(1,mo-1))} style={{background:C.bg,border:"1px solid "+C.border,color:C.text,width:36,height:36,borderRadius:18,cursor:"pointer",fontSize:18}}>{"<"}</button>
          <div style={{textAlign:"center"}}>
            <div style={{fontSize:17,fontWeight:700,color:C.text}}>{m.p}</div>
            <div style={{fontSize:11,color:checkins[mo]?"#22c55e":C.muted}}>{checkins[mo]?"Logged":"Not logged"}</div>
          </div>
          <button onClick={()=>setMo(Math.min(19,mo+1))} style={{background:C.bg,border:"1px solid "+C.border,color:C.text,width:36,height:36,borderRadius:18,cursor:"pointer",fontSize:18}}>{">"}</button>
        </div>
        <div style={{fontSize:11,textAlign:"center",color:C.muted,marginBottom:6}}>{completedCount} of 19 months logged</div>
        <div style={{height:4,background:C.bg,borderRadius:2}}><div style={{height:"100%",borderRadius:2,background:"#22c55e",width:pct(completedCount,19)+"%"}}/></div>
      </Card>

      <Card C={C}>
        <div style={{fontSize:14,fontWeight:700,color:C.text,marginBottom:12}}>What Actually Happened</div>

        {[
          {label:"Actual income received",val:incomeIn,set:setIncomeIn,hint:String(income),diff:incN>0?incN-income:null,pos:true},
          {label:"Total household spending",val:spendIn,set:setSpendIn,hint:String(totalHH),diff:spN>0?spN-totalHH:null,pos:false},
          {label:"Emergency buffer used",val:bufIn,set:setBufIn,hint:"0",diff:null,pos:true},
        ].map(({label,val,set,hint,diff,pos})=>(
          <div key={label} style={{marginBottom:12}}>
            <div style={{fontSize:12,color:C.muted,marginBottom:4}}>{label}</div>
            <div style={{display:"flex",gap:8,alignItems:"center"}}>
              <span style={{fontSize:17,fontWeight:700,color:C.muted}}>$</span>
              <input style={{flex:1,background:C.bg,border:"1px solid "+C.border,color:C.text,fontSize:16,padding:"8px 10px",borderRadius:10,outline:"none"}} type="number" placeholder={hint} value={val} onChange={e=>set(e.target.value)}/>
              {diff !== null && <span style={{fontSize:12,fontWeight:700,minWidth:60,textAlign:"right",color:(pos?diff>=0:diff<=0)?"#22c55e":"#ef4444"}}>{diff>=0?"+":""}{fmt(diff)}</span>}
            </div>
          </div>
        ))}

        <div style={{marginBottom:12}}>
          <div style={{fontSize:12,color:C.muted,marginBottom:4}}>Notes / what came up</div>
          <textarea style={{width:"100%",background:C.bg,border:"1px solid "+C.border,color:C.text,fontSize:13,padding:10,borderRadius:10,outline:"none",resize:"none",height:60,fontFamily:"inherit",boxSizing:"border-box"}} placeholder="Car repair, unexpected bill, extra income..." value={notes} onChange={e=>setNotes(e.target.value)}/>
        </div>

        {(incN > 0 || spN > 0) && (
          <div style={{background:C.bg,borderRadius:10,padding:12,marginBottom:12}}>
            <Row style={{marginBottom:4}}><span style={{fontSize:12,color:C.muted}}>Left after spending</span><span style={{fontSize:15,fontWeight:700,color:left>=0?"#22c55e":"#ef4444"}}>{fmt(left)}</span></Row>
            <Row style={{marginBottom:4}}><span style={{fontSize:12,color:C.muted}}>107k + debt payments</span><span style={{fontSize:15,fontWeight:700,color:C.text}}>{fmt(p107+minDebts)}</span></Row>
            <Row style={{paddingTop:8,borderTop:"1px solid "+C.border}}><span style={{fontSize:12,color:C.muted,fontWeight:700}}>Snowball available</span><span style={{fontSize:18,fontWeight:800,color:"#22c55e"}}>{fmt(actualSnow)}</span></Row>
          </div>
        )}

        <button onClick={doSave} style={{background:saved?"#166534":"#15803d",border:"none",color:"#fff",fontSize:14,fontWeight:700,padding:12,borderRadius:12,cursor:"pointer",width:"100%"}}>
          {saved?"Saved!":"Save This Month's Check-In"}
        </button>
      </Card>

      {Object.keys(checkins).length > 0 && (
        <>
          <SectionTitle C={C}>CHECK-IN HISTORY</SectionTitle>
          {Object.entries(checkins).sort((a,b)=>parseInt(b[0])-parseInt(a[0])).map(([m2,ci])=>(
            <Card key={m2} C={C} style={{padding:"12px 14px"}}>
              <Row style={{marginBottom:6}}>
                <span style={{fontSize:13,fontWeight:700,color:C.text}}>{MONTHS[parseInt(m2)-1]?.p}</span>
                <span style={{fontSize:11,color:C.muted}}>{ci.savedAt?new Date(ci.savedAt).toLocaleDateString():""}</span>
              </Row>
              <div style={{display:"flex",gap:8}}>
                <div style={{flex:1,textAlign:"center"}}><div style={{fontSize:9,color:C.muted}}>Income</div><div style={{fontSize:14,fontWeight:700,color:"#22c55e"}}>{fmt(ci.income||0)}</div></div>
                <div style={{flex:1,textAlign:"center"}}><div style={{fontSize:9,color:C.muted}}>Spent</div><div style={{fontSize:14,fontWeight:700,color:"#f59e0b"}}>{fmt(ci.spending||0)}</div></div>
                <div style={{flex:1,textAlign:"center"}}><div style={{fontSize:9,color:C.muted}}>Left</div><div style={{fontSize:14,fontWeight:700,color:(ci.income||0)>=(ci.spending||0)?"#22c55e":"#ef4444"}}>{fmt((ci.income||0)-(ci.spending||0))}</div></div>
              </div>
              {ci.notes && <div style={{fontSize:12,color:C.muted,marginTop:6,fontStyle:"italic"}}>{ci.notes}</div>}
            </Card>
          ))}
        </>
      )}
    </div>
  );
}

function FreedomTab({C, debts, snowball, promoDays, freedomDays, mo, resetConfirm, setResetConfirm, doReset}) {
  const [sub, setSub] = useState("milestones");
  const [wf, setWf] = useState("");
  const [wfTarget, setWfTarget] = useState("SoFi Loan");
  const [wiInc, setWiInc] = useState(0);
  const [wiExp, setWiExp] = useState(0);
  const [wiExtra, setWiExtra] = useState(0);
  const [wiWind, setWiWind] = useState(0);

  const wfN = parseFloat(wf)||0;
  const base = 2918;
  const adj = base+wiInc-wiExp+wiExtra;
  const impact = ((base-adj)/base*19)-(wiWind*0.8/base);
  const faster = impact < 0;
  const activeDebts = debts.filter(d=>!d.paid&&!d.is107k);

  const SUBS = [{id:"milestones",l:"Milestones"},{id:"roadmap",l:"Jan 2028"},{id:"tools",l:"Tools"},{id:"settings",l:"Settings"}];

  return (
    <div style={{paddingBottom:8}}>
      <div style={{fontSize:22,fontWeight:800,color:C.text,padding:"20px 20px 8px"}}>Freedom</div>

      <div style={{display:"flex",gap:6,padding:"0 16px 12px",overflowX:"auto"}}>
        {SUBS.map(s=>(
          <button key={s.id} onClick={()=>setSub(s.id)} style={{background:sub===s.id?"#22c55e":C.card,color:sub===s.id?"#0f172a":C.muted,border:"1px solid "+(sub===s.id?"#22c55e":C.border),borderRadius:20,padding:"6px 14px",fontSize:12,fontWeight:600,cursor:"pointer",whiteSpace:"nowrap"}}>
            {s.l}
          </button>
        ))}
      </div>

      {sub==="milestones" && (
        <>
          <div style={{display:"flex",gap:8,padding:"0 16px 12px"}}>
            <MiniStat C={C} label="Freedom Day" value={freedomDays+" days"} color="#22c55e"/>
            <MiniStat C={C} label="Disc 2 Promo" value={promoDays+" days"} color={promoDays<90?"#ef4444":"#f59e0b"}/>
          </div>
          <Card C={C}>
            {[
              {name:"Capital One",  date:"Jun 2026",freed:40,      done:true, note:"Day 1 win with lump sum!"},
              {name:"SoFi Loan",    date:"Sep 2026",freed:1283.78, done:false,note:"Snowball nearly doubles overnight"},
              {name:"Discover 2",   date:"Jul 2027",freed:403,     done:false,note:"Beat the promo -- saved thousands"},
              {name:"Car Note 2",   date:"Aug 2027",freed:395.16,  done:false,note:"8.75% gone -- momentum is real"},
              {name:"Car Note 1",   date:"Nov 2027",freed:419.31,  done:false,note:"One consumer debt left"},
              {name:"Discover 1",   date:"Dec 2027",freed:240,     done:false,note:"ALL CONSUMER DEBT GONE!"},
            ].map((ms,i,arr)=>(
              <div key={ms.name} style={{display:"flex",gap:12,opacity:ms.done?0.65:1,position:"relative"}}>
                <div style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                  <div style={{width:30,height:30,borderRadius:15,border:"2px solid "+(ms.done?"#22c55e":"#475569"),background:ms.done?"#22c55e":"#334155",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:800,color:"#fff",flexShrink:0,zIndex:1}}>{ms.done?"v":i+1}</div>
                  {i<arr.length-1 && <div style={{width:2,flex:1,background:ms.done?"#22c55e":"#1e293b",minHeight:16}}/>}
                </div>
                <div style={{flex:1,paddingBottom:16}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <span style={{fontSize:15,fontWeight:700,color:ms.done?"#22c55e":C.text}}>{ms.name}</span>
                    <span style={{fontSize:12,color:C.muted}}>{ms.date}</span>
                  </div>
                  <div style={{fontSize:13,color:"#22c55e",fontWeight:600,marginTop:2}}>+{fmt(ms.freed)}/mo freed</div>
                  <div style={{fontSize:12,color:C.muted,marginTop:2,fontStyle:"italic"}}>{ms.note}</div>
                </div>
              </div>
            ))}
          </Card>
          <SectionTitle C={C}>CRITICAL REMINDERS</SectionTitle>
          {[
            "Discover 2 MUST be paid $403/mo -- $212 minimum leaves $5k exposed to 27% interest",
            "Keep $1,000-$2,000 emergency buffer untouched at all times",
            "Bonuses/refunds: 80% to current snowball target, 20% buffer",
            "After Dec 2027: build 6-month emergency fund BEFORE investing",
            "107k note continues after Dec 2027 -- P&I of $2,600/mo until Jun 2031",
          ].map((r,i)=>(
            <div key={i} style={{display:"flex",gap:10,alignItems:"flex-start",margin:"4px 16px",background:C.card,borderRadius:12,padding:"12px 14px",borderLeft:"3px solid #f59e0b"}}>
              <span style={{fontSize:13,color:"#f59e0b",flexShrink:0}}>[!]</span>
              <span style={{fontSize:13,color:C.sub,lineHeight:1.4}}>{r}</span>
            </div>
          ))}
        </>
      )}

      {sub==="roadmap" && (
        <>
          <Card C={C} style={{borderColor:"#22c55e",borderWidth:2}}>
            <div style={{textAlign:"center",paddingBottom:12,borderBottom:"1px solid "+C.border,marginBottom:14}}>
              <div style={{fontSize:11,fontWeight:700,color:"#22c55e",letterSpacing:2,marginBottom:4}}>MONTHLY CASH FREED AFTER DEC 2027</div>
              <div style={{fontSize:44,fontWeight:900,color:"#22c55e",lineHeight:1}}>$2,781</div>
              <div style={{fontSize:12,color:C.muted,marginTop:4}}>minimum payments freed - $3,586 incl. snowball extra</div>
            </div>
            {[
              {ph:"Phase 1",goal:"6-Month Emergency Fund",    mo2:1500,target:"$22,000",pri:"Critical",   note:"Build before investing"},
              {ph:"Phase 2",goal:"107k Note Extra Principal", mo2:850, target:"$107,000",pri:"High",       note:"7.75% -- extra principal saves thousands"},
              {ph:"Phase 3",goal:"Retirement (IRA)",          mo2:583, target:"$7k/yr",  pri:"Important",  note:"Max IRA = $7,000/yr"},
              {ph:"Phase 4",goal:"Investing / Wealth",        mo2:817, target:"Ongoing", pri:"Build Wealth",note:"Index funds, long-term"},
            ].map(({ph,goal,mo2,target,pri,note})=>(
              <div key={ph} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:"1px solid "+C.border}}>
                <div style={{flex:1}}>
                  <div style={{fontSize:10,color:C.muted,fontWeight:700,letterSpacing:1}}>{ph} - {pri}</div>
                  <div style={{fontSize:14,color:C.text,fontWeight:600,marginTop:1}}>{goal}</div>
                  <div style={{fontSize:11,color:C.muted,marginTop:1,fontStyle:"italic"}}>{note}</div>
                </div>
                <div style={{textAlign:"right",marginLeft:10}}>
                  <div style={{fontSize:18,fontWeight:800,color:"#22c55e"}}>{fmt(mo2)}/mo</div>
                  <div style={{fontSize:10,color:C.muted}}>Target: {target}</div>
                </div>
              </div>
            ))}
            <Row style={{paddingTop:10,marginTop:4,borderTop:"1px solid "+C.border}}>
              <span style={{fontSize:13,color:C.sub,fontWeight:600}}>Total deployed</span>
              <span style={{fontSize:14,fontWeight:700,color:"#22c55e"}}>{fmt(1500+850+583+817)}/mo</span>
            </Row>
          </Card>

          <SectionTitle C={C}>BIWEEKLY PAYMENT HACK</SectionTitle>
          <Card C={C}>
            <div style={{textAlign:"center",paddingBottom:10,borderBottom:"1px solid "+C.border,marginBottom:10}}>
              <div style={{fontSize:52,fontWeight:900,color:"#22c55e",lineHeight:1}}>1</div>
              <div style={{fontSize:13,color:C.muted,marginTop:2}}>extra payment per year per debt -- free</div>
            </div>
            <div style={{fontSize:13,color:C.muted,marginBottom:12,lineHeight:1.5,fontStyle:"italic"}}>Pay half your monthly amount every 2 weeks. 26 biweekly periods = 13 payments vs 12. No budget change, real extra principal.</div>
            {[
              {name:"SoFi Loan",  mo2:1283.78,rate:"12.6%",impact:"~1 month faster"},
              {name:"107k Note",  mo2:2600,    rate:"7.75%",impact:"High long-term value"},
              {name:"Car Note 2", mo2:395.16,  rate:"8.75%",impact:"~2-3 weeks faster"},
            ].map(b=>(
              <div key={b.name} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:"1px solid "+C.border}}>
                <div><div style={{fontSize:14,fontWeight:600,color:C.text}}>{b.name}</div><div style={{fontSize:11,color:C.muted,marginTop:2}}>{b.rate} - {b.impact}</div></div>
                <div style={{textAlign:"right"}}><div style={{fontSize:12,color:C.muted}}>{fmt(b.mo2)}/mo</div><div style={{fontSize:14,fontWeight:700,color:"#22c55e"}}>{fmt(b.mo2/2)} per 2wk</div></div>
              </div>
            ))}
            <div style={{fontSize:11,color:"#f59e0b",marginTop:8,fontStyle:"italic"}}>Always confirm extra payments go to principal, not next month's payment.</div>
          </Card>
        </>
      )}

      {sub==="tools" && (
        <>
          <SectionTitle C={C}>WINDFALL PLANNER</SectionTitle>
          <Card C={C}>
            <div style={{fontSize:12,color:C.muted,marginBottom:6}}>Enter a bonus, tax refund, or gift</div>
            <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:10}}>
              <span style={{fontSize:17,fontWeight:700,color:C.muted}}>$</span>
              <input style={{flex:1,background:C.bg,border:"1px solid "+C.border,color:C.text,fontSize:16,padding:"8px 10px",borderRadius:10,outline:"none"}} type="number" placeholder="0" value={wf} onChange={e=>setWf(e.target.value)}/>
            </div>
            {wfN > 0 && (
              <>
                <div style={{fontSize:12,color:C.muted,marginBottom:6}}>Apply to which debt?</div>
                <select style={{background:C.bg,border:"1px solid "+C.border,color:C.text,fontSize:15,padding:"8px 10px",borderRadius:10,width:"100%",outline:"none",marginBottom:12}} value={wfTarget} onChange={e=>setWfTarget(e.target.value)}>
                  {activeDebts.map(d=><option key={d.name}>{d.name}</option>)}
                </select>
                {[["80% to "+wfTarget, wfN*0.8,"#22c55e"],["10% to Emergency Buffer",wfN*0.1,"#3b82f6"],["10% to You (guilt-free!)",wfN*0.1,"#f59e0b"]].map(([l,v,c])=>(
                  <Row key={l} style={{padding:"5px 0"}}><span style={{fontSize:14,color:C.sub}}>{l}</span><span style={{fontSize:14,fontWeight:700,color:c}}>{fmt(v)}</span></Row>
                ))}
                <Row style={{padding:"8px 0 0",borderTop:"1px solid "+C.border,marginTop:4}}>
                  <span style={{fontSize:14,fontWeight:700,color:C.text}}>Impact</span>
                  <span style={{fontSize:14,fontWeight:700,color:"#22c55e"}}>~{((wfN*0.8)/2918).toFixed(1)} months faster</span>
                </Row>
              </>
            )}
          </Card>

          <SectionTitle C={C}>WHAT-IF SCENARIOS</SectionTitle>
          <Card C={C}>
            {[
              {l:"Monthly income change",v:wiInc,set:setWiInc,min:-2000,max:3000,c:wiInc>=0?"#22c55e":"#ef4444",prefix:wiInc>=0?"+":""},
              {l:"Extra monthly expense",v:wiExp,set:setWiExp,min:0,max:1000,c:"#ef4444",prefix:"+"},
              {l:"Extra to snowball/mo",  v:wiExtra,set:setWiExtra,min:0,max:2000,c:"#22c55e",prefix:"+"},
              {l:"One-time windfall",     v:wiWind,set:setWiWind,min:0,max:10000,c:"#22c55e",prefix:""},
            ].map(({l,v,set,min,max,c,prefix})=>(
              <div key={l} style={{marginBottom:10}}>
                <div style={{fontSize:12,color:C.muted,marginBottom:4}}>{l}</div>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <input type="range" min={min} max={max} step={50} value={v} onChange={e=>set(parseInt(e.target.value))} style={{flex:1,accentColor:"#22c55e"}}/>
                  <span style={{fontSize:14,fontWeight:700,color:c,minWidth:70,textAlign:"right"}}>{prefix}{fmt(v)}</span>
                </div>
              </div>
            ))}
            <div style={{background:C.bg,borderRadius:10,padding:12,marginTop:4}}>
              <Row style={{marginBottom:4}}><span style={{fontSize:12,color:C.muted}}>Adjusted Snowball</span><span style={{fontSize:15,fontWeight:700,color:C.text}}>{fmt(Math.max(0,adj))}/mo</span></Row>
              <Row style={{marginBottom:4}}><span style={{fontSize:12,color:C.muted}}>vs Baseline</span><span style={{fontSize:15,fontWeight:700,color:adj>=base?"#22c55e":"#ef4444"}}>{adj>=base?"+":""}{fmt(adj-base)}/mo</span></Row>
              <Row style={{paddingTop:8,borderTop:"1px solid "+C.border}}>
                <span style={{fontSize:12,color:C.muted,fontWeight:700}}>Plan Impact</span>
                <span style={{fontSize:16,fontWeight:800,color:faster?"#22c55e":"#ef4444"}}>{faster?Math.abs(impact).toFixed(1)+" mo FASTER":impact===0?"No change":impact.toFixed(1)+" mo SLOWER"}</span>
              </Row>
            </div>
          </Card>
        </>
      )}

      {sub==="settings" && (
        <>
          <Card C={C}>
            <div style={{fontSize:14,fontWeight:700,color:C.text,marginBottom:4}}>App Settings</div>
            <div style={{fontSize:12,color:C.muted,marginBottom:16}}>All data saved locally on your device.</div>
            {[["App Version","Debt Freedom v3.0"],["Plan Target","Dec 2027"],["Total Starting Debt","$174,254"],["Consumer Debt (excl. 107k)","$67,254"],["107k Note","$107,000 at 7.75%"]].map(([l,v])=>(
              <Row key={l} style={{paddingBottom:10,marginBottom:10,borderBottom:"1px solid "+C.border}}>
                <span style={{fontSize:13,color:C.text,fontWeight:600}}>{l}</span>
                <span style={{fontSize:13,color:C.sub}}>{v}</span>
              </Row>
            ))}
            {!resetConfirm ? (
              <button onClick={()=>setResetConfirm(true)} style={{background:"#7f1d1d",border:"none",color:"#fff",fontSize:14,fontWeight:700,padding:10,borderRadius:12,cursor:"pointer",width:"100%",marginTop:4}}>
                Reset All Data to Defaults
              </button>
            ) : (
              <div style={{background:"#450a0a",borderRadius:12,padding:14}}>
                <div style={{color:"#fca5a5",fontWeight:700,marginBottom:10,fontSize:13}}>This will erase ALL your data -- check-ins, balances, edits -- and cannot be undone.</div>
                <div style={{display:"flex",gap:8}}>
                  <button onClick={doReset} style={{flex:1,background:"#ef4444",border:"none",color:"#fff",fontSize:13,fontWeight:700,padding:10,borderRadius:10,cursor:"pointer"}}>Yes, Reset</button>
                  <button onClick={()=>setResetConfirm(false)} style={{flex:1,background:"#374151",border:"none",color:"#fff",fontSize:13,fontWeight:700,padding:10,borderRadius:10,cursor:"pointer"}}>Cancel</button>
                </div>
              </div>
            )}
          </Card>

          <Card C={C}>
            <div style={{fontSize:14,fontWeight:700,color:C.text,marginBottom:12}}>Add to iPhone Home Screen</div>
            {["1. Open this app in Safari (not Chrome)","2. Tap the Share button at the bottom","3. Scroll down and tap Add to Home Screen","4. Name it Debt Freedom and tap Add","5. It appears on your home screen like a real app!"].map((step,i)=>(
              <div key={i} style={{fontSize:13,color:C.sub,marginBottom:8,paddingLeft:4}}>{step}</div>
            ))}
            <div style={{fontSize:12,color:C.muted,marginTop:8,fontStyle:"italic"}}>Tip: Host on CodeSandbox.io for free -- paste this file into a new React project and use that URL in Safari.</div>
          </Card>
        </>
      )}
    </div>
  );
}


    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(<App/>);
  </script>
</body>
</html>