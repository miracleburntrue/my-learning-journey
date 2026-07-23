'''
元组的基础知识汇总
'''
from collections import namedtuple as nt

#创建元组
tuple1 = (1,2,3)
tuple2 = 1,2,3
print(tuple1,"\n",tuple2) #创建元组时，()就可有可无，关键是, ,输出的元组会有()包裹

tuple_empty = ()
print(tuple_empty) #创建空元组

tuple_1item = (1,)
print(tuple_1item) #特殊情况，创建只有一个元素的元组要在元素后加上,

#元组的解包
x,y,z = tuple1
print(f"{x},{y},{z}")

#用下标查找元素
print(tuple1[0])
#tuple1[0] = 0 #元组的元素不可变，会报错

#元组里的列表(其它可变数据容器)的元素是可以变的
tuple_list = ([1,2,3],4,5)
tuple_list[0][0] = 0
print(tuple_list)
# 元组不可变的是"指向的引用"：不改变引用（删除或更换整个列表）就不会报错，但修改列表内部的数据不改变引用，所以允许

#namedtuple:给位置起名字
point = nt("point",["x","y","z"])
p = point(3,4,5)
print(f"{p},x={p.x},y={p.y},z={p.z}")