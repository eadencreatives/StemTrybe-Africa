import { api } from "./api";

export async function getCourses() {
  const res = await api.get("/courses");
  return res.data;
}

export async function getCourse(id) {
  const res = await api.get(`/courses/${id}`);
  return res.data;
}

export async function createCourse(payload) {
  const res = await api.post(`/courses`, payload);
  return res.data;
}

export default { getCourses, getCourse, createCourse };
