"use client";
export const customFetch = async (route, method, body) => {
  const response = await fetch("/api/" + route, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  if (response.status == 500) {
    alert(data.msg);
    return { status: response.status, data: null };
  }
  return { status: response.status, data };
};
