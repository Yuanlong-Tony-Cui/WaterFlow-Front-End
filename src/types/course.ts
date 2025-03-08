export interface Timeslot {
    day: string;
    startTime: string;
    endTime: string;
}
  
export interface Course {
    code: string;
    name: string;
    location?: string;
    startDate: string;
    endDate: string;
    capacity: number;
    instructors?: string[];
    description?: string;
    schedule: Timeslot[];
    registeredStudents?: string[];
}
  