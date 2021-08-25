1. stack:  联合几个array
- axis = 1 ： column;
- axis = 0: row（正常合起来);
- axis = -1 和 =1 相同
```python
import numpy as np
a = np.array([2,3,4])
b = np.array([5,6,7])
s = np.stack((a,b),axis=1)
print(s)
y = np.stack((a,b),axis=0)
print(y)

z = np.stack((a,b),axis=-1)
print(z)
```
Outout: 
```python
[[2 5]
 [3 6]
 [4 7]]
 
[[2 3 4]
 [5 6 7]]
 
[[2 5]
 [3 6]
 [4 7]]
```
