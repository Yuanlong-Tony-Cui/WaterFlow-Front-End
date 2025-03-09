export interface User {
    _id: string;
    role: "admin" | "student";
    name: string;
    email: string;
    password?: string;
    registeredCourses: string[]; // array of course IDs
}