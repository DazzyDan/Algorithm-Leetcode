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
python numpy 中linspace函数
numpy提供linspace函数(有时也称为np.linspace)是python中创建数值序列工具。与Numpy arange函数类似，生成结构与Numpy 数组类似的均匀分布的数值序列。两者虽有些差异，但大多数人更愿意使用linspace函数，其很好理解，但我们需要去学习如何使用。

本文我们学习linspace函数及其他语法，并通过示例解释具体参数。最后也顺便提及np.linspace 和 np.arange之间的差异。

1. 快速了解
通过定义均匀间隔创建数值序列。其实，需要指定间隔起始点、终止端，以及指定分隔值总数（包括起始点和终止点）；最终函数返回间隔类均匀分布的数值序列。请看示例：
num: 数组输出个数。
np.linspace(start = 0, stop = 100, num = 5)
1
代码生成 NumPy 数组 (ndarray 对象)，结果如下：array([ 0., 25., 50., 75., 100.])
如图：

![image](https://user-images.githubusercontent.com/73490814/130813036-2b734296-85fc-4227-9966-9927f9801117.png)

版权声明：本文为CSDN博主「梦想画家」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/neweastsun/article/details/99676029
对于方阵A，如果为非奇异方阵，则存在逆矩阵inv(A)
对于奇异矩阵或者非方阵，并不存在逆矩阵，但可以使用pinv(A)求其伪逆

inv：

inv(A)*B
实际上可以写成A\B
B*inv(A)
实际上可以写成B/A
这样比求逆之后带入精度要高
A\B=pinv(A)*B 
A/B=A*pinv(B)

pinv：

X=pinv(A),X=pinv(A,tol),其中tol为误差
pinv是求广义逆

先搞清楚什么是伪逆。
对于方阵A，若有方阵B，使得：A·B=B·A=I，则称B为A的逆矩阵。
如果矩阵A不是一个方阵，或者A是一个非满秩的方阵时，矩阵A没有逆矩阵，但可以找到一个与A的转置矩阵A'同型的矩阵B，使得：
     A·B·A=A        
      B·A·B=B
此时称矩阵B为矩阵A的伪逆，也称为广义逆矩阵。因此伪逆阵与原阵相乘不一定是单位阵。


当A可逆时，B就是A的逆矩阵，否则就是广义逆。

满足上面关系的A,B矩阵，有很多和逆矩阵相似的性质。


如果A为非奇异矩阵的话，虽然计算结果相同，但是pinv会消耗大量的计算时间。

在其他情况下，pinv具有inv的部分特性，但是不完全相同。
————————————————
版权声明：本文为CSDN博主「糖葫芦君」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/yinyu19950811/article/details/61420131
