## 框架
```python
# BFS算法框架: 计算从起点 start 到终点 target 的最近距离
def BFS(start: Node, target:Node):
    q = collections.deque()  # 核心数据结构:队列
    visited = set()  # 避免走回头路,set是无序的不重复元素序列
    
    q.append(start)  # 将起点加入队列
    visited.add(start)
    step = 0  # 记录扩散的步数
    
    while q: #非空
        n = len(q)
        # 将当前队列中的所有节点向四周扩散
        for i in range(n):
            cur = q.popleft()
            # 划重点:这里判断是否到达终点
            if cur is target:
                return step
                # 将cur的相邻节点加入队列
           for x in cur.adj(): #adjacent nodes
                if x not in visited:
                    q.append(x)
                    visited.add(x)
        # 划重点:更新步数在这里
        step += 1
```
```python
import collections
q = collections.deque([1,2])
x=q.pop()
print(x)

```
q.pop() : pop from right. 
print : 2. 
q.popleft():pop from left => like the real queue

```python
import collections
r = [3,9,20,1,1,15,7]
q = collections.deque([(r,2)])
x=q.pop()
print(x)
```
Result:
```python
>>>
    ([3, 9, 20, 1, 1, 15, 7], 2)
```
102. 二叉树的层序遍历. 
```python
class Solution:
    def levelOrder(self, root: TreeNode) -> List[List[int]]:
        if not root:
            return []
        q = collections.deque()
        b = list()
        #initial
        q.append(root)

        #bfs
        while q:
            tmp = list()
            l = len(q)
            for i in range(l):
                v = q.popleft()
                # For tree, we should use node.val to get value
                tmp.append(v.val)
                # traversal
                if v.left:
                    q.append(v.left)

                if v.right:
                    q.append(v.right)
            if tmp:
                b.append(tmp)
        return b
```
But if use:
Screen Shot 2021-05-16 at 11.18.03![image](https://user-images.githubusercontent.com/73490814/118392168-6db60000-b638-11eb-999c-7cfb20c3aa9c.png)
The result is error:
Screen Shot 2021-05-16 at 11.18.09![image](https://user-images.githubusercontent.com/73490814/118392174-77d7fe80-b638-11eb-93d6-cc06952296ce.png)
Therefore :!!!!  
❌：It's not the problem of trasmitting value. 
The point is that i didn't set initial check
Screen Shot 2021-05-16 at 11.21.55![image](https://user-images.githubusercontent.com/73490814/118392278-22502180-b639-11eb-92a3-5f1570512b30.png)
## 101. 对称二叉树  
```python
class Solution:
    def isSymmetric(self, root: TreeNode) -> bool:
        if not root:
            return False
        q = collections.deque()
        # initial: like two point
        q.append((root,root))
        #bfs
        while q:
            left,right = q.popleft()               
            #check
            if not right and not left:
                continue
            if not left or not right:
                return False 
            if right.val != left.val:
                return False
            q.append((left.left,right.right))
            q.append((left.right,right.left))
        return True
 ```
 #####  Point : queue 里可以放多个变量
 ## 剑指 Offer 32 - III. 从上到下打印二叉树 III 
 **要点： “之”字形print**   
 **思路 ： 前面正常思路append，在输出时用奇偶数分辨并变化输出顺序**
 ```python
 if not root:
    return []
q = collections.deque()
#initial
d = 0
q.append(root)
res = []

#bfs:
while q:
    tmp = []            
    for i in range(len(q)):
        #normalize
        v= q.popleft()
        tmp.append(v.val)
        #traversal
        if v.left:
            q.append(v.left)
        if v.right:
            q.append(v.right)
    #target
    #means: !=0
    if (d % 2) :
        res.append(tmp[::-1])
    else:
        res.append(tmp)           
    d +=1                 
return res
 ```
 ##200 岛屿数量
 **思路**
 * 设置result=0
 * 寻找为1的值=>找到：result+=1
 * 如果是‘1’，替换成‘0’
 * 继续寻找这个‘1’上下左右为‘1’的点（dfs）
```python

class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        result = 0
        m = len(grid)
        n = len(grid[0])
        def dfs(grid,i,j):
            if not 0<=i<m or not 0<=j<n or grid[i][j]=='0': return
            if grid[i][j]=='1':
                grid[i][j]='0'
                dfs(grid,i+1,j)
                dfs(grid,i-1,j)
                dfs(grid,i,j-1)
                dfs(grid,i,j+1)
        if not grid: return None
        for i in range(m):
            for j in range(n):
                if grid[i][j]=='0': continue
                else: 
                    result +=1
                    dfs(grid,i,j)
        return result
```
### BFS
**思路**：  
* 把岛屿抓住（grid[i][j]=='1')
* check其‘上，下，左，右’：用bfs
* 加入queue，check if its neighbors are '1', add into queue
* until the queue is empty
**注意⚠️**： 边界限制：0<=a **<** len(grid). 
*Cuz this list. start from 0, so the length is the index of the last item +1*
```python
class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        if not grid:
            return 0

        # bfs:
        def bfs(grid,i,j):
            q = collections.deque()
            # initial 
            q.append((i,j))
            grid[i][j]='0'
            while q:
                x,y = q.popleft()
                # check its neighbors(up,down,left,right)
                for a,b in ((x+1,y),(x-1,y),(x,y+1),(x,y-1)):
                    if 0<=a<len(grid) and 0<=b<len(grid[0]) and grid[a][b]=='1':
                        q.append((a,b))
                        grid[a][b]='0'

        # main
        results = 0
        for i in range(len(grid)):
            for j in range(len(grid[0])):
                if grid[i][j]=='1':
                    # check its adj
                    bfs(grid,i,j)
                    results+=1
        return results
```
### 完美二叉树(Perfect Binary Tree): = 满二叉树： all leaf nodes at the same depth. 
116. 填充每个节点的下一个右侧节点指针. 
```python
"""
# Definition for a Node.
class Node:
    def __init__(self, val: int = 0, left: 'Node' = None, right: 'Node' = None, next: 'Node' = None):
        self.val = val
        self.left = left
        self.right = right
        self.next = next
"""

class Solution:
    def connect(self, root: 'Node') -> 'Node':
        # 这里不能return【】
        if not root:
            return root
        q = collections.deque()
        #initial 
        q.append(root)

        #bfs
        while q:
            # 这里的len(q)是定值，就是说是以前面的值得到的，后面q变化，这里的len都不会变
            m = len(q)
            for i in range(m):
                node = q.popleft()          
                if node.left:
                    q.append(node.left)
                if node.right:
                    q.append(node.right)
                #画出图，找规律
                if i < m-1:
                    node.next =q[0]
        return root
```
### 994. 腐烂的橘子
**总体思路:**
* 找出所有为2 的橘子， 把其位置输入队列
* 找出1 的橘子，计数
* 目标：为1 的橘子为0
* 运用bfs，把=2 的橘子输入队列后，找它上下左右的橘子，如果是1也输入队列，并将其设为0
* 直到队列为空或没有为1的橘子
**易错点:** list都是从0 开始计数的， 所以 r-1>= 0 **别忘了等于0**

```python
class Solution:
    def orangesRotting(self, grid: List[List[int]]) -> int:
        if not grid: return -1
        q = collections.deque()
        #initial 
        # count 1
        count = 0
        time = 0
        # Put all (2) into the queue
        for i in range(len(grid)):
            for j in range(len(grid[0])):
                if grid[i][j] ==2:
                    q.append((i,j))
                if grid[i][j] ==1:
                    count +=1
        # bfs
        while q and count > 0 :
            time +=1
            for h in range(len(q)):
                # row and column coordinates of 2
                r,c = q.popleft()
                # 从0开始计数
                if r-1>=0 and grid[r-1][c]==1:
                    q.append((r-1,c))
                    grid[r-1][c] =2
                    count -=1
                if r+1<len(grid) and grid[r+1][c]==1:
                    q.append((r+1,c))
                    grid[r+1][c]=2
                    count -=1
                if c-1>=0 and grid[r][c-1]==1:
                    q.append((r,c-1))
                    grid[r][c-1] =2
                    count -=1
                if c+1<len(grid[0]) and grid[r][c+1]==1:
                    q.append((r,c+1))
                    grid[r][c+1] =2
                    count -=1
        if count >0:
            return -1
        else: 
            return time
```
## 100. 相同的树.  

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right
class Solution:
    def isSameTree(self, p: TreeNode, q: TreeNode) -> bool:
        if not p and not q:
            return True
        if not p or not q:
            return False
        #bfs
        queQ = collections.deque()
        queP = collections.deque()
        queP.append(p)
        queQ.append(q)

        while queP and queQ:
            nP = len(queP)
            nQ = len(queQ)

            curP = queP.popleft()
            curQ = queQ.popleft()
            
            if curP.val !=curQ.val:
                return False
            if (not curP.left) ^ (not curQ.left):
                return False
            if (not curP.right) ^ (not curQ.right):
                return False
            if curP.left:
                queP.append(curP.left)       
            if curP.right:
                queP.append(curP.right)
            if curQ.left:
                queQ.append(curQ.left)
            if curQ.right:
                queQ.append(curQ.right)            
        return not queQ and not queP
 ```
 重点： 
 ```python
 if (not curP.left) ^ (not curQ.left):
                return False
 if (not curP.right) ^ (not curQ.right):
                return False
 ```
 ^ : xor: Sets each bit to 1 if only one of two bits is 1 只有一个为null的时候  
 or： Sets each bit to 1 if one of two bits is 1 两个中只要有null  
 这两个概念是不同的，之前一直出错是因为把xor的概念当成or， 虽然很小的差距，但是结果一直是错的

## DFS:   
 ```python
class Solution:
    def isSameTree(self, p: TreeNode, q: TreeNode) -> bool:
        if not p and not q:
            return True
        if not p or not q:
            return False
        if p.val != q.val:
            return False
        return self.isSameTree(p.left,q.left) and self.isSameTree(p.right,q.right)
```
