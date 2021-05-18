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
