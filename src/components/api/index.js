import create from "zustand";
import { API } from "config/api";

export const useStore = create((set) => ({
  collection: [],
  loadingCollection: false,
  fetchError: false,
  fetchErrorMessage: "",
  fetchCollection: async () => {
    console.log("fetching collection....");
    const token = localStorage.getItem("token");
    set({ loadingCollection: true, fetchError: false });

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const res = await API.get(`mangas`, {
      headers: headers,
    });
    if (res.data) {
      set({ loadingCollection: false });
    }
    set({ collection: await res.data.data });
  },
  loading: false,
  removeCollection: () => set({ collection: [] }),
  isAuth: false,
  setAuthTrue: () => set({ isAuth: true }),
  setAuthFalse: () => set({ isAuth: false }),
  details: {},
  removeDetails: () => set({ details: [] }),
  fetchingSuccess: false,
  fetchDetails: async (id) => {
    console.log("fetcbing details.....");
    set({ loading: true });
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const res = await API.get(`/mangas/${id}`, {
      headers: headers,
    });
    if (res.data) {
      set({ loading: false });
    }
    set({ details: await res.data.data });
  },
  loadingUpdate: false,
  updateDataSuccess: false,
  updateData: async (id, payload) => {
    console.log("update data......");
    const token = localStorage.getItem("token");
    set({ loadingUpdate: true, updateDataSuccess: false });
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const res = await API.patch(`/mangas/${id}`, payload, {
      headers: headers,
    });
    if (res.data) {
      set({ loadingUpdate: false, updateDataSuccess: true });
    }
    set({ details: await res.data.data });
  },
  deleteDataSuccess: false,
  deleteData: async (id) => {
    set({ loading: true, deleteDataSuccess: false });
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const res = await API.delete(`mangas/${id}`, {
      headers: headers,
    });
    if (res.status === 200) {
      set({ loading: false, deleteDataSuccess: true, details: {} });
    }
  },
  addMangaSuccess: false,
  addMangaLoading: false,
  addManga: async (payload) => {
    console.log("add manga......");
    set({ addMangaLoading: true, addMangaSuccess: false });
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const res = await API.post(`/mangas`, payload, { headers: headers });
    if (res.data) {
      set({ addMangaLoading: false, addMangaSuccess: true });
    }
  },
}));
