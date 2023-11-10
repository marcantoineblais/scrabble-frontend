"use client"

import React from 'react'
import GridCell from './GridCell'

export default function GridRow({
    letters, bonus, backgrounds, overlays, y, selectBoardTile
}: {
    letters: string[], bonus: string[], backgrounds: string[], overlays: string[], y: number, selectBoardTile: Function
}) {

    function renderGridCells() {
        const row = Array.from({length: 15}).map((_el, i) => {
           return (
                <GridCell 
                    key={i} 
                    letter={letters[i]} 
                    bonus={bonus[i]} 
                    background={backgrounds[i]} 
                    overlay={overlays[i]} 
                    x={i}
                    y={y}
                    selectBoardTile={selectBoardTile}
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