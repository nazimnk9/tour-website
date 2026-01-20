import { API_BASE_URL } from "./authService";

export interface TourImage {
    id: number;
    file: string;
    status: string;
}

export interface TourLocation {
    id: number;
    name: string;
    description: string;
    created_at: string;
}

export interface TourPlan {
    id: number;
    locations: TourLocation[];
    images: TourImage[];
    title: string;
    description: string;
    max_adults: number;
    price_adult: string;
    adult_age_min: number;
    adult_age_max: number;
    max_children: number;
    price_child: string;
    child_age_min: number;
    child_age_max: number;
    max_infants: number;
    price_infant: string;
    infant_age_min: number;
    infant_age_max: number;
    status: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface TourPlanResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: TourPlan[];
}

export async function getTourPlans(page: number = 1): Promise<TourPlanResponse> {
    const response = await fetch(`${API_BASE_URL}/tour/plan/?page=${page}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to fetch tour plans");
    }

    return response.json();
}

export async function getTourById(id: number | string): Promise<TourPlan> {
    const response = await fetch(`${API_BASE_URL}/tour/plan/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to fetch tour details");
    }

    return response.json();
}

export interface TourDate {
    id: number;
    date: string;
    is_active: boolean;
    created_at: string;
    tour_plan: number;
}

export interface TourDateResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: TourDate[];
}

export async function getTourDates(tourId: number | string): Promise<TourDateResponse> {
    const response = await fetch(`${API_BASE_URL}/tour/plan/date/${tourId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to fetch tour dates");
    }

    return response.json();
}

export interface TourTimeSlot {
    id: number;
    start_time: string;
    end_time: string;
    available_adults: number;
    available_children: number;
    available_infants: number;
    available_youth: number;
    available_student_eu: number;
    is_active: boolean;
    created_at: string;
    tour_date: number;
}

export interface TourTimeSlotResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: TourTimeSlot[];
}

export async function getTourTimeSlots(tourDateId: number | string): Promise<TourTimeSlotResponse> {
    const response = await fetch(`${API_BASE_URL}/tour/plan/date/time/${tourDateId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to fetch tour time slots");
    }

    return response.json();
}

export interface AddToCartPayload {
    num_adults: number;
    num_children: number;
    num_infants: number;
    num_youth: number;
    num_student_eu: number;
    tour_plan: number;
    time_slot: number;
}

export interface AddToCartResponse {
    id: number;
    num_adults: number;
    num_children: number;
    num_infants: number;
    item_price: number;
    num_youth: number;
    num_student_eu: number;
    created_at: string;
    updated_at: string;
    user: number;
    tour_plan: number;
    time_slot: number;
}

export async function addToCart(payload: AddToCartPayload): Promise<AddToCartResponse> {
    const response = await fetch(`${API_BASE_URL}/tour/cart/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to add item to cart");
    }

    return response.json();
}

export interface CartItem {
    id: number;
    num_adults: number;
    num_children: number;
    num_infants: number;
    item_price: string;
    num_youth: number;
    num_student_eu: number;
    created_at: string;
    updated_at: string;
    user: number | null;
    tour_plan: number;
    time_slot: number;
}

export interface CartResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: CartItem[];
}

export interface TravelerDetail {
    name: string;
    email: string;
}

export interface SingleItemPayload {
    num_adults: number;
    num_children: number;
    num_infants: number;
    num_youth: number;
    num_student_eu: number;
    tour_plan: number;
    time_slot: number;
}

export interface BookingPayload {
    cart_item_ids?: number[]; // Array of integers, optional for book now
    book_now?: string; // "true"
    single_item?: SingleItemPayload;
    traveler_details: TravelerDetail[];
    full_name?: string;
    email?: string;
    country?: string;
    phone?: string;
}

export async function createBooking(payload: BookingPayload, token?: string): Promise<any> {
    const headers: HeadersInit = {
        "Content-Type": "application/json",
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/tour/booking/`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to create booking");
    }

    return response.json();
}

export async function getCart(cartIds: number[]): Promise<CartResponse> {
    const idsParam = cartIds.join(",");
    const response = await fetch(`${API_BASE_URL}/tour/cart/?cart_ids=${idsParam}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to fetch cart items");
    }

    return response.json();
}

export async function getCartItem(id: number): Promise<CartItem> {
    const response = await fetch(`${API_BASE_URL}/tour/cart/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to fetch cart item");
    }

    return response.json();
}

export async function updateCartItem(id: number, payload: Partial<AddToCartPayload>): Promise<CartItem> {
    const response = await fetch(`${API_BASE_URL}/tour/cart/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to update cart item");
    }

    return response.json();
}

export async function deleteCartItem(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/tour/cart/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to delete cart item");
    }
}


export async function getRecommendedTours(id: number | string): Promise<TourPlanResponse> {
    const response = await fetch(`${API_BASE_URL}/tour/plan/recomended/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to fetch recommended tours");
    }

    return response.json();
}
