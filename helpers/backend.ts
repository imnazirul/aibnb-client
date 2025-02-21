import { del, get, patch, post, postForm, patchForm, put } from "./api";

export const sendOtp = (data) => post("/auth/code", data);
export const postRegister = (data) => post("/auth/register", data);
export const postLogin = (data) => post("/auth/login", data);
export const postVerifyOtp = (data) => post("/auth/verify-otp", data);
export const postResetPassword = (data) => post("/auth/reset-password", data);
export const postChangePassword = (data) => post("/auth/password", data);
export const findUser = (data) => get("/auth/exists", data);

export const fetchUser = (data: any) => get("/auth/profile", data);
export const updateUser = (data) => patch("/auth/profile", data);



export const postHostInfo = (data) => postForm("/host/info", data);

export const fetchSettings = (data) => get("/settings", data);
export const postSettings = (data) => postForm("/settings", data);


export const fetchBookings = (data) => get("/booking/list", data);
export const fetchBooking = (data) => get("/booking/:uid", data);
export const postBookingIdent = (data) => post("/booking/ident", data);
export const postBooking = (data) => post("/booking", data);
export const patchBooking = (data) => patch("/booking/:uid", data);

export const fetchFindProperty = (data) => get("/property/find", data);
export const fetchPropertyFilters = (data) => get("/property/filters", data);

export const fetchPropertyElements = (data) => get("/property/elements", data);

export const fetchProperties = (data) => get("/property/list", data);
export const fetchPropertyCalendar = (data) => get("/property/calendar/:uid", data);
export const fetchProperty = (data) => get("/property/:uid", data);
export const postProperty = (data) => postForm("/property", data);
export const patchProperty = (data) => patchForm("/property/:uid", data);
export const deleteProperty = (data) => del("/property", data);

export const postPropertyApproval = (data) => post("/property/approve/:uid", data);
export const postPropertyRejection = (data) => post("/property/reject/:uid", data);

export const fetchPropertyCategories = (data) => get("/property/category/list", data);
export const fetchPropertyCategory = (data) => get("/property/category/:uid", data);
export const postPropertyCategory = (data) => postForm("/property/category", data);
export const patchPropertyCategory = (data) => patchForm("/property/category/:uid", data);
export const delPropertyCategory = (data) => del("/property/category/:uid", data);

export const fetchPropertyTags = (data) => get("/property/tag/list", data);
export const fetchPropertyTag = (data) => get("/property/tag/:uid", data);
export const postPropertyTag = (data) => postForm("/property/tag", data);
export const patchPropertyTag = (data) => patchForm("/property/tag/:uid", data);
export const delPropertyTag = (data) => del("/property/tag/:uid", data);

export const fetchPropertyFeatures = (data) => get("/property/feature/list", data);
export const fetchPropertyFeature = (data) => get("/property/feature/:uid", data);
export const postPropertyFeature = (data) => postForm("/property/feature", data);
export const patchPropertyFeature = (data) => patchForm("/property/feature/:uid", data);
export const delPropertyFeature = (data) => del("/property/feature/:uid", data);


export const fetchHosts = (data) => get("/host/list", data);
export const fetchHost = (data) => get("/host/:uid", data);

export const postHostApproval = (data) => post("/host/approve/:uid", data);
export const postHostRejection = (data) => post("/host/reject/:uid", data);



export const fetchAmenities = (data) => get("/amenity/list", data);
export const fetchAmenity = (data) => get("/amenity/:uid", data);
export const postAmenity = (data) => postForm("/amenity", data);
export const patchAmenity = (data) => patchForm("/amenity/:uid", data);
export const delAmenity = (data) => del("/amenity", data);

export const fetchAmenityCategories = (data) => get("/amenity/category/list", data);
export const fetchAmenityCategory = (data) => get("/amenity/category/:uid", data);
export const postAmenityCategory = (data) => postForm("/amenity/category", data);
export const patchAmenityCategory = (data) => patchForm("/amenity/category/:uid", data);
export const delAmenityCategory = (data) => del("/amenity/category/:uid", data);