import React, { FC } from 'react'
import { TILE_SIZE } from '.'

type Props = {
  maxValue: number
  orientation: 'horizontal' | 'vertical'
}

export const Axis: FC<Props> = ({ maxValue, orientation }) => {
  const values = Array.from({ length: maxValue }, (_, i) => i + 1)

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: orientation === 'horizontal' ? 'row' : 'column',
        justifyContent: 'space-between',
      }}
    >
      {values.map((value) => (
        <div
          key={value}
          style={{
            width: TILE_SIZE,
            height: TILE_SIZE,
            display: 'grid',
            placeItems: 'center',
            backgroundColor: 'white',
            border: '1px solid black',
            boxSizing: 'border-box',
          }}
        >
          {orientation === 'vertical' ? value : String.fromCharCode(value + 64)}
        </div>
      ))}
    </div>
  )
}
