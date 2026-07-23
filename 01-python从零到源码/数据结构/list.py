'''
列表的基础知识汇总
'''
from copy import deepcopy as dp
#创建与索引
list = ["苹果","梨子","666",1000]
print(list[1]) #列表的正向索引从0开始
print(list[-3]) #列表的反向索引从-1开始
print(len(list)) #len()函数返回列表的长度

#切片
print(list[1:4]) #截取下标1~3的元素
print(list[1:4:2]) #截取下标1~3的元素，步长为2
print(list[::-1]) #截取所有元素，步长-1（即反转）

#增删改查
list = ["苹果","梨子"]
#增
list.append("橘子") #在列表末尾添加一个元素
print(list)
list.extend(["番茄","白菜","卷心菜"]) #在列表末尾递归地添加多个元素
print(list)
list.insert(1,"葡萄") #在列表指定下标处插入
print(list)
#删
list.remove("白菜") #删除第一个对应元素
print(list)
last = list.pop() #删除一个元素，并且返回对应值,可以靠参数指定下标，默认最后一个
print(last," ",list)
del list[4] #按下标删除元素
print(list)
#改
list[0] = "西瓜" #按下标改
print(list)
#查
print("西瓜" in list) #True / False
print(list.index("梨子")) #返回下标
print(list.count("葡萄")) #出现次数

#其它方法
#列表推导式
square = [x*x for x in range(1,10)] #代码简洁，且性能优于for循环写法
even = [x for x in range(20) if x % 2 == 0] #带条件判断形式
pairs = [(x,y) for x in [1,2] for y in [3,4]] #双层嵌套形式
print(square,"\n",even,"\n",pairs)
#排序方法.sort()
list = [1,1,4,5,1,4,1,9,1,9,8,1,0]
list.sort()
print(list)
#翻转列表方法.reverse()
list.reverse()
print(list)
#浅拷贝与深拷贝
a = [[1,2,3],4,5,6]
b = a.copy() #浅拷贝
c = dp(a) #深拷贝
print("\n",a,"\n",b,"\n",c) #均能得到相同结果
b[1] = 0
c[1] = 0
print("\n",a,"\n",b,"\n",c) #改变外层元素均不会有其它影响
b[0][0] = 0
a[0][1] = 0
print("\n",a,"\n",b,"\n",c) #浅拷贝的内层元素不独立，修改内层元素会导致结果一起改变
c[0][2] = 0
print("\n",a,"\n",b,"\n",c) #深拷贝可以得到独立的内层结果，不会一起改变