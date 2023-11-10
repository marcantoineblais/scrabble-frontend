"use client"

import React from 'react'
import GridRow from './GridRow'

export default function Word({ word, clickAction }: { word: string, clickAction: Function }) {


    return (
            <GridRow 
                key={1} 
                letters={word.split("")} 
                bonus={Array.from({length: word.length}).map(() => "")} 
                backgrounds={Array.from({length: word.length}).map(() => "bg-tile-texture")} 
                overlaysText={Array.from({length: word.length}).map(() => "")}
                overlaysBackground={Array.from({length: word.length}).map(() => "")} 
                y={-1}
                clickAction={clickAction}
                length={word.length}
            />
    )
}