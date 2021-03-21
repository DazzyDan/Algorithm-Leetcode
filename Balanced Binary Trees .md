# 剑指 Offer 55 - I. 二叉树的深度
输入一棵二叉树的根节点，求该树的深度。从根节点到叶节点依次经过的节点（含根、叶节点）形成树的一条路径，最长路径的长度为树的深度。  
例如：  
给定二叉树 [3,9,20,null,null,15,7]，   
```python
    3
   / \
  9  20
    /  \
   15   7
```
返回它的最大深度 3 。  

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/er-cha-shu-de-shen-du-lcof
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
## 思路  
### 1. 递归（DFS）
DFS有两种实现方法： 递归和栈
这里用递归？
**首先要知道：** 
* 后序遍历：左右根
* 没有子树就不算root
* 左子树：root.left
* 右子树：root.right
* 最大深度：
```python 
max(maxDepth(root.left), maxDepth(root.right)) + 1
```
**过程：**
过程| node|code
----|----|----
从root开始 | 3 |max(maxDepth(root.left), maxDepth(root.right)) + 1
root.left| 9 | max(maxDepth(root.left), maxDepth(root.right)) + 1 =1  因为 root.left is null , maxDepth(root.left) = 0 & root.right is null , maxDepth(root.right) = 0
root.right| 20 | max(maxDepth(root.left), maxDepth(root.right)) + 1
20.right|15| max(0+0)+1 = 1
20.left| 7 | max(0+0)+1 = 1
root.right | 20| max(1,1)+1 = 2
root|3|max(2,1)+1=3  

***Depth = 3***

```python
class Solution:
    def maxDepth(self, root: TreeNode) -> int:
        if not root: return 0
        return max(self.maxDepth(root.left),self.maxDepth(root.right))+1 
```
### 2. 层序遍历（BFS）
later  
# 剑指 Offer 55 - II. 平衡二叉树
输入一棵二叉树的根节点，判断该树是不是平衡二叉树。如果某二叉树中任意节点的左右子树的深度相差不超过1，那么它就是一棵平衡二叉树。  
示例 1:

给定二叉树 [3,9,20,null,null,15,7]
```python
    3
   / \
  9  20
    /  \
   15   7
```
返回 true 。

示例 2:

给定二叉树 [1,2,2,3,3,null,null,4,4]
```python

       1
      / \
     2   2
    / \
   3   3
  / \
 4   4
```
返回 false 。

限制：

0 <= 树的结点个数 <= 10000


来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/ping-heng-er-cha-shu-lcof
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。  
目前写法 可能有没考虑到的情况
```python
class Solution:
    def isBalanced(self, root: TreeNode) -> bool:
        if not root: return 0
        return abs(self.isBalanced(root.left)-self.isBalanced(root.right)) <2
```
