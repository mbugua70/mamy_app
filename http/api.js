import AsyncStorage from "@react-native-async-storage/async-storage";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

// login fun
export async function LoginHander({ name, password }) {
  if (!name || !password) {
    throw new Error("No username and password provided!");
  }

  const userData = {
    username: name,
    password: password,
  };
   const formData = new FormData()
  // const encodedDat = new URLSearchParams(userData).toString();

  formData.append("username", userData.username)
  formData.append("password", userData.password)

  const res = await fetch("https://iguru.co.ke/skope_api/login.php", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  if (res.ok) {
    return data;
  } else {
    throw {
      message: data || "Submission failed.",
      statusText: res.statusText,
      status: res.status,
    };
  }
}

// summary func
export async function SummaryForm(recordData) {
  const {sales, location, corporate, staff, person, insurance } = recordData;
  const token = await AsyncStorage.getItem("token");
  if (!token) {
    throw new Error("No token found in AsyncStorage.");
  }

  let user;
  try {
    user = JSON.parse(token);
  } catch (error) {
    throw new Error("Failed to parse token.");
  }

  const nameEl = user?.name || "Unknown";
  const PhoneEl = user?.phone || "Unknown";
  const locationsEl = user?.region || "Unknown";

  const formData = new FormData();
  formData.append("place", "Corporate Mapping");
  formData.append("ba_name", nameEl);
  formData.append("ba_phone", PhoneEl);
  formData.append("ba_region", locationsEl);
  formData.append("sub_1_1", location);
  formData.append("sub_1_2", sales)
  formData.append("sub_1_3", corporate);
  formData.append("sub_1_4", insurance);
  formData.append("sub_1_5", person);
  formData.append("sub_1_6", staff);
  // formData.append("sub_1_7", frequency);
  // formData.append("sub_1_8", purchase);
  // formData.append("sub_1_9", variant);
  // formData.append("sub_1_10", sku);
  // formData.append("sub_1_11", pricing);
  // formData.append("sub_1_12", feedback);
  // formData.append("sub_1_13", lat ?? "0");
  // formData.append("sub_1_14", long ?? "0");

  const res = await fetch("https://iguru.co.ke/skope_api/BM.php", {
    method: "POST",
    body: formData,
  });

  const data = await res.text(); // Handle as plain text
  if (res.ok) {
    return data;
  } else {
    throw {
      message: data || "Submission failed.",
      statusText: res.statusText,
      status: res.status,
    };
  }
}

// func summarytwo
export async function SummaryFormTwo(recordData) {
  const { corporateName, appointmentdate, appointmenttime } = recordData;

  console.log(corporateName, appointmentdate, appointmenttime )

  const token = await AsyncStorage.getItem("token");
  if (!token) {
    throw new Error("No token found in AsyncStorage.");
  }

  let user;
  try {
    user = JSON.parse(token);
  } catch (error) {
    throw new Error("Failed to parse token.");
  }

  const nameEl = user?.name || "Unknown";
  const PhoneEl = user?.phone || "Unknown";
  const locationsEl = user?.region || "Unknown";

  const formData = new FormData();
  formData.append("place", "Corporate Meetings Booked");
  formData.append("ba_name", nameEl);
  formData.append("ba_phone", PhoneEl);
  formData.append("ba_region", locationsEl);
  formData.append("sub_1_3", corporateName);
  formData.append("sub_1_4", appointmentdate);
  formData.append("sub_1_5", appointmenttime);
  // formData.append("sub_1_4", );
  // formData.append("sub_1_5", );
  // formData.append("sub_1_7", frequency);
  // formData.append("sub_1_8", purchase);
  // formData.append("sub_1_9", variant);
  // formData.append("sub_1_10", sku);
  // formData.append("sub_1_11", pricing);
  // formData.append("sub_1_12", feedback);
  // formData.append("sub_1_13", lat ?? "0");
  // formData.append("sub_1_14", long ?? "0");

  const res = await fetch("https://iguru.co.ke/skope_api/BM.php", {
    method: "POST",
    body: formData,
  });

  const data = await res.text(); // Handle as plain text
  if (res.ok) {
    return data;
  } else {
    throw {
      message: data || "Submission failed.",
      statusText: res.statusText,
      status: res.status,
    };
  }
}

export async function SummaryFormThree(recordData) {
  const {
    corporateName,
    appointmentdate,
    appointmenttime,
  } = recordData;

  const token = await AsyncStorage.getItem("token");
  if (!token) {
    throw new Error("No token found in AsyncStorage.");
  }

  let user;
  try {
    user = JSON.parse(token);
  } catch (error) {
    throw new Error("Failed to parse token.");
  }

  const nameEl = user?.name || "Unknown";
  const PhoneEl = user?.phone || "Unknown";
  const locationsEl = user?.region || "Unknown";

  const formData = new FormData();
  formData.append("place", "Eye Clinics Booked");
  formData.append("ba_name", nameEl);
  formData.append("ba_phone", PhoneEl);
  formData.append("ba_region", locationsEl);
  formData.append("sub_1_3", corporateName);
  formData.append("sub_1_5", appointmentdate);
  formData.append("sub_1_6", appointmenttime);
  // formData.append("sub_1_7", frequency);
  // formData.append("sub_1_8", purchase);
  // formData.append("sub_1_9", variant);
  // formData.append("sub_1_10", sku);
  // formData.append("sub_1_11", pricing);
  // formData.append("sub_1_12", feedback);
  // formData.append("sub_1_13", lat ?? "0");
  // formData.append("sub_1_14", long ?? "0");

  const res = await fetch("https://iguru.co.ke/skope_api/BM.php", {
    method: "POST",
    body: formData,
  });

  const data = await res.text(); // Handle as plain text
  if (res.ok) {
    return data;
  } else {
    throw {
      message: data || "Submission failed.",
      statusText: res.statusText,
      status: res.status,
    };
  }
}

export async function SummaryFormFour(recordData) {
  const {
      corporateName,
      designation,
      person,
      date,
      time,
      talked,
      coupons,
      feedback,
  } = recordData;

  const token = await AsyncStorage.getItem("token");
  if (!token) {
    throw new Error("No token found in AsyncStorage.");
  }

  let user;
  try {
    user = JSON.parse(token);
  } catch (error) {
    throw new Error("Failed to parse token.");
  }

  const nameEl = user?.name || "Unknown";
  const PhoneEl = user?.phone || "Unknown";
  const locationsEl = user?.region || "Unknown";

  const formData = new FormData();
  formData.append("place", "Meetings Outcome");
  formData.append("ba_name", nameEl);
  formData.append("ba_phone", PhoneEl);
  formData.append("ba_region", locationsEl);
  formData.append("sub_1_2", corporateName);
  formData.append("sub_1_5", person)
  formData.append("sub_1_6", designation);
  formData.append("sub_1_7", date);
  formData.append("sub_1_8", time);
  formData.append("sub_1_9", talked);
  formData.append("sub_1_10", coupons);
  formData.append("sub_1_11", feedback);
  // formData.append("sub_1_9", talked);
  // formData.append("sub_1_10", coupons);
  // formData.append("sub_1_11", feedback);
  // formData.append("sub_1_12", feedback);
  // formData.append("sub_1_13", lat ?? "0");
  // formData.append("sub_1_14", long ?? "0");


  const res = await fetch("https://iguru.co.ke/skope_api/BM.php", {
    method: "POST",
    body: formData,
  });

  const data = await res.text(); // Handle as plain text
  if (res.ok) {
    return data;
  } else {
    throw {
      message: data || "Submission failed.",
      statusText: res.statusText,
      status: res.status,
    };
  }
}

export async function fetchRecordData(phone) {
  const baPhone = {
    ba_phone: phone,
  };

  const encodedDat = new URLSearchParams(baPhone).toString();

  try {
    const response = await fetch(`https://iguru.co.ke/coke/api/REPORT.php/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: encodedDat,
    });

    if (!response.ok) {
      throw new Error("Failed to fetch package data");
    }
    const data = await response.text();
    return data;
  } catch (error) {
    console.log("Error found");
    console.error("Error fetching package data:", error);
    return error;
  }
}




/**
 *
 *
 * @export
 * @param {*} query
 * @return {data}
 * query to fetch corporate names
 */
export async function fetchRecordDataSearch(query) {
  const corporateName = {
    corporate: query,
  };

  const encodedDat = new URLSearchParams(corporateName).toString();

  try {
    const response = await fetch(`https://iguru.co.ke/skope_api/corporates.php`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: encodedDat,
    });

    if (!response.ok) {
      throw new Error("Failed to fetch package data");
    }
    const data = await response.text();
    return data;
  } catch (error) {
    console.log("Error found");
    console.error("Error fetching package data:", error);
    return error;
  }
}
