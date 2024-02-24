export type Partner = {
    id: string;
    thumbnail: string;
    uri: string;
}

export type TeamMember = {
    id: string;
    name: string;
    linkedin: string;
    title: string;
    education: string;
    thumbnail: string;
    order_id: number;
}

export type TeamAdvisor = {
    id: string;
    name: string;
    linkedin: string;
    title: string;
    experiences: string[];
    thumbnail: string;
}