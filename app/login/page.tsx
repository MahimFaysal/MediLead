"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [tab, setTab] = useState("login")
  const [form, setForm] = useState({
    email: "", password: "", firstName: "", lastName: ""
  })
  const [message, setMessage] = useState("")
  const [isError, setIsError] = useState(false)
  const [loading, setLoading] = useState(false)

  const update = (field: string, value: string) => {
    setForm(f => ({ ...f, [field]: value }))
  }

  const handleSubmit = async () => {
    setMessage("")
    setLoading(true)

    try {
      if (tab === "register") {
        // REGISTER
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form)
        })
        const data = await res.json()

        if (!res.ok) {
          setIsError(true)
          setMessage(data.error || "Registration failed")
        } else {
          setIsError(false)
          setMessage("Account created! Please sign in.")
          setTab("login")
          setForm(f => ({ ...f, password: "" }))
        }

      } else {
        // LOGIN
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: form.email,
            password: form.password
          })
        })
        const data = await res.json()

        if (!res.ok) {
          setIsError(true)
          setMessage(data.error || "Login failed")
        } else {
          setIsError(false)
          setMessage("Login successful! Redirecting...")
          // Save token
          localStorage.setItem("token", data.token)
          localStorage.setItem("user", JSON.stringify(data.user))
          // Go to dashboard
          setTimeout(() => router.push("/dashboard"), 1000)
        }
      }

    } catch (e) {
      setIsError(true)
      setMessage("Connection error. Is the server running?")
    }

    setLoading(false)
  }

  const inputStyle = {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "10px",
    border: "1.5px solid #1D4ED8",
    background: "#0B1D3A",
    color: "white",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box" as const,
    marginTop: "6px"
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0B1D3A",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      fontFamily: "sans-serif"
    }}>
      <div style={{
        background: "#152B52",
        borderRadius: "20px",
        padding: "36px 28px",
        width: "100%",
        maxWidth: "420px",
        border: "1px solid #1D4ED8"
      }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <div style={{ fontSize: "44px" }}>🩺</div>
          <h1 style={{ color: "#F59E0B", fontSize: "24px",
            fontWeight: "800", margin: "8px 0 4px" }}>
            MediLead
          </h1>
          <p style={{ color: "#64748B", fontSize: "13px" }}>
            South Asia MBBS Olympiad
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", background: "#0B1D3A",
          borderRadius: "10px", padding: "4px", marginBottom: "20px" }}>
          {["login", "register"].map(t => (
            <button key={t} onClick={() => {
              setTab(t); setMessage("")
            }} style={{
              flex: 1, padding: "10px", borderRadius: "8px",
              border: "none", cursor: "pointer", fontWeight: "700",
              fontSize: "14px", fontFamily: "sans-serif",
              background: tab === t ? "#1D4ED8" : "transparent",
              color: tab === t ? "white" : "#64748B"
            }}>
              {t === "login" ? "Sign In" : "Register"}
            </button>
          ))}
        </div>

        {/* Fields */}
        {tab === "register" && (
          <>
            <div style={{ marginBottom: "14px" }}>
              <label style={{ color: "#94A3B8", fontSize: "13px",
                fontWeight: "600" }}>First Name</label>
              <input style={inputStyle} placeholder="Your first name"
                value={form.firstName}
                onChange={e => update("firstName", e.target.value)} />
            </div>
            <div style={{ marginBottom: "14px" }}>
              <label style={{ color: "#94A3B8", fontSize: "13px",
                fontWeight: "600" }}>Last Name</label>
              <input style={inputStyle} placeholder="Your last name"
                value={form.lastName}
                onChange={e => update("lastName", e.target.value)} />
            </div>
          </>
        )}

        <div style={{ marginBottom: "14px" }}>
          <label style={{ color: "#94A3B8", fontSize: "13px",
            fontWeight: "600" }}>Email</label>
          <input style={inputStyle} type="email"
            placeholder="you@college.edu"
            value={form.email}
            onChange={e => update("email", e.target.value)} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ color: "#94A3B8", fontSize: "13px",
            fontWeight: "600" }}>Password</label>
          <input style={inputStyle} type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={e => update("password", e.target.value)} />
        </div>

        {/* Message */}
        {message && (
          <div style={{
            background: isError ? "#450a0a" : "#052e16",
            border: `1px solid ${isError ? "#EF4444" : "#10B981"}`,
            color: isError ? "#EF4444" : "#10B981",
            padding: "10px 14px", borderRadius: "8px",
            fontSize: "13px", marginBottom: "16px",
            textAlign: "center"
          }}>
            {message}
          </div>
        )}

        {/* Button */}
        <button onClick={handleSubmit} disabled={loading}
          style={{
            width: "100%", padding: "14px",
            background: loading ? "#92400E" : "#F59E0B",
            color: "#0B1D3A", border: "none",
            borderRadius: "10px", fontSize: "15px",
            fontWeight: "800", cursor: loading ? "wait" : "pointer",
            fontFamily: "sans-serif"
          }}>
          {loading ? "Please wait..." :
            tab === "login" ? "Sign In →" : "Create Account →"}
        </button>

        <p style={{ textAlign: "center", marginTop: "16px",
          color: "#64748B", fontSize: "13px" }}>
          <a href="/" style={{ color: "#3B82F6",
            textDecoration: "none" }}>← Back to Home</a>
        </p>
      </div>
    </div>
  )
}