import { Chart as ChartJS, ArcElement, Tooltip, Legend, Colors, ChartOptions, Title } from 'chart.js'
import { useEffect, useState } from 'react'
import { useTheme } from 'react-theme-lib'
import { Pie } from 'react-chartjs-2'

import styles from './Chart.module.scss'

ChartJS.register(ArcElement, Tooltip, Legend, Colors, Title)

export type IData = Record<string, number>

export interface ChartProps {
	title?: string
	data: IData
}

function dataMapper(input: IData) {
	const labels: string[] = []
	const data: number[] = []
	let empty = false

	for (const key in input) {
		labels.push(key === 'null' ? 'Unknown' : key)
		data.push(input[key] as number)
	}

	if (labels.length === 0) {
		labels.push('No data')
		data.push(100)
		empty = true
	}

	return { labels, data, empty }
}

export function Chart(props: ChartProps) {
	const [color, setColor] = useState('')
	const [emptyBg, setEmptyBg] = useState('')
	const { theme } = useTheme()

	useEffect(() => {
		const styles = getComputedStyle(document.body)
		const emptyBg = styles.getPropertyValue('--chart-empty-bg')
		const color = styles.getPropertyValue('--text-main')
		setEmptyBg(emptyBg)
		setColor(color)
	}, [theme])

	const { labels, data, empty } = dataMapper(props.data)

	const options: ChartOptions<'pie'> = {
		plugins: {
			title: {
				display: !!props.title,
				text: props.title,
				font: {
					family: 'DM Sans',
					weight: 'bold',
					size: 20
				},
				color
			},
			legend: {
				position: 'bottom',
				labels: {
					color
				}
			},
			tooltip: {
				enabled: !empty
			}
		}
	}

	return (
		<div className={styles.chart}>
			<Pie
				data={{
					labels,
					datasets: [
						data.length > 1
							? { data, borderWidth: 1.2 }
							: {
									data,
									borderWidth: 0,
									backgroundColor: empty ? [emptyBg] : undefined
								}
					]
				}}
				options={options}
			/>
		</div>
	)
}
