const { NotImplementedError } = require('../lib/errors');
const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/

class BinarySearchTree {
  constructor() {
    this._root = null
  }

  root() {
    return this._root
  }

  add(data) {
    const node = new Node(data)
    if (!this._root) {
      this._root = node
      return
    }

    let current = this._root
    while (true) {
      if (data < current.data) {
        if (!current.left) {
          current.left = node
          return
        }
        current = current.left
      } else {
        if (!current.right) {
          current.right = node
          return
        }
        current = current.right
      }
    }
  }

  find(data) {
    let current = this._root
    while (current) {
      if (current.data === data) return current
      current = data < current.data ? current.left : current.right
    }
    return null
  }

  has(data) {
    let current = this._root
    while (current) {
      if (current.data === data) return true
      current = data < current.data ? current.left : current.right
    }
    return false
  }

  remove(data) {
    this._root = removeNode(this._root, data)

    function removeNode(node, data) {
      if (!node) return null

      if (data < node.data) {
        node.left = removeNode(node.left, data)
        return node
      } else if (data > node.data) {
        node.right = removeNode(node.right, data)
        return node
      } else {
        // узел найден
        if (!node.left && !node.right) return null
        if (!node.left) return node.right
        if (!node.right) return node.left

        // если два потомка
        let minRight = node.right
        while (minRight.left) {
          minRight = minRight.left
        }
        node.data = minRight.data
        node.right = removeNode(node.right, minRight.data)
        return node
      }
    }
  }

  min() {
    if (!this._root) return null
    let current = this._root
    while (current.left) current = current.left
    return current.data
  }

  max() {
    if (!this._root) return null
    let current = this._root
    while (current.right) current = current.right
    return current.data
  }
}

module.exports = {
  BinarySearchTree
};