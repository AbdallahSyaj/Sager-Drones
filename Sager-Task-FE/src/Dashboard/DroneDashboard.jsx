import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
} from "recharts";
import { Download, Activity, CheckCircle, XCircle, Plane } from "lucide-react";
import io from "socket.io-client";
import { jsPDF } from "jspdf";
import { BACKEND_WS } from "../config";
import {
  upsertFromFeature,
  selectAllDrones,
  selectRedCount,
} from "../store/dronesSlice";
import { isAllowed } from "../utils/formatters";

const DroneDashboard = () => {
  const dispatch = useDispatch();
  const drones = useSelector(selectAllDrones);

  useEffect(() => {
    const socket = io(BACKEND_WS, { transports: ["polling"] });
    socket.on("message", (fc) => {
      const feat = fc?.features?.[0];
      if (feat) dispatch(upsertFromFeature(feat));
    });
    return () => socket.disconnect();
  }, [dispatch]);

  const stats = useMemo(() => {
    const authorized = drones.filter((d) => isAllowed(d.registration)).length;
    return {
      total: drones.length,
      authorized,
      unauthorized: drones.length - authorized,
      active: drones.length,
    };
  }, [drones]);

  const pieData = useMemo(
    () => [
      { name: "Authorized", value: stats.authorized, color: "#22c55e" },
      { name: "Unauthorized", value: stats.unauthorized, color: "#ef4444" },
    ],
    [stats]
  );

  const barData = useMemo(
    () =>
      drones.slice(-5).map((d) => ({
        name: d.registration,
        altitude: d.altitude,
        authorized: isAllowed(d.registration),
      })),
    [drones]
  );

  const altitudeHistory = useMemo(() => {
    return drones.slice(-10).map((d) => ({
      time: new Date(d.lastTimestamp).toLocaleTimeString("en-US"),
      altitude: d.altitude,
      registration: d.registration,
    }));
  }, [drones]);

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("Drone Monitoring Report", 20, 30);
    doc.setFontSize(14);
    doc.text(`Total Drones: ${stats.total}`, 20, 50);
    doc.text(`Authorized: ${stats.authorized}`, 20, 70);
    doc.text(`Unauthorized: ${stats.unauthorized}`, 20, 90);

    let y = 120;
    drones.forEach((drone) => {
      if (y > 270) {
        doc.addPage();
        y = 30;
      }
      const status = isAllowed(drone.registration)
        ? "Authorized"
        : "Unauthorized";
      doc.setFontSize(10);
      doc.text(
        `${drone.registration} - ${status} - Alt: ${drone.altitude}m`,
        20,
        y
      );
      y += 15;
    });

    doc.save("drone-report.pdf");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1a1a1a, #2d2d2d)",
        color: "#fff",
        fontFamily: "Arial",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "20px" }}>
        {/* Header */}
        <div
          style={{
            background: "linear-gradient(135deg, #dc2626, #991b1b)",
            padding: "30px",
            borderRadius: "15px",
            marginBottom: "30px",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: "2.5em",
              textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            }}
          >
            Drone Monitoring Dashboard
          </h1>
          <button
            onClick={exportToPDF}
            style={{
              background: "#fff",
              color: "#dc2626",
              border: "none",
              padding: "12px 24px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
              marginTop: "15px",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Download size={20} /> Export PDF
          </button>
        </div>

    
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          {[
            {
              icon: Activity,
              color: "#dc2626",
              value: stats.total,
              label: "Total Drones",
            },
            {
              icon: CheckCircle,
              color: "#22c55e",
              value: stats.authorized,
              label: "Authorized",
            },
            {
              icon: XCircle,
              color: "#ef4444",
              value: stats.unauthorized,
              label: "Unauthorized",
            },
            {
              icon: Plane,
              color: "#3b82f6",
              value: stats.active,
              label: "Active",
            },
          ].map((card, i) => (
            <div
              key={i}
              style={{
                background: "rgba(45,45,45,0.9)",
                padding: "25px",
                borderRadius: "15px",
                border: "2px solid #444",
                textAlign: "center",
                boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
              }}
            >
              <card.icon
                size={40}
                color={card.color}
                style={{ marginBottom: "10px" }}
              />
              <h3 style={{ fontSize: "2em", color: card.color }}>
                {card.value}
              </h3>
              <p>{card.label}</p>
            </div>
          ))}
        </div>

  
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
            gap: "30px",
            marginBottom: "30px",
          }}
        >
  
          <div
            style={{
              background: "rgba(45,45,45,0.9)",
              padding: "25px",
              borderRadius: "15px",
              border: "2px solid #444",
            }}
          >
            <h3
              style={{
                textAlign: "center",
                marginBottom: "20px",
                color: "#dc2626",
              }}
            >
              Authorization Status
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {pieData.map((entry, idx) => (
                    <Cell key={idx} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#2d2d2d",
                    border: "1px solid #444",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div
            style={{
              background: "rgba(45,45,45,0.9)",
              padding: "25px",
              borderRadius: "15px",
              border: "2px solid #444",
            }}
          >
            <h3
              style={{
                textAlign: "center",
                marginBottom: "20px",
                color: "#dc2626",
              }}
            >
              Drone Altitudes
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="name" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#2d2d2d",
                    border: "1px solid #444",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="altitude">
                  {barData.map((entry, idx) => (
                    <Cell
                      key={idx}
                      fill={entry.authorized ? "#22c55e" : "#ef4444"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div
          style={{
            background: "rgba(45,45,45,0.9)",
            padding: "25px",
            borderRadius: "15px",
            border: "2px solid #444",
            marginBottom: "30px",
          }}
        >
          <h3
            style={{
              textAlign: "center",
              marginBottom: "20px",
              color: "#dc2626",
            }}
          >
            Altitude Over Time
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={altitudeHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="time" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#2d2d2d",
                  border: "1px solid #444",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="altitude"
                stroke="#dc2626"
                strokeWidth={3}
                dot={{ fill: "#dc2626", strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div
          style={{
            background: "rgba(45,45,45,0.9)",
            padding: "25px",
            borderRadius: "15px",
            border: "2px solid #444",
          }}
        >
          <h3
            style={{
              textAlign: "center",
              marginBottom: "20px",
              color: "#dc2626",
            }}
          >
            Active Drones
          </h3>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #dc2626" }}>
                  {[
                    "Status",
                    "Registration",
                    "Type",
                    "Altitude (m)",
                    "Pilot",
                    "Organization",
                    "Yaw",
                  ].map((th, idx) => (
                    <th
                      key={idx}
                      style={{ padding: "12px", textAlign: "right" }}
                    >
                      {th}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {drones.slice(-10).map((d, idx) => (
                  <tr
                    key={idx}
                    style={{
                      borderBottom: "1px solid #444",
                      backgroundColor:
                        idx % 2 === 0 ? "rgba(0,0,0,0.2)" : "transparent",
                    }}
                  >
                    <td style={{ padding: "12px", textAlign: "center" }}>
                      <span
                        style={{
                          background: isAllowed(d.registration)
                            ? "#22c55e"
                            : "#ef4444",
                          color: "white",
                          padding: "4px 8px",
                          borderRadius: "12px",
                          fontSize: "12px",
                        }}
                      >
                        {isAllowed(d.registration)
                          ? "Authorized"
                          : "Unauthorized"}
                      </span>
                    </td>
                    <td style={{ padding: "12px", fontWeight: "bold" }}>
                      {d.registration}
                    </td>
                    <td style={{ padding: "12px" }}>{d.name}</td>
                    <td style={{ padding: "12px", textAlign: "center" }}>
                      {d.altitude}
                    </td>
                    <td style={{ padding: "12px" }}>{d.pilot}</td>
                    <td style={{ padding: "12px" }}>{d.organization}</td>
                    <td style={{ padding: "12px", textAlign: "center" }}>
                      {d.yaw}°
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div
          style={{
            textAlign: "center",
            padding: "20px",
            background: "rgba(45,45,45,0.5)",
            borderRadius: "10px",
            marginTop: "20px",
          }}
        >
          <p style={{ color: "#888" }}>
            Last update: {new Date().toLocaleTimeString("en-US")} | Auto-updates
            from server
          </p>
        </div>
      </div>
    </div>
  );
};

export default DroneDashboard;
