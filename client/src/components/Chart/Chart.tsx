import { Chart as ChartJS, ArcElement, Tooltip, Legend, Colors, ChartOptions, Title } from 'chart.js'
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
		data.push(input[key])
	}

	if (labels.length === 0) {
		labels.push('No data')
		data.push(100)
		empty = true
	}

	return { labels, data, empty }
}

export function Chart(props: ChartProps) {
	const { labels, data, empty } = dataMapper(props.data)

	const color = getComputedStyle(document.body).getPropertyValue('--text-main')

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
							? { data }
							: { data, borderWidth: 0, backgroundColor: empty ? ['LightGray'] : undefined }
					]
				}}
				options={options}
			/>
		</div>
	)
}
