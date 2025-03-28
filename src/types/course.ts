export interface Timeslot {
    day: string;
    startTime: string;
    endTime: string;
}

export interface MakeupLecture {
    date: string;  // stored as "YYYY-MM-DD"
    startTime: string; // "10:00 AM" or "14:30"
    endTime: string;   // "12:00 PM" or "16:00"
}
  
export interface Course {
    _id: string;
    code: string;
    name: string;
    location?: string;
    startDate: string;
    endDate: string;
    capacity: number;
    instructor: string;
    description?: string;
    schedule: Timeslot[];
    registeredStudents?: string[];
    makeupLectures?: MakeupLecture[];
    noClassDates?: string[];
}
  