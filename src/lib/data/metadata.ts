/*
 * @title: App Metadata
 * @path: src/lib/data/metadata.ts
 * @description: App metadata
 */

import { HeaderNavItemsType } from "@/types/types";

const SaturnEmoji = '🪐'; 
const ChallengeEmoji = '🏆'; 
const BookIcon = '📚'; 
const MapEmoji = '🗺️'; 


export const HeaderNavItems: HeaderNavItemsType[] = [
    { value: "megaverse", icon: SaturnEmoji, label: "Megaverse" },
    { value: "challenge", icon: ChallengeEmoji, label: "Challenge" , external: "https://challenge.crossmint.com/"},
    { value: "documentation", icon: BookIcon, label: "Documentation", external: "https://challenge.crossmint.com/documentation" },
    { value: "map", icon: MapEmoji, label: "Map", external: "https://challenge.crossmint.com/map" },
];

export const polyanetSolution = [
    [2, 2],
    [2, 8],
    [3, 3],
    [3, 7],
    [4, 4],
    [4, 6],
    [5, 5],
    [6, 4],
    [6, 6],
    [7, 3],
    [7, 7],
    [8, 2],
    [8, 8]
];

export const metaverseMap = {
    'SPACE': '🌌',
    'POLYANET': '🪐',
    'RIGHT_COMETH': '☄️',
    'UP_COMETH': '🔼',
    'LEFT_COMETH': '⬅️',
    'DOWN_COMETH': '🔽',
    'WHITE_SOLOON': '⚪️',
    'BLUE_SOLOON': '🔵',
    'RED_SOLOON': '🔴',
    'PURPLE_SOLOON': '🟣'
}