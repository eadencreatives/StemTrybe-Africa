import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getCourseById } from '../services/courses';
import { useAuth } from '../context/AuthContext';
import './ModulePage.css';

export default function ModulePage() {
  const { courseId
