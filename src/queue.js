const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize = 30) {
		this.maxSize = maxSize;
		this.heap = new MaxHeap();
	}

	push(data, priority) {
		if(this.heap.hsize >= this.maxSize) {
			throw 'queue has max size';
		}
		else {
			this.heap.push(data, priority);
		}
	}

	shift() {
		if(this.heap.hsize <= 0) {
			throw 'queue is empty';
		}
		else {
			return this.heap.pop();
		}
	}

	size() {
		return this.heap.size();
	}

	isEmpty() {
		return this.heap.isEmpty();
	}
}

module.exports = PriorityQueue;
