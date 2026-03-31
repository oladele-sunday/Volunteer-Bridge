import User from "../models/Admin.js";
import Project from "../models/Project.js";
import Task from "../models/Task.js";


/*Volunteer statistics*/

export const getVolunteerReport = async () => {

    const totalVolunteers = await User.count({
        where: { role: "volunteer" }
    });

    const activeVolunteers = await User.count({
        where: {
            role: "volunteer",
            status: "active"
        }
    });

    return {
        totalVolunteers,
        activeVolunteers
    };
};


/*Project report*/

export const getProjectReport = async () => {

    const totalProjects = await Project.count();

    const completedProjects = await Project.count({
        where: { status: "completed" }
    });

    const activeProjects = await Project.count({
        where: { status: "active" }
    });

    return {
        totalProjects,
        completedProjects,
        activeProjects
    };
};


/*Task report*/

export const getTaskReport = async () => {

    const totalTasks = await Task.count();

    const completedTasks = await Task.count({
        where: { status: "completed" }
    });

    const pendingTasks = await Task.count({
        where: { status: "pending" }
    });

    return {
        totalTasks,
        completedTasks,
        pendingTasks
    };
};


/*Full system report*/


export const getSystemReport = async () => {

    const volunteerReport = await getVolunteerReport();
    const projectReport = await getProjectReport();
    const taskReport = await getTaskReport();

    return {
        volunteers: volunteerReport,
        projects: projectReport,
        tasks: taskReport
    };
};