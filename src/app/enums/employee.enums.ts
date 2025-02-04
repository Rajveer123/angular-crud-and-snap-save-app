export enum DepartmentType {
    SELECT_DEPARTMENT = '-- Select Department --',
    IT_TECHNOLOGY = 'It Technology',
    FINANCE = 'Finance',
    HR = 'Human Resources',
    MANAGEMENT = 'Management'
}
export const DepartmentTypeToNameMapping: Record<DepartmentType, string> = {
    [DepartmentType.SELECT_DEPARTMENT]: "-- Select Department --",
    [DepartmentType.IT_TECHNOLOGY]: "It Technology",
    [DepartmentType.FINANCE]: "Finance",
    [DepartmentType.HR]: "Human Resources",
    [DepartmentType.MANAGEMENT]: "Management",
};
