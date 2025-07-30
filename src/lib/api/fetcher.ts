export const fetcher = {
  get: async (uri: string) => {
    try {
      const res = await fetch(uri, { method: "GET" });

      return res.json();
    } catch (error: any) {
      console.error(error); // TODO: add some nice error handling like Toast display
    }
  },
  post: async (uri: string, body?: BodyInit) => {
    try {
      const res = await fetch(uri, { method: "POST", body });

      return res.json();
    } catch (error: any) {
      console.error(error); // TODO: add some nice error handling like Toast display
    }
  },
  put: async (uri: string, body?: BodyInit) => {
    try {
      const res = await fetch(uri, { method: "PUT", body });

      return res.json();
    } catch (error: any) {
      console.error(error); // TODO: add some nice error handling like Toast display
    }
  },
  delete: async (uri: string, body?: BodyInit) => {
    try {
      const res = await fetch(uri, { method: "DELETE", body });

      return res.json();
    } catch (error: any) {
      console.error(error); // TODO: add some nice error handling like Toast display
    }
  },
};
