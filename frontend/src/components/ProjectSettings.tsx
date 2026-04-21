import React from "react";
import { Settings, Shield, Trash2, UserPlus, Users } from "lucide-react";
import type { Project } from "../types";

interface ProjectSettingsProps {
    project: Project;
}

const ProjectSettings: React.FC<ProjectSettingsProps> = ({ project }) => {

    const sections = [
        {
            title: "General",
            icon: <Settings className="size-5" />,
            description: "Update project name, description and basic settings",
            action: "Manage",
            variant: "default",
        },
        {
            title: "Team Members",
            icon: <Users className="size-5" />,
            description: "Manage who has access to this project",
            action: "Manage Members",
            variant: "default",
        },
        {
            title: "Permissions",
            icon: <Shield className="size-5" />,
            description: "Control what members can see and do",
            action: "Edit Roles",
            variant: "default",
        },
        {
            title: "Danger Zone",
            icon: <Trash2 className="size-5" />,
            description: "Permanently delete this project and all its data",
            action: "Delete Project",
            variant: "danger",
        },
    ];

    return (
        <div className="max-w-3xl space-y-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Project Settings</h2>
                    <p className="text-zinc-500 dark:text-zinc-400">Manage your project preferences and team</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition duration-200">
                    <UserPlus className="size-4" /> Add Member
                </button>
            </div>

            <div className="space-y-4">
                {sections.map((section, i) => (
                    <div key={i} className="flex items-center justify-between p-6 not-dark:bg-white dark:bg-gradient-to-br dark:from-zinc-800/70 dark:to-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-lg group" >
                        <div className="flex gap-4">
                            <div className={`p-2 rounded-md h-fit ${section.variant === "danger" ? "bg-red-200 text-red-600 dark:bg-red-500/10 dark:text-red-400" : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 group-hover:bg-blue-500/10 group-hover:text-blue-500"}`} >
                                {section.icon}
                            </div>
                            <div>
                                <h3 className="font-medium text-zinc-900 dark:text-white">{section.title}</h3>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400">{section.description}</p>
                            </div>
                        </div>
                        <button className={`px-4 py-2 rounded-md text-sm font-medium border transition duration-200 ${section.variant === "danger" ? "border-red-200 text-red-600 hover:bg-red-600 hover:text-white dark:border-red-500/20 dark:hover:bg-red-500/20" : "border-zinc-200 text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"}`} >
                            {section.action}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectSettings;
