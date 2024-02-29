import Yalist from 'yallist'

export type FlushStrategy<T> = (items: T[]) => Promise<any> | any

export interface BatchOptions<T> {
	flushStrategy: FlushStrategy<T>
	flushInterval?: number
	batchSize?: number
}

export interface BatchItem<T> {
	item: T
	resolve: Function
	reject: Function
}
export class BatchProcessor<T> {
	private readonly flushStrategy: FlushStrategy<T>
	private readonly flushInterval: number | undefined
	private readonly batchSize: number

	private queue: Yalist<BatchItem<T>> = Yalist.create()
	private interval: NodeJS.Timeout | undefined

	constructor({ flushStrategy, flushInterval, batchSize = Infinity }: BatchOptions<T>) {
		this.flushStrategy = flushStrategy
		this.flushInterval = flushInterval
		this.batchSize = batchSize

		this.scheduleFlush()
	}

	public add(item: T): Promise<void> {
		return new Promise((resolve, reject) => {
			this.queue.push({ item, resolve, reject })
			this.hasFullBatch && this.flush()
		})
	}

	public async flush(): Promise<void> {
		const nodes: BatchItem<T>[] = []
		const items: T[] = []

		const iterations = Math.min(this.queued, this.batchSize)

		for (let i = 0; i < iterations; i++) {
			const node = this.queue.shift() as BatchItem<T>
			items.push(node.item)
			nodes.push(node)
		}

		try {
			await this.flushStrategy(items)
			nodes.forEach(n => n.resolve())
		} catch (e) {
			nodes.forEach(n => n.reject())
		}

		if (this.hasFullBatch) {
			this.flush()
		} else {
			this.scheduleFlush()
		}
	}

	public clearFlushInterval() {
		clearInterval(this.interval)
	}

	private scheduleFlush() {
		if (typeof this.flushInterval === 'number') {
			clearInterval(this.interval)
			this.interval = setInterval(this.flush.bind(this), this.flushInterval)
		}
	}

	public get queued(): number {
		return this.queue.length
	}

	public get hasFullBatch(): boolean {
		return this.batchSize <= this.queued
	}
}
