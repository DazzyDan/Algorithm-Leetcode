# 链表问题 Linked lists 

![image](https://user-images.githubusercontent.com/73490814/125059335-7f9da780-e0ab-11eb-9374-b148f7683bda.png).   

* The first node : head . => starting point for any iteration through the list. 
* The last node: must have its next reference 'pointing to None' to determine the end of the list.
![image](https://user-images.githubusercontent.com/73490814/125614166-8ba527f5-4a8b-4cc1-88f9-a14f7281b684.png)
* Can use : queues or stacks as well as graph. 
## 2. 两数相加
```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def addTwoNumbers(self, l1: ListNode, l2: ListNode) -> ListNode:
        # Return linked list
        dummyList = ListNode()
        tem = dummyList
        # iterator:
        value,carry =0,0
        while l1 or l2 or carry:
            # if 不进位， value归零 = carry=0，if 进位， value = carry = 1
            value = carry
            if l1:
                value += l1.val
                l1 = l1.next
            if l2:
                value+=l2.val
                l2 = l2.next
            carry, value = divmod(value, 10)
            tem.next = ListNode(value)
            tem = tem.next
        
        return dummyList.next 

        
```

思路： 找长度一样 相加， l1/l2 长出来的加 进位.最后进位为1的，新进位一个node.   
```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def addTwoNumbers(self, l1: ListNode, l2: ListNode) -> ListNode:
        # Return linked list
        dummyList = ListNode()
        tem = dummyList
        # iterator:
        carry =0
        while l1 and l2 :
            value = (l1.val +l2.val +carry)%10
            carry = (l1.val +l2.val +carry) // 10
            # append into returned list
            tem.next = ListNode(value)
            tem = tem.next
            
            # next node
            l1 = l1.next
            l2 = l2.next
        # len(l1)>len(l2)
        while l1:
            value = (l1.val +carry)%10
            carry = (l1.val +carry) // 10
            # append into returned list
            tem.next = ListNode(value)
            tem = tem.next
            # next node
            l1 = l1.next
        # l2 >l1
        while l2:
            value = (l2.val +carry)%10
            carry = (l2.val +carry) // 10
            # append into returned list
            tem.next = ListNode(value)
            tem = tem.next
            # next node
            l2 = l2.next
        # when carry >0 add new node
        if carry >0 :
            value = carry % 10
            tem.next = ListNode(value)
            tem = tem.next
        return dummyList.next

        
```
