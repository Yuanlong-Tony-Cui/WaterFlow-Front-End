export interface Schedule {
    day: string;
    startTime: string;
    endTime: string;
}

export interface Course {
    code: string;
    name: string;
    description?: string;
    instructors?: string[];
    location?: string;
    startDate: string;
    endDate: string;
    schedule: Schedule[];
    capacity: number;
    registeredStudents?: string[];
}
  