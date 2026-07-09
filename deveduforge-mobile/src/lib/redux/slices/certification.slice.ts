import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Certification {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  price?: number;
  duration?: string;
  level?: string;
}

interface CertificationState {
  certifications: Certification[];
  lastFetched: number | null;
}

const initialState: CertificationState = {
  certifications: [],
  lastFetched: null,
};

const certificationSlice = createSlice({
  name: 'certification',
  initialState,
  reducers: {
    setCertifications(state, action: PayloadAction<Certification[]>) {
      state.certifications = action.payload;
      state.lastFetched = Date.now();
    },
    clearCertifications(state) {
      state.certifications = [];
      state.lastFetched = null;
    },
  },
});

export const { setCertifications, clearCertifications } = certificationSlice.actions;
export default certificationSlice.reducer;
