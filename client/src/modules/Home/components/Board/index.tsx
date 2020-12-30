import React, { FC, useEffect, useRef, useState } from 'react'

import { Tile } from '../../../../helpers/graphql/generated'

import { useBoardQuery } from '../../graphql/use-board'
import { useTileUpdatedSubscription } from '../../graphql/use-tile-updated'
import { Axis } from './Axis'

const CANVAS_SIZE_PX = 720
const CANVAS_TILE_COUNT = 20
export const TILE_SIZE = CANVAS_SIZE_PX / CANVAS_TILE_COUNT

type Props = {}

export const Board: FC<Props> = ({}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [canvasCtx, setCanvasCtx] = useState<CanvasRenderingContext2D>(null)

  const { data, loading } = useBoardQuery()
  const tileUpdated = useTileUpdatedSubscription()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }

    const context = canvas.getContext('2d')
    setCanvasCtx(context)

    context.canvas.width = CANVAS_SIZE_PX
    context.canvas.height = CANVAS_SIZE_PX
    //Our first draw
    context.fillStyle = '#FFFFFF'
    context.fillRect(0, 0, context.canvas.width, context.canvas.height)
  }, [loading])

  useEffect(() => {
    if (!canvasCtx || !data.board) {
      return
    }

    data.board.forEach((tile) => drawTile(tile, canvasCtx))
  }, [data, canvasCtx])

  useEffect(() => {
    if (!tileUpdated.data || !canvasCtx) {
      return
    }

    drawTile(tileUpdated.data.tileUpdated, canvasCtx)
  }, [tileUpdated, canvasCtx])

  if (loading) {
    return null
  }

  return (
    <section style={{ display: 'flex', alignItems: 'center' }}>
      <Axis orientation="vertical" maxValue={CANVAS_TILE_COUNT} />

      <div>
        <Axis orientation="horizontal" maxValue={CANVAS_TILE_COUNT} />
        <canvas ref={canvasRef} style={{ display: 'block' }} />
        <Axis orientation="horizontal" maxValue={CANVAS_TILE_COUNT} />
      </div>

      <Axis orientation="vertical" maxValue={CANVAS_TILE_COUNT} />
    </section>
  )
}

function drawTile(tile: Tile, context: CanvasRenderingContext2D) {
  if (tile.x > CANVAS_TILE_COUNT || tile.y > CANVAS_TILE_COUNT) {
    return
  }

  context.fillStyle = tile.color
  context.fillRect(TILE_SIZE * (tile.x - 1), TILE_SIZE * (tile.y - 1), TILE_SIZE, TILE_SIZE)
}
