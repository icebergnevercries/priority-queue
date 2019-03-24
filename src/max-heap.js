const Node = require('./node');

class MaxHeap {
	constructor() {
		this.parentNodes = [];
		this.root = null;
		this.hsize = 0;
	}

	push(data, priority) {
		this.hsize += 1;
		this.insertNode(new Node(data, priority));		
		this.shiftNodeUp(new Node(data, priority));
	}

	pop() {
		if(this.root !== null) {
			this.hsize -= 1;
		}		
	}

	detachRoot() {
		if(this.parentNodes.indexOf(this.root) !== -1) {
			this.parentNodes.slice(this.parentNodes.indexOf(this.root),1);
		}
		
		let buff = this.root;
		this.root = null;
		return buff;
	}

	restoreRootFromLastInsertedNode(detached) {
		
	}

	size() {
		return this.hsize;		
	}

	isEmpty() {
		return this.hsize === 0;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.hsize = 0;
	}

	insertNode(node) {
		if(this.root === null) {
			this.root = node;
			this.parentNodes.push(node);
		}
		else {
			this.parentNodes[0].appendChild(node);
			this.parentNodes.push(node);
			if(this.parentNodes[0].right !== null) {
				this.parentNodes.shift();
			}
		}
	}

	shiftNodeUp(node) {
		if(node.parent !== null) {
			if(node.priority > node.parent.priority) {
				let indexN = this.parentNodes.indexOf(node);
				let indexP = this.parentNodes.indexOf(node.parent);
				if (indexN !== -1) {
					if (indexP !== -1) {
						this.parentNodes[indexN] = node.parent;
						this.parentNodes[indexP] = node;
					} 
					else {
					  this.parentNodes[indexN] = node.parent;
					}
				}
				node.swapWithParent();
				this.shiftNodeUp(node);
			}
		}
		else {
			this.root = node;
		}
	}

	shiftNodeDown(node) {
		if(node.left !== null) {
			let child = null;
			if(node.right === null) {				
				child = node.left;
			}
			else {
				node.left.priority > node.right.priority ? child = node.left : child = node.right;
			}
			let indexN = this.parentNodes.indexOf(node);
			let indexC = this.parentNodes.indexOf(child);
			if (indexC !== -1) {
				if (indexN !== -1) {
					this.parentNodes[indexN] = child;
					this.parentNodes[indexC] = node;
				} 
				else {
				  this.parentNodes[indexC] = node;
				}
			}
			if (node === this.root) {
				this.root = child;
			  }
			child.swapWithParent();
    		this.shiftNodeDown(node);
		}
	}
}

module.exports = MaxHeap;
