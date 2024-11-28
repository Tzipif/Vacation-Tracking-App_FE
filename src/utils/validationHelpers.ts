import { userType } from "../types/userType";
import { vacationType } from "../types/vocationType";

export function validateVacationForm(data: vacationType) {
    const errors: string[] = [];
    const today = new Date().toISOString().split("T")[0];

    if (!data.description || data.description.length > 1000) {
        errors.push("Description must not be empty and cannot exceed 1000 characters.");
    }

    if (!data.destination || data.destination.length > 225) {
        errors.push("Destination must not be empty and cannot exceed 225 characters.");
    }

    
    if (!data.end_vocation || !data.start_vocation) {
        errors.push("Date is required.");
    }

    if (data.end_vocation < data.start_vocation)errors.push("End date cannot be earlier than start date.");

    if (data.start_vocation < today)errors.push("Start date cannot be in the past.");

    if (data.end_vocation < today)errors.push("End date cannot be in the past.");

    if (data.price < 0) {
        errors.push("Price cannot be negative.");
    } else if (!data.price || data.price > 10000) {
        errors.push("Price cannot exceed 10,000.");
    }

    if (!data.url_image) {
        errors.push("An image file must be provided.");
    } else if (typeof data.url_image !== 'string') {
        const fileExtension = (data.url_image as File).name.split('.').pop()?.toLowerCase();
        if (fileExtension !== 'jpg' && fileExtension !== 'png') {
            errors.push("The image must be a file of type JPG or PNG.");
        }
    }

    return errors;
}

export function validateLogInForm(data: userType) {

    const errors: string[] = [];

    if (!data.email)errors.push("Email is required.");
    if (!data.password)errors.push("Password is required.");

    if (data.password && data.password.length < 4)errors.push("Password must be at least 4 characters long.");
    if (data.email && !/\S+@\S+\.\S+/.test(data.email)) errors.push("Invalid email format.");

    return errors
}

export function validateRegisterForm(data: userType) {

    const errors: string[] = [];

    if (!data.email)errors.push("Email is required.");
    if (!data.password)errors.push("Password is required.");
    if (!data.first_name)errors.push("First name is required.");
    if (!data.last_name)errors.push("Last name is required.");

    if (data.password && data.password.length < 4)errors.push("Password must be at least 4 characters long.");
    if (data.email && !/\S+@\S+\.\S+/.test(data.email)) errors.push("Invalid email format.");

    return errors
}

