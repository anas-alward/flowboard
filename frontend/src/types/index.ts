export interface User {
    id: string;
    email: string;
    username?: string;
}

export interface Member {
    user: User;
    role: string;
}

export interface Task {
    id: string;
    projectId: string;
    title: string;
    description: string;
    status: 'TODO' | 'IN_PROGRESS' | 'DONE';
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
    type: 'TASK' | 'BUG' | 'FEATURE' | 'IMPROVEMENT' | 'OTHER';
    assignee?: User;
    due_date: string;
}

export interface Project {
    id: string;
    name: string;
    description: string;
    status: 'PLANNING' | 'ACTIVE' | 'ON_HOLD' | 'COMPLETED' | 'CANCELLED';
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
    progress: number;
    members: Member[];
    tasks: Task[];
    start_date?: string;
    end_date?: string;
}

export interface Workspace {
    id: string;
    name: string;
    members: Member[];
    projects: Project[];
}
