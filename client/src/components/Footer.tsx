import NeighborhoodBar from "./NeighborhoodBar";

export default function Footer() {
  return (
    <>
      <NeighborhoodBar />
      <footer style={{padding:"40px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"16px",borderTop:"1px solid #e5e5e5",background:"#fff",fontFamily:"sans-serif"}}>
        <div>
          <div style={{fontSize:"11px",fontWeight:600,letterSpacing:"0.1em",textTransform:"uppercase",color:"#111",marginBottom:"4px"}}>Patrick MacCartee</div>
          <div style={{fontSize:"11px",color:"#888"}}>DRE# 02142693</div>
        </div>
        <nav style={{display:"flex",gap:"24px",flexWrap:"wrap",alignItems:"center"}}>
          <a href="/east-bay-school-guide" style={{fontSize:"12px",color:"#555",textDecoration:"none"}}>Schools</a>
          <a href="/waters" style={{fontSize:"12px",color:"#555",textDecoration:"none"}}>Alice Waters</a>
          <a href="/julia-morgan" style={{fontSize:"12px",color:"#555",textDecoration:"none"}}>Julia Morgan</a>
          <a href="mailto:patrick@realtor510.com" style={{fontSize:"12px",color:"#555",textDecoration:"none"}}>Contact</a>
        </nav>
      </footer>
    </>
  );
}
