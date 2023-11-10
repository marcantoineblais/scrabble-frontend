"use client"

import React from 'react'
import GridTile from './GridTile'

export default function GridRow({
    letters, bonus, backgrounds, overlaysText, overlaysBackground, y, clickAction: tileAction, length
}: {
    letters: string[], bonus: string[], backgrounds: string[], overlaysText: string[], overlaysBackground: string[], y: number, clickAction: Function, length: number
}) {

    function renderGridCells() {
        const row = Array.from({length: length}).map((_el, i) => {
           return (
                <GridTile 
                    key={i} 
                    letter={letters[i]} 
                    bonus={bonus[i]} 
                    background={backgrounds[i]} 
                    overlayText={overlaysText[i]} 
                    overlayBackground={overlaysBackground[i]} 
                    x={i}
                    y={y}
                    tileAction={tileAction}
                />
           )
        })
        
        return <>{ row }</>
    }

    return (
        <div className='flex'>
            { renderGridCells() }
        </div>
    )
}