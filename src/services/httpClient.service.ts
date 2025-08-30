import { WDX_PUBLIC_KEY, BASE_URL, APPLICATION_ID, QUERY_ID } from "../config/config-env";

const apiRequestHandler = async ({
  name,
  email,
  phone,
}: {
  name: string;
  email: string;
  phone: string;
}) => {
  const headers = new Headers();
  headers.append("wdx-public-key", WDX_PUBLIC_KEY);
  headers.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    params: {
      uuid: "",
      email,
      name,
      phone,
    },
    context: {
      query_id: QUERY_ID,
      application_id: APPLICATION_ID,
    },
    control: {
      preprocess: {
        process: "preStandard",
        params: {},
      },
      postprocess: {
        process: "postStandard",
        params: {},
      },
    },
  });

  try {
    const response = await fetch(`${BASE_URL}/api/v1/datasource`, {
      method: "POST",
      headers,
      body: raw,
      redirect: "follow",
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, data };
    }

    return { success: true, data };
  } catch (err: any) {
    return { success: false, data: err.message || "Unexpected error" };
  }
};

export default apiRequestHandler;
