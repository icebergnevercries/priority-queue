class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if(this.left === null) {
			this.left = node;
			node.parent = this;
		} 
		else if(this.right === null) {
			this.right = node;
			node.parent = this;
		}
	}

	removeChild(node) {
		if(this.left === node) {
			this.left = null;
			node.parent = null;
		}
		else if(this.right === node) {
			this.right = null;
			node.parent = null;
		}
		else {
			throw 'passed node is not a child of this node';
		}
	}

	remove() {
		if(this.parent !== null) {
			this.parent.removeChild(this);
		}
	}

	swapWithParent() {
		if(this.parent !== null) {	
			if (this.left) {
				this.left.parent = this.parent;
			}
			if (this.right) {
				this.right.parent = this.parent;
			}
			if(this.parent.parent !== null) {
				if(this.parent.parent.left === this.parent) {
					this.parent.parent.left = this;
				}
				else {
					this.parent.parent.right = this;
				}
			}	
			if(this.parent.left === this) {
				let buff = this.right;
				this.right = this.parent.right;
				this.parent.right = buff;
				if(this.right !== null) {
					this.right.parent = this;
				}
				
				buff = this.left;
				this.left = this.parent;
				this.parent.left = buff;
			}
			else if(this.parent.right === this) {
				let buff = this.left;
				this.left = this.parent.left;
				this.parent.left = buff;
				if(this.left !== null) {
					this.left.parent = this;
				}

				buff = this.right;
				this.right = this.parent;
				this.parent.right = buff;				
			}
			let buff = this.parent.parent;
			this.parent.parent = this;
			this.parent = buff;			
		}
	}
}

module.exports = Node;
