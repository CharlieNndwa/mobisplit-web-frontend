export const apiRequest = async (endpoint, options = {}) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  
  let token = null;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  const response = await fetch(`${baseUrl}${endpoint}`, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP execution fault: Status ${response.status}`);
  }

  return response.json();
};