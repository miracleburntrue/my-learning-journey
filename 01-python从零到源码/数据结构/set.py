'''
集合的基础知识汇总
'''
#集合是无序，不重复的数据容器
#创建
set_a = {1,2,3,4,5} #集合可以用{}创建
set_empty = set() #空集合只能用set()函数创建，因为空{}创建的是空字典
#set_b = set([2,3,4,5,6])  # set()只接受一个可迭代对象，多个元素要包在列表/元组里传进去
set_b = set([2,3,4,5,6]) #noqa
set_a = {x for x in range(3,8)} #集合也可以用推导式创建
print(set_a)
print(set_b)
#可以用set()简单的去重
list = [1,1,2,2,3,3,4,4,5,5]
unique = set(list)
print(unique)
#集合的运算
print(set_a & set_b) #交
print(set_a | set_b) #并
print(set_a - set_b) #差
print(set_a ^ set_b) #对称差
#增删方法
set_empty.add(1) #增
set_empty.discard(2) #删，不存在不会报错
set_empty.remove(1) #删，不存在会报错
#不可变集合frozenset
fs = frozenset([1,2,3])
#fs.add(4) #会报错，frozenset不可修改
#可以作为键加入dict、可以放进set