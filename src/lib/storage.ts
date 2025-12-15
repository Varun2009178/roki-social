
import fs from 'fs';
import path from 'path';

// Simple file-based storage for MVP
const DB_PATH = path.join(process.cwd(), 'data');
const GROUPS_FILE = path.join(DB_PATH, 'groups.json');

// Ensure data directory exists
if (!fs.existsSync(DB_PATH)) {
    fs.mkdirSync(DB_PATH, { recursive: true });
}

// Interfaces
export interface Group {
    id: string;
    name: string;
    code: string; // Unique 4-digit code for SMS binding
    members: string[]; // List of phone numbers
    createdAt: string;
    status: 'pending' | 'active';
    goal?: string;
    deadline?: string;
}

// Helpers
function readGroups(): Group[] {
    if (!fs.existsSync(GROUPS_FILE)) return [];
    const data = fs.readFileSync(GROUPS_FILE, 'utf-8');
    try {
        return JSON.parse(data);
    } catch (e) {
        return [];
    }
}

function writeGroups(groups: Group[]) {
    fs.writeFileSync(GROUPS_FILE, JSON.stringify(groups, null, 2));
}

// API
export const db = {
    groups: {
        create: (name: string) => {
            const groups = readGroups();

            // Generate a unique 4 digit code
            let code: string;
            do {
                code = Math.floor(1000 + Math.random() * 9000).toString();
            } while (groups.find(g => g.code === code));

            const newGroup: Group = {
                id: Math.random().toString(36).substring(2, 10),
                name,
                code,
                members: [],
                createdAt: new Date().toISOString(),
                status: 'pending'
            };

            groups.push(newGroup);
            writeGroups(groups);
            return newGroup;
        },

        findByCode: (code: string) => {
            const groups = readGroups();
            return groups.find(g => g.code === code);
        },

        list: () => {
            return readGroups();
        },

        update: (id: string, updates: Partial<Group>) => {
            const groups = readGroups();
            const index = groups.findIndex(g => g.id === id);
            if (index !== -1) {
                groups[index] = { ...groups[index], ...updates };
                writeGroups(groups);
                return groups[index];
            }
            return null;
        }
    }
};
