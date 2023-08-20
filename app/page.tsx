'use client'

import { useDraw } from '@/hooks/useDraw'
import { FC, useState } from 'react'
import { ChromePicker } from 'react-color'

interface pageProps {}

const Page: FC<pageProps> = ({}) => {
	const [color, setColor] = useState('#FFF')
	const { canvasRef, onMouseDown, clear } = useDraw(drawLine)

	function drawLine({ prevPoint, currentPoint, ctx }: Draw) {
		const { x: currX, y: currY } = currentPoint
		const lineColor = color
		const lineWidth = 5

		let startPoint = prevPoint ?? currentPoint
		ctx.beginPath()
		ctx.lineWidth = lineWidth
		ctx.strokeStyle = lineColor
		ctx.moveTo(startPoint.x, startPoint.y)
		ctx.lineTo(currX, currY)
		ctx.stroke()

		ctx.fillStyle = lineColor
		ctx.beginPath()
		ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI)
		ctx.fill()
	}

	return (
		<div className='w-screen h-screen bg-black flex justify-center items-center'>
			{/* <input type='color' /> */}
			<div className='flex flex-col gap-10 pr-10'>
				<ChromePicker color={color} onChange={e => setColor(e.hex)} />
				<button type='button' onClick={clear} className='p-2 rounded-md border border-white'>
					Clear canvas
				</button>
			</div>
			<canvas
				onMouseDown={onMouseDown}
				ref={canvasRef}
				width={750}
				height={750}
				className='border border-white rounded-md'
			/>
		</div>
	)
}

export default Page
