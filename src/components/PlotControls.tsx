/**
 * @title Plot Controls
 * @fileoverview Plot controls component
 * @path /components/PlotControls.tsx
 */

import React, { useState } from 'react';
import { CurrentMapType } from '@/types/types';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getApiPath } from '@/utils/paths';
import { LoadingCircle } from './LoadingCircle';
import { compareMapWithGoal } from '@/utils/mapComparator';


interface PlotControlsProps {
    phase: number;
    currentMapData: CurrentMapType;
    updateCurrentMap: (newMap: CurrentMapType) => void;
    row: number;
    column: number;
}

export const PlotControls: React.FC<PlotControlsProps> = (props: PlotControlsProps) => {
    const [error, setError] = useState<string | null>(null);

    const addEmoji = async (row: number, column: number, emojiType: string) => {
        try {
            console.log('Attempting to add emoji:', { row, column, emojiType });

            const response = await fetch('/api/current', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ row, column, emojiType })
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error response:', {
                    status: response.status,
                    statusText: response.statusText,
                    data: errorData
                });
                throw new Error(`HTTP error! status: ${response.status}, details: ${JSON.stringify(errorData)}`);
            }

            const responseData = await response.json();
            console.log('Success response:', responseData);
            return responseData;

        } catch (error) {
            console.error('Error adding emoji:', {
                error,
                stack: error instanceof Error ? error.stack : undefined
            });
            throw error;
        }
    };

    const handleDeleteEmoji = async ({emojiType}: {emojiType: string}) => {
        console.log("deleteEmoji", props.row, props.column);
        try {
            const updatedCurrentMapData = { ...props.currentMapData };
            if (updatedCurrentMapData.map.content) {
                updatedCurrentMapData.map.content[props.row][props.column] = 'SPACE'; // Replace with SPACE
                props.updateCurrentMap(updatedCurrentMapData as CurrentMapType);
                console.log("updatedCurrentMapData", updatedCurrentMapData);

                const response = await fetch(getApiPath('current'), {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                        _id: props.currentMapData.map._id,
                        content: updatedCurrentMapData.map.content,
                        candidateId: props.currentMapData.map.candidateId,
                        phase: props.currentMapData.map.phase,
                        __v: props.currentMapData.map.__v,
                        row: props.row,
                        column: props.column,
                        emojiType
                    })
                });

                const responseData = await response.json();
                console.log("response", responseData);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                console.log("Emoji Successfully Deleted");
            }
        } catch (error) {
            console.error('Error deleting Emoji:', error);
            setError('Failed to delete Emoji.');
        }
    };

    const handleAutoSync = async () => {
        try {
            setError(null);
            
            // Fetch goal map
            const goalResponse = await fetch(getApiPath('goal'));
            const goalData = await goalResponse.json();
            const goalMap = goalData.goal;

            // Get current map
            const currentMap = props.currentMapData.map.content;

            // Compare maps and get differences
            const differences = compareMapWithGoal(currentMap, goalMap);
            console.log('Differences to process:', differences);

            // Process each difference with delay to avoid rate limiting
            for (const diff of differences) {
                try {
                    let emojiType = '';
                    
                    if (diff.type === 'POLYANET') {
                        emojiType = 'POLYANET';
                    } else if (diff.type === 'SOLOON') {
                        emojiType = `${diff.color?.toUpperCase()}_SOLOON`;
                    } else if (diff.type === 'COMETH') {
                        emojiType = `${diff.direction?.toUpperCase()}_COMETH`;
                    }

                    await addEmoji(diff.row, diff.column, emojiType);
                    
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    
                } catch (error) {
                    console.error(`Error processing difference:`, error);
                    setError(`Failed to process some changes. Please try again.`);
                }
            }

        } catch (error) {
            console.error('Error in auto-sync:', error);
            setError('Failed to auto-sync with goal map');
        }
    };

    return (
        <div className="bg-white dark:bg-slate-900 p-4 rounded-lg shadow-md">
            {error && <div className="text-red-500 text-center">
                {error} <LoadingCircle message="Posting to Metaverse..." error={error} />
            </div>}
            <div className="flex flex-col items-center space-y-4">
                <div className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                    Set Row and Column
                </div>
                <div className="flex space-x-8">
                    {/* Left grid - Soloon buttons */}
                    {props.phase && (
                        <div className="flex flex-col space-y-4">
                            <div className="flex space-x-4">
                                <Button onClick={() => addEmoji(props.row, props.column, 'WHITE_SOLOON')} className=" h-10 bg-gradient-to-r from-green-600 to-purple-400 text-white hover:shadow-lg transition-shadow transform hover:scale-105 active:scale-95 active:shadow-inner transition-transform duration-200">
                                    Add <span style={{ filter: 'grayscale(100%)' }} className='relative left-1'>🌕</span>
                                </Button>
                                <Button onClick={() => addEmoji(props.row, props.column, 'BLUE_SOLOON')} className="h-10 bg-gradient-to-r from-green-600 to-purple-400 text-white hover:shadow-lg transition-shadow transform hover:scale-105 active:scale-95 active:shadow-inner transition-transform duration-200">
                                    Add <span style={{ filter: 'grayscale(100%) brightness(30%) sepia(100%) hue-rotate(-180deg) saturate(700%) contrast(0.8)' }} className='relative left-1'>🌕</span>
                                </Button>
                            </div>
                            <div className="flex space-x-4">
                                <Button onClick={() => addEmoji(props.row, props.column, 'RED_SOLOON')} className=" h-10 bg-gradient-to-r from-green-600 to-purple-400 text-white hover:shadow-lg transition-shadow transform hover:scale-105 active:scale-95 active:shadow-inner transition-transform duration-200">
                                    Add <span style={{ filter: 'grayscale(100%) brightness(40%) sepia(100%) hue-rotate(-50deg) saturate(600%) contrast(0.8)' }} className='relative left-1'>🌕</span>
                                </Button>
                                <Button onClick={() => addEmoji(props.row, props.column, 'PURPLE_SOLOON')} className=" h-10 bg-gradient-to-r from-green-600 to-purple-400 text-white hover:shadow-lg transition-shadow transform hover:scale-105 active:scale-95 active:shadow-inner transition-transform duration-200">
                                    Add <span style={{ filter: 'grayscale(100%) brightness(70%) sepia(50%) hue-rotate(-100deg) saturate(500%) contrast(1)' }} className='relative left-1'>🌕</span>
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Middle grid - Polyanet controls */}
                    <div className="flex flex-col space-y-4">
                        <div className="flex space-x-4">
                            <Button onClick={() => addEmoji(props.row, props.column, 'POLYANET')} className="w-24 h-10 bg-gradient-to-r from-green-600 to-purple-400 text-white hover:shadow-lg transition-shadow transform hover:scale-105 active:scale-95 active:shadow-inner transition-transform duration-200">
                                Add 🪐
                            </Button>
                            <Button onClick={() => handleDeleteEmoji({emojiType: 'POLYANET'})} className="w-24 h-10 bg-gradient-to-r from-pink-600 to-blue-400 text-white hover:shadow-lg transition-shadow transform hover:scale-105 active:scale-95 active:shadow-inner transition-transform duration-200">
                                Delete ❌
                            </Button>
                        </div>
                        <div className="flex space-x-4">
                            <Input
                                type="number"
                                value={props.row}
                                readOnly
                                className="w-24 h-10 text-lg border border-gray-300 rounded-md shadow-sm"
                            />
                            <Input
                                type="number"
                                value={props.column}
                                readOnly
                                className="w-24 h-10 text-lg border border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                    </div>
                         {/* Right grid - Cometh buttons */}
                {props.phase && (
                    <div className="flex flex-col space-y-4">
                        <div className="flex space-x-4">
                            <Button onClick={() => addEmoji(props.row, props.column, 'UP_COMETH')} className="bg-gradient-to-r from-green-600 to-purple-400 text-white hover:shadow-lg transition-shadow transform hover:scale-105 active:scale-95 active:shadow-inner transition-transform duration-200">
                            Add
                            <span className='rotate-[48deg] inline-block relative left-1'>
                                ☄️
                            </span>
                        </Button>
                        <Button onClick={() => addEmoji(props.row, props.column, 'DOWN_COMETH')} className="bg-gradient-to-r from-green-600 to-purple-400 text-white hover:shadow-lg transition-shadow transform hover:scale-105 active:scale-95 active:shadow-inner transition-transform duration-200">
                            Add
                            <span className='rotate-[230deg] inline-block left-1.5 relative'>
                                ☄️
                            </span>
                        </Button>
                        </div>
                        <div className="flex space-x-4">
                        <Button onClick={() => addEmoji(props.row, props.column, 'RIGHT_COMETH')} className="bg-gradient-to-r from-green-600 to-purple-400 text-white hover:shadow-lg transition-shadow transform hover:scale-105 active:scale-95 active:shadow-inner transition-transform duration-200">
                            Add
                            <span className='rotate-[140deg] inline-block left-1.5 relative'>
                                ☄️
                            </span>
                        </Button>
                        <Button onClick={() => addEmoji(props.row, props.column, 'LEFT_COMETH')} className="bg-gradient-to-r from-green-600 to-purple-400 text-white hover:shadow-lg transition-shadow transform hover:scale-105 active:scale-95 active:shadow-inner transition-transform duration-200">
                                Add
                            <span className='rotate-[330deg] inline-block left-1.5 relative'>
                                ☄️
                            </span>
                            </Button>
                        </div>
                    </div>
                )}
                </div>
        
                <Button 
                    onClick={handleAutoSync}
                    className="bg-gradient-to-r from-blue-600 to-purple-400 text-white hover:shadow-lg transition-shadow transform hover:scale-105 active:scale-95 active:shadow-inner transition-transform duration-200 mt-4"
                >
                    Auto-Sync with Goal Map 🚀
                </Button>
            </div>
        </div>
    );
};

export default PlotControls;
