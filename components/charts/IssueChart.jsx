"use client";
import { Card, Container } from "react-bootstrap";

const {
  ResponsiveContainer,
  XAxis,
  BarChart,
  YAxis,
  Bar,
} = require("recharts");

const IssueChart = ({ bg, stats }) => {
  const data = [
    { label: "Open", value: stats?.open || 0, title: "Opened Issues" },
    {
      label: "In Progress",
      value: stats?.inProgress || 0,
      title: "In progress Issues",
    },
    { label: "Closed", value: stats?.closed || 0, title: "Closed Issues" },
  ];

  return (
    <Container className="d-flex flex-column gap-3" fluid>
      <div className="d-flex gap-3">
        {data.map((item, index) => (
          <Card key={index} className="p-2 small">
            <span style={{ fontWeight: "600" }}>{item.title}</span>
            <h4 style={{ color: bg, fontWeight: "bold" }}>{item.value}</h4>
          </Card>
        ))}
      </div>
      <Card className="py-3">
        <ResponsiveContainer
          width="100%"
          height={350}
          style={{ marginLeft: "-20px" }}
        >
          <BarChart data={data}>
            <XAxis dataKey="label" />
            <YAxis />
            <Bar dataKey="value" barSize={50} style={{ fill: bg }} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </Container>
  );
};

export default IssueChart;
