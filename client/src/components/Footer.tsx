import { Link } from "wouter";
import NeighborhoodBar from "./NeighborhoodBar";

export default function Footer() {
  return (
    <>
    <NeighborhoodBar />
    <footer style={{background:"#1a1a1a",borderTop:"1px solid rgba(255,255,255,0.08)",padding:"52px 40px 40px",textAlign:"center"}}>
      <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:"0.95rem",fontWeight:400,letterSpacing:".25em",textTransform:"uppercase",color:"#fff",marginBottom:"6px"}}>
        PATRICK M<sup style={{fontSize:".55em",letterSpacing:0,verticalAlign:"super"}}>AC</sup>CARTEE
      </div>
      <div style={{fontSize:".65rem",letterSpacing:".15em",textTransform:"uppercase",color:"#888",marginBottom:"28px"}}>
        DRE# 02142693 &nbsp;&middot;&nbsp; The Grubb Company
      </div>
      <div style={{display:"flex",justifyContent:"center",gap:"28px",flexWrap:"wrap"}}>
        {[
          {href:"/buy",label:"Buy"},
          {href:"/sell",label:"Sell"},
          {href:"/blog",label:"Blog"},
          {href:"/neighborhoods",label:"Neighborhoods"},
          {href:"/east-bay-school-guide",label:"Schools"},
          {href:"/waters",label:"Alice Waters"},
          {href:"/julia-morgan",label:"Julia Morgan"},
          {href:"mailto:patrick@grubbco.com",label:"Contact"},
        ].map(({href,label}) => (
          <a key={label} href={href} style={{fontSize:".6rem",letterSpacing:".15em",textTransform:"uppercase",color:"#888",textDecoration:"none"}}>
            {label}
          </a>
        ))}
      </div>
    </footer>
    </>
  );
}
