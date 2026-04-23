export default function Home() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#0B1D3A",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      fontFamily: "sans-serif",
      color: "white",
      textAlign: "center",
      padding: "20px"
    }}>
      <div style={{ fontSize: "64px", marginBottom: "16px" }}>🩺</div>
      <h1 style={{
        fontSize: "36px",
        fontWeight: "800",
        color: "#F59E0B",
        marginBottom: "8px"
      }}>
        MediLead
      </h1>
      <p style={{
        color: "#94A3B8",
        fontSize: "18px",
        marginBottom: "32px"
      }}>
        National MBBS Olympiad Platform
      </p>
      <div style={{
        background: "#152B52",
        border: "2px solid #10B981",
        borderRadius: "16px",
        padding: "24px 40px"
      }}>
        <p style={{ color: "#10B981", fontSize: "16px", fontWeight: "700" }}>
          ✅ Your app is working!
        </p>
        <p style={{ color: "#64748B", fontSize: "14px", marginTop: "8px" }}>
          Next: we will build Login page
        </p>
      </div>
    </div>
  )
}